import * as Rx from 'rxjs'
import { START_GRAPH_STREAM, GRAPH_DATA_PACKET, GRAPH_EDGES } from '../actions'

const gremlin = require('gremlin-client')
const GremlinClient = gremlin.createClient(8182,'40.112.250.222')

/* flatmap / switch map operate on each value in observable stream, while reducing into a single observable
   that can than be subscribed to -> this is handled by the epic middleware in configureStore

   switchMap forces latest data into stream

   Initalize the application by setting tcp event listeners to the Janus instance, dispatch initial graph import

   https://stackoverflow.com/questions/45069489/using-redux-observable-and-subscribing-to-a-websocket
   https://jsfiddle.net/rolele/ued0oh9q/
*/

export const epicGremlinQuery = (queryString, queryBindings = {}) => {
  return Rx.Observable.create(obs=>{
                  GremlinClient.execute(
                    queryString,
                    queryBindings,
                    (err, results) => {
                      if (!err) {
                        obs.next(results);
                        obs.complete();
                      } else {
                        obs.error(new Error("Error executing "));
                      }
                    });
                });
}

export const fetchSocketGraphEpic = (action$, store) => {
  return action$.ofType('START_GRAPH_STREAM')
    .mergeMap((action: any) => {
        return epicGremlinQuery('g.V()')
                .map(GRAPH_DATA_PACKET)
                .retryWhen((err) => {
                    return window.navigator.onLine ? 
                            Rx.Observable.timer(1000) : 
                            Rx.Observable.fromEvent(window, 'online')
                })
                .takeUntil(action$.ofType('CLOSE_GRAPH_STREAM'))
                .catch(epicError);
    });
};

// Fired when fetchSocketGraphEpic is completed - GRAPH_DATA_POCKET invokes an action of type FETCH_GRAPH_FULFILLED
export const fetchGraphEdgesEpic = (action$, store) => {
  return action$.ofType('FETCH_GRAPH_FULFILLED')
    .mergeMap((action: any) =>{
      return epicGremlinQuery('g.E()')
        .map(GRAPH_EDGES)
        .retryWhen((err) => {
                    return window.navigator.onLine ? 
                            Rx.Observable.timer(1000) : 
                            Rx.Observable.fromEvent(window, 'online')
                })
        .takeUntil(action$.ofType('CLOSE_GRAPH_STREAM'))
        .catch(epicError);
    });
};

/* Not being properly passed to filter function as observable? */
function filterCongressCritters(party: string): any {
  return (critter) => {
    return critter.properties.party[0].value === party
  }
}

/* epicError can be abstracted out to the actions module as well */
function epicError(error){
  return Rx.Observable.of({
    type: 'GRAPH_ERROR',
    payload: error.xhr.response,
    error: true
  })
}
