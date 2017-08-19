// import from 'redux-observable'

import {graphDataObservable} from '../../epics'

const defaultGraphState = {
  activeGraphs: graphDataObservable || null
}

export default function(state = defaultGraphState, action){
  state.activeGraphs //.subscribe(data => data.forEach(node => console.log(node)))
}
