// import from 'redux-observable'
import {Store} from '../store'
import {graphData} from '../../epics'

// const defaultGraphState = {
//   activeGraphs: graphData || null
// }

const defaultGraphState = {}

export function graphReducer(state = defaultGraphState, action){
  switch(action.type) {
    // case 'FETCH_GRAPH':
    //   console.log('action obj!',action, Object.assign({},state.activeGraphs))
    //   return //Object.assign({},state.activeGraphs)
    case 'FETCH_GRAPH_FULFILLED':
      //Object.assign({}, state['graph'], action.payload)
      return state['graph'] = action.payload
    default:
      return state
  }
}
