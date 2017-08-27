import {Store} from '../store'

const defaultRating = {rating: 0}

export function ratingReducer(state = defaultRating, action){
  switch(action.type) {
    case 'RATE_ITEM_UP':
      return Object.assign({}, state.rating, {rating: state.rating + 1})
    case 'RATE_ITEM_DOWN':
      return Object.assign({}, state.rating, {rating: state.rating - 1})
    default:
      return state
  }
}
