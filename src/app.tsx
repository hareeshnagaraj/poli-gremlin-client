import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
// import { browserHistory } from 'react-router-dom'

import {Store} from './state/store'
import {Greeting,Search} from './components'
import {Graph, graph,options,events} from './components/visualizer'
import {Routes} from './routes'


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


const headerStyles = { background: 'blue', color: 'white', margin: '0 auto' }
const rootElement = document.getElementById('root') as HTMLElement

ReactDOM.render(
  <Provider store={Store}>
    <div>
      <div style={headerStyles}>
        <h1>PoliGraph</h1>
      </div>
      <div>
        <App />
        <p> What do you want to search for today?</p>
      </div>
      <div>
        <NetGraphEl />
      </div>
    </div>
  </Provider>
  ,
  rootElement
);

 export default App
