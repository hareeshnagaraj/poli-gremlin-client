import * as Rx from 'rxjs';

import { increaseRating, decreaseRating } from '../actions'

const RatingAction = 'RATE_ITEM_UP' || 'RATE_ITEM_DOWN'

export const changeRatingEpic = (action$, store) => {
  return action$.ofType(RatingAction)
    .switchMap((action: any) =>
      action
        .map(increaseRating)
        .catch(epicError)
    )
}

function epicError(error){
  return Rx.Observable.of({
    type: 'RATING_ERROR',
    payload: error,
    error: true
  })
}
