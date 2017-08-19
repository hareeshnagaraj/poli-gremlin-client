import * as Rx from 'rxjs';

// import {ajax} from 'rxjs/observable/dom/ajax'
import {Store} from '../state/store'
import {graphData} from './streamParse'

const ADD_Message = 'ADD_Message'
const FETCH_GRAPH = 'FETCH_GRAPH'
const graphName = 'Make a dynamic graph name'

// export type Action = {
//     type: 'FETCH_GRAPH',
//     text: 'Build my first Redux app',
//     // date: new Date
// }

const fetchGraph = graph => ({ type: FETCH_GRAPH, payload: graphName });

// export declare interface Epic<T, S> { (action$: ActionsObservable<T>, store: MiddlewareAPI<S>): Observable<T>; }

export const fetchGraphEpic = (action$, Store): any => {
  return action$.ofType('FETCH_GRAPH')
    .switchMap((action: any) =>
      Rx.Observable.ajax.getJSON(`localhost:3000/Test`)
        .filter(filterCongressCritters('D'))
        .map(sendGraphObs)
        // .catch(error => console.error(error))
    )
}


function filterCongressCritters(party: string): any {
  return (critter) => {
    return critter.properties.party[0].value === party
  }
}

function sendGraphObs(result){
  console.log('sendGraphObs',result)
  return {
    type: 'FETCH_GRAPH_RESPONSE',
    payload: result
  }
}

// dispatch({type: 'FETCH_GRAPH_RESPONSE'})
