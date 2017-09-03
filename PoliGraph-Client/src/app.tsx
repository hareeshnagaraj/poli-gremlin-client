import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux';

import { Store } from './state/store'
import { Greeting, Search, Rating } from './components'
import { GraphComponent } from './components/containers/graph'

import janusEventHandler from './external'

//const webSocketConn = janusEventHandler()

/* Initalize the application by setting tcp event listeners to the Janus instance, dispatch initial graph import */
//webSocketConn ? webSocketConn : 'janus connection failed'

Store.dispatch({type: 'FETCH_GRAPH'})


function App() {
  return (
    <div>
      <Greeting name="Mike" />
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
        <GraphComponent />
      </div>
    </div>
  </Provider>
  ,
  rootElement
);

 export default App
