import {Store} from '../store'

const defaultRating = {rating: 0}

export function ratingReducer(state = defaultRating,action){
  switch(action.type) {
    case 'RATE_ITEM_UP':
      return state.rating++
    case 'RATE_ITEM_DOWN':
      return state.rating--
    default:
      return state
  }
}
