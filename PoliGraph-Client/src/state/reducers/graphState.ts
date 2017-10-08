const defaultGraphState = {
  graph: []
}

export function graphReducer(state = defaultGraphState, action){
  switch(action.type) {
    case 'FETCH_GRAPH_FULFILLED':
      return Object.assign({}, state.graph, {graph: state.graph.concat(action.payload)})
      //return Object.assign({}, state.graph, {graph: state.graph.slice(0).concat(action.payload)})
    default:
      return state
  }
}
