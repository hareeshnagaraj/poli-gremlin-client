import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
// import { browserHistory } from 'react-router-dom'

import { Store } from './state/store'
import { Greeting, Search, Rating } from './components'
//need to import {RateItem} from './components' => will act as a container component
import { Graph,graph,options,events } from './components/containers/visualizer'

import janusEventHandler from './external'

janusEventHandler()

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
const searchStyles = { background: 'grey', margin: '0 auto' }

const rootElement = document.getElementById('root') as HTMLElement


ReactDOM.render(
  <Provider store={Store}>
    <div>
      <div style={headerStyles}>
        <h1>PoliGraph</h1>
      </div>
      <div>
        <App />
      </div>
      <div>
        <Rating />
      </div>
      <div style={searchStyles}>
        <Search input='Search for a node'/>
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