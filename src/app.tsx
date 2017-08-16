import * as React from 'react'
import * as ReactDOM from "react-dom"

import { browserHistory } from 'react-router-dom'

import {Greeting} from './components/greeting'

import {graphData} from './components/streamParse'

/* Congress Critter JSON Observable */
console.log(Array.isArray(graphData))
const filtered = graphData.filter(filterCongressCritters)

function filterCongressCritters(critter): any{
  // critter is currently the entire json array
  console.log(Array.isArray(critter), critter.length)
  return critter['party'].value === 'D'
}

filtered.subscribe(data => console.log(data), err => console.error(err))
graphData.subscribe(data => console.log('unfiltered data',data), err => console.error(err))

// map over observable stream
// https://preview.npmjs.com/package/rx-dom

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
