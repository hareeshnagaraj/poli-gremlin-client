// import from 'redux-observable'
import {Store} from '../store'
import {graphDataObservable,graphData} from '../../epics'

const defaultGraphState = {
  activeGraphs: graphData || null
}

export default function(state = defaultGraphState, action){
  if(state)  return state.activeGraphs.subscribe(handleGraphSubscription, handleError)
  throw new Error('Observable is undefined')
}


function handleGraphSubscription(data){
  return data.map(node => {
    console.log('reducer subscription',node)
    Store.dispatch(node)
    return node
  })
}

function handleError(error){
  return console.error(error)
}
