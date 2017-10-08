export const START_GRAPH_STREAM = payload => {
  return {
    type: 'START_GRAPH_STREAM',
    payload
  }
}

export const GRAPH_DATA_PACKET = payload => {
  console.log(payload);
  return {
    type: 'FETCH_GRAPH_FULFILLED',
    payload
  }
}

export const CLOSE_GRAPH_STREAM = payload => {
  return {
    type: 'CLOSE_GRAPH_STREAM',
    payload
  }
}
