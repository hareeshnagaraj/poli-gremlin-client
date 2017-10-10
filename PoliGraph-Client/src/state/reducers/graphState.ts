const defaultGraphState = {
  nodes: [],
  links : []
}

export function graphReducer(state = defaultGraphState, action){
  switch(action.type) {
    case 'FETCH_GRAPH_FULFILLED':
      return Object.assign({}, state.nodes, {nodes: state.nodes.concat(action.payload), links : state.links})
    case 'FETCH_EDGES_FULFILLED':
      return Object.assign({}, state.links, {nodes : state.nodes, links : state.links.concat(action.payload)})
    default:
      return state
  }
}
