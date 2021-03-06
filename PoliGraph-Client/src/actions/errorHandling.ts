export function logError(errorObj) {
  return {
    type: 'LOG_ERROR',
    payload: errorObj
  }
}

export function graphError(errorObj) {
  return {
    type: 'GRAPH_ERROR',
    payload: errorObj
  }
}

export function ratingError(errorObj) {
  return {
    type: 'RATING_ERROR',
    payload: errorObj
  }
}
