const defaultGraphState = {
  graph: []
}

export function graphReducer(state = defaultGraphState, action){
  switch(action.type) {
    case 'FETCH_GRAPH_FULFILLED':
      return Object.assign({}, state.graph, {graph: action.payload})
    default:
      return state
  }
}
