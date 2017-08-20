export const fetchGraph = graph => {
  return {
    type: 'FETCH_GRAPH',
    payload: graph
  }
}

export const fetchGraphFulfilled = graph => {
  console.log('fetchGraphFulfilled action', graph)
  return {
    type: 'FETCH_GRAPH_FULFILLED',
    payload: graph
  }
}
