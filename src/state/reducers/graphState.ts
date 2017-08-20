// import from 'redux-observable'
import {Store} from '../store'
import {graphData} from '../../epics'
import {fetchGraph} from '../../actions'

// const defaultGraphState = {
//   activeGraphs: graphData || null
// }

const defaultGraphState = {
}

export default function graphReducer(state = defaultGraphState, action){
  switch(action.type) {
    // case 'FETCH_GRAPH':
    //   console.log('action obj!',action, Object.assign({},state.activeGraphs))
    //   return //Object.assign({},state.activeGraphs)
    case 'FETCH_GRAPH_FULFILLED':
      console.log('fetching dawg',action)
      return action.payload
    default:
      return state
  }
}
