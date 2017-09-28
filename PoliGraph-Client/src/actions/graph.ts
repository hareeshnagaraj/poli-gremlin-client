export const fetchGraph = graph => {
  return {
    type: 'FETCH_GRAPH',
    payload: graph
  }
}

export const fetchGraphFulfilled = graph => {
  return {
    type: 'FETCH_GRAPH_FULFILLED',
    payload: graph
  }
}
