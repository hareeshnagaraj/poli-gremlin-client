export const fetchGraph = graph => {
  return {
    type: 'FETCH_GRAPH',
    graph
  }
}

export const fetchGraphFulfilled = graph => {
  return {
    type: 'FETCH_GRAPH_FULFILLED',
    graph
  }
}

export function logError(errorObj) {
  return {
    type: 'LOG_ERROR',
    errorObj
  }
}
