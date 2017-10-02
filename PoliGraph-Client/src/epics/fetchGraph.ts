import * as Rx from 'rxjs'

import janusEventHandler from '../external'
import { fetchGraphFulfilled, START_GRAPH_STREAM, GRAPH_DATA_PACKET } from '../actions'

/* flatmap / switch map operate on each value in observable stream, while reducing into a single observable
   that can than be subscribed to -> this is handled by the epic middleware in configureStore

   switchMap forces latest data into stream
*/

const janusAddress = 'ws://40.112.250.222:8182'
const socket$ = Rx.Observable.webSocket(janusAddress)


//const webSocketConn = janusEventHandler()

/* Initalize the application by setting tcp event listeners to the Janus instance, dispatch initial graph import */
//webSocketConn ? webSocketConn : 'janus connection failed'

/* https://stackoverflow.com/questions/45069489/using-redux-observable-and-subscribing-to-a-websocket */

//https://jsfiddle.net/rolele/ued0oh9q/

export const fetchSocketGraphEpic = (action$, store) => {
  console.log('called!',action$)
  return action$.ofType('START_STREAM')
    .mergeMap((action: any) =>
      socket$
        .multiplex(
          () => { console.log('sub')
            return { sub: action.payload }},
          () => { console.log('unsub')
            return{ unsub: action.payload }},
          graph => true //graph === action.payload
        )
        .map(fetchGraphFulfilled) //GRAPH_DATA_PACKET
        .retryWhen((err) => {
            console.log('retry when err ')
            console.log(err)
            return window.navigator.onLine ? Rx.Observable.timer(1000) : Rx.Observable.fromEvent(window, 'online')
        })
        .catch(epicError)
        .forEach((s) => console.log('inside socket epic',s)) //for development purposes only
    )
    .forEach(s => console.log('merged stream', s))
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
    console.log('Inside Filter Function', party, typeof party, Array.isArray(critter))
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
