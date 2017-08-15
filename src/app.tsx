import * as React from 'react'
import * as ReactDOM from "react-dom"

import {Greeting} from './components/greeting'

function App() {
  return (
    <div>
      <Greeting name="Mike" />
    </div>
  )
}

ReactDOM.render(
  // <Provider store={store}>
    <App />,
    // <Greeting name="Mike" />,

  // </Provider>,
  document.getElementById('root') as HTMLElement
);

export default App
