export const START_GRAPH_STREAM = payload => {
  return {
    type: 'START_STREAM',
    payload
  }
}

export const GRAPH_DATA_PACKET = payload => {
  return {
    type: 'FETCH_GRAPH_FULFILLED',//'GRAPH_DATA',
    payload
  }
}

export const CLOSE_GRAPH_STREAM = payload => {
  return {
    type: 'CLOSE_STREAM',
    payload
  }
}



/* DEPRACATED */
export const fetchGraph = graph => {
  return {
    type: 'FETCH_GRAPH',
    payload: graph
  }
}

export const fetchGraphFulfilled = graph => {
  console.log('fulfilling graph fetch request')
  return {
    type: 'FETCH_GRAPH_FULFILLED',
    payload: graph
  }
}
