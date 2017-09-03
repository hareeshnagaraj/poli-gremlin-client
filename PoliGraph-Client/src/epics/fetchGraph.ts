import * as Rx from 'rxjs';

import {fetchGraphFulfilled} from '../actions'

/* flatmap / switch map operate on each value in observable stream, while reducing into a single observable
   that can than be subscribed to -> this is handled by the epic middleware in configureStore

   switchMap forces latest data into stream
*/

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
