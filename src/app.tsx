import * as React from 'react'
import * as ReactDOM from 'react-dom'
// import { browserHistory } from 'react-router-dom'

import {Greeting} from './components'
import {graphDataObservable} from './epics'
import {Routes} from './routes'

import {Graph, graph,options,events} from './components/visualizer'

/* here to log to the console for dev purposes */
graphDataObservable
const rootElement = document.getElementById('root') as HTMLElement


function App() {
  return (
    <div>
      <Greeting name="Mike" />
    </div>
  )
}


function NetGraphEl(){
  return (
    <div>
      <Graph.default graph={graph} options={options} events={events} />
    </div>
  )
}

ReactDOM.render(
  <div>
    <div>
      <App />
    </div>
    <div>
      <NetGraphEl />
    </div>
  </div>
  ,
  rootElement
);


// ReactDOM.render(
//    <Routes history={browserHistory} />,
//    document.getElementById('root')
//  );

 export default App
