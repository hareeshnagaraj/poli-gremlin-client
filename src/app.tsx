import * as React from 'react'
import * as ReactDOM from "react-dom"
import { browserHistory } from 'react-router-dom'

import {Greeting} from './components/greeting'
import {graphDataObservable} from './eventHandlers'
import {Routes} from './routes'

/* here to log to the console for dev purposes */
graphDataObservable

function App() {
  return (
    <div>
      <Greeting name="Mike" />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);


// ReactDOM.render(
//    <Routes history={browserHistory} />,
//    document.getElementById('root')
//  );

 export default App
