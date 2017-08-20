// import from 'redux-observable'
import {Store} from '../store'
import {graphDataObservable,graphData} from '../../epics'
import {fetchGraph} from '../actions'

const defaultGraphState = {
  activeGraphs: graphData || null
}

export default function(state = defaultGraphState, action){
  switch(action.type) {
    case 'FETCH_GRAPH':
      return Object.assign({},state.activeGraphs)
    case 'FETCH_GRAPH_FULFILLED':
      console.log('fulfilled case~!',action.payload)
      return Object.assign({}, action.payload)
    default:
      return state
  }
}

//state.activeGraphs.subscribe(handleGraphSubscription, handleError)

function handleGraphSubscription(data){
  return data.map(node => {
    console.log('reducer subscription',node)
    // Store.dispatch(fetchGraph(node))
    return node
  })
}

function handleError(error){
  return console.error(error)
}
