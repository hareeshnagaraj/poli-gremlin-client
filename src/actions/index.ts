export const fetchGraph = graph => {
  return {
    type: 'FETCH_GRAPH',
    graph
  }
}

export const fetchGraphFulfilled = graph => {
  console.log('fetchGraphFulfilled action', graph)
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

export function graphError(errorObj) {
  return {
    type: 'GRAPH_ERROR',
    errorObj
  }
}
