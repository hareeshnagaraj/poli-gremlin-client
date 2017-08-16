import * as React from 'react'
import * as ReactDOM from "react-dom"
// import { browserHistory } from 'react-router-dom'

import {Greeting} from './components/greeting'
import {graphDataObservable} from './eventHandlers'
import {Routes} from './routes'

import Graph, {graph,options,events} from './components/visualizer'
// import {NetworkGraph} from './components/visualizer'
// import * as GraphComp from './components/visualizer'
// import Graph,graph,options,events from './components/visualizer'

/* here to log to the console for dev purposes */
graphDataObservable

function App() {
  return (
    <div>
      <Greeting name="Mike" />
    </div>
  )
}

function NetGraphEl(): any{
  // const Graph = GraphComp.default.Graph
  // const graph = GraphComp.default.graph
  // const options = GraphComp.default.options
  // const events = GraphComp.default.events

  return (
    <div>
      <Graph graph={graph} options={options} events={events} />
    </div>
  )
}


ReactDOM.render(
  <div>
    <div>
      <App />
    </div>
    <div>
      <NetGraphEl/>
    </div>
  </div>
  ,
  document.getElementById('root') as HTMLElement
);


// ReactDOM.render(
//    <Routes history={browserHistory} />,
//    document.getElementById('root')
//  );

 export default App
