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
