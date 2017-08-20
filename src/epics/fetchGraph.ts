import * as Rx from 'rxjs';

// import {ajax} from 'rxjs/observable/dom/ajax'
import {Store} from '../state/store'
import {graphData} from './streamParse'
import {fetchGraph,fetchGraphFulfilled} from '../state/actions'


/* Epic is response for action dispatch */
export const fetchGraphEpic = (action$, Store): any => {
  return action$.ofType('FETCH_GRAPH')
    .switchMap((action: any) =>
      Rx.Observable.ajax.getJSON(`localhost:3000/Test`)
        .filter(filterCongressCritters('D'))
        .map(mapGraph)
        // .catch(error => console.error(error)) -> need to add error handling
    )
}

/* Undefined for some reason ...? */
console.log('STORE',{Store})
// Store.dispatch({type: 'FETCH_GRAPH'})

function filterCongressCritters(party: string): any {
  return (critter) => {
    return critter.properties.party[0].value === party
  }
}

function mapGraph(result){
  console.log('mapGraph',result)
  return {
    type: 'FETCH_GRAPH_FULFILLED',
    payload: result
  }
}

// dispatch({type: 'FETCH_GRAPH_RESPONSE'})
