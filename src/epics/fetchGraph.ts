import * as Rx from 'rxjs';

import {Store} from '../state/store'
import {fetchGraph,fetchGraphFulfilled} from '../actions'


/* Epic is response for action dispatch */
export const fetchGraphEpic = (action$, Store) => {
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

function epicError(error){
  return Rx.Observable.of({
    type: 'GRAPH_ERROR',
    payload: error.xhr.response,
    error: true
  })
}
