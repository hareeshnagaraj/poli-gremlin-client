export const increaseRating = rating => {
  return {
    type: 'RATE_ITEM_UP',
    payload: rating
  }
}

export const decreaseRating = rating => {
  return {
    type: 'RATE_ITEM_DOWN',
    payload: rating
  }
}
