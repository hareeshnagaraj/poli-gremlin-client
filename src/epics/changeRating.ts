import * as Rx from 'rxjs';

import {increaseRating} from '../actions'

const RatingAction = 'RATE_ITEM_UP' || 'RATE_ITEM_DOWN'

export const fetchGraphEpic = (action$, store) => {
  return action$.ofType('RATE_ITEM_UP')
    .switchMap((action: any) =>
      action
        .map(increaseRating)
        .catch(epicError)
    )
}

/* future addition: import error action */
function epicError(error){
  return Rx.Observable.of({
    type: 'RATING_ERROR',
    payload: error,
    error: true
  })
}
