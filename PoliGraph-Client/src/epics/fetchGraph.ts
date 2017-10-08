import * as Rx from 'rxjs'
import {streamToRx} from 'rxjs-stream'

import { fetchGraphFulfilled, START_GRAPH_STREAM, GRAPH_DATA_PACKET } from '../actions'

const gremlin = require('gremlin-client')
const GremlinClient = gremlin.createClient(8182,'40.112.250.222')

const gremlinQueryStream = GremlinClient.stream('g.V()')//.on('data', (data) => console.log('data!!!', data))

//const socket$ = Rx.Observable.webSocket(gremlinQueryStream)
const graphStream = streamToRx(gremlinQueryStream)

/* flatmap / switch map operate on each value in observable stream, while reducing into a single observable
   that can than be subscribed to -> this is handled by the epic middleware in configureStore

   switchMap forces latest data into stream

   Initalize the application by setting tcp event listeners to the Janus instance, dispatch initial graph import

   https://stackoverflow.com/questions/45069489/using-redux-observable-and-subscribing-to-a-websocket
   https://jsfiddle.net/rolele/ued0oh9q/
*/

export const fetchSocketGraphEpic = (action$, store) => {
  return action$.ofType('START_GRAPH_STREAM')
    .mergeMap((action: any) =>
      graphStream
        .map(GRAPH_DATA_PACKET)
        .retryWhen((err) => {
            return window.navigator.onLine ? Rx.Observable.timer(1000) : Rx.Observable.fromEvent(window, 'online')
        })
        .takeUntil(action$.ofType('CLOSE_GRAPH_STREAM'))
        .catch(epicError)
    )
}

export const fetchGraphEpic = (action$, store) => {
  return action$.ofType('FETCH_GRAPH')
    .switchMap((action: any) =>
      Rx.Observable.ajax.getJSON(`http://127.0.0.1:3000/Test`)
        // .filter(filterCongressCritters('D'))
        .map(fetchGraphFulfilled)
        .catch(epicError)
    )
}

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
