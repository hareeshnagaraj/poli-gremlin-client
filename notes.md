# The Challenge
  https://flowingdata.com/2017/04/24/how-disinformation-spreads-in-a-network/


## Knowledge Graph
  Make the reading experience revolve around real-time graphs you can search and interact with.

## Functional React
https://facebook.github.io/react/docs/components-and-props.html

## Visualizing Graphs
https://www.npmjs.com/package/react-graph-vis
http://visjs.org/network_examples.html
https://medium.com/ninjaconcept/interactive-dynamic-force-directed-graphs-with-d3-da720c6d7811


## Stream Parsing JSON
https://github.com/Reactive-Extensions/RxJS-DOM/blob/master/doc/operators/getjson.md
https://preview.npmjs.com/package/rx-dom


## Redux
https://github.com/piotrwitek/react-redux-typescript-guide
https://rjzaworski.com/2016/08/getting-started-with-redux-and-typescript
https://github.com/bvaughn/redux-search

* Redux Observables
  https://github.com/redux-observable/redux-observable
  https://www.youtube.com/watch?v=AslncyG8whg

* Redux Sagas -> tool for managing side effects
    https://medium.freecodecamp.org/async-operations-using-redux-saga-2ba02ae077b3

* Epics > Sages    (declarative vs imperative pattern)

* Excellent Overview of different pieces of state management
  https://code-cartoons.com/a-cartoon-intro-to-redux-3afb775501a6

  * Actions
    are dispatched when a change to the application sate is desired.
      The state store only has getters, can only alter state through desired channels
        -> (specified reducer function)

  * Reducers
    are used to change application state -> adopts a functional immutable paradigm.
      Can be nested hierarchically. First copy area to change, then return a new state.

  * Smart components (orchestrate actions and thereby direct dumb components; they are unstyled)

* Connecting state store to the view layer
    can use react-redux
