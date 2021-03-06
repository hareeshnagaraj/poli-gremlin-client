# The Challenge
  https://flowingdata.com/2017/04/24/how-disinformation-spreads-in-a-network/

# Future Additions
  * Create realtime news feed to accompany graph

    Sources:
      - NYT api
      - News api

    Steps -> hit api, stream to store, rebuild store, stream to view  


## Knowledge Graph
  Make the reading experience revolve around real-time graphs you can search and interact with.

## Functional React
https://facebook.github.io/react/docs/components-and-props.html
https://medium.com/missive-app/45-faster-react-functional-components-now-3509a668e69f
^benefits of stateless react - dont need to mount and unmount, purity, traditional functional benefits

https://www.codementor.io/mz026/getting-started-with-react-redux-an-intro-8r6kurcxf

## Visualizing Graphs
https://www.npmjs.com/package/react-graph-vis
http://visjs.org/network_examples.html
https://medium.com/ninjaconcept/interactive-dynamic-force-directed-graphs-with-d3-da720c6d7811

* https://www.capellaspace.com/
  --> cool graph visualization
    - implement a full page 3d graphical view
    - simple overlay of search bar, as well as pop up boxes, and graph manipulation / rating tools

* React + Graphs
  --> https://medium.com/@Elijah_Meeks/interactive-applications-with-react-d3-f76f7b3ebc71
  --> React adds a signficiant performance hit to rendering
  --> wrapping a svg component targeted by D3 likely the most performant option

* Force directed graph
  --> common solution for visualizing graph data
  --> hooks law or electromagnetism between nodes to determine a stable, symmetrical representation
  --> O(n^3) rendering

* 3d Visualizing - use react-three-renderer
  --> https://github.com/toxicFork/react-three-renderer/issues/28
  --> https://github.com/toxicFork/react-three-renderer

  3d-force-graph npm package provides the required functionality,
  however, it is not clear how nicely it will play with react.


## Streaming Operations
https://github.com/Reactive-Extensions/RxJS-DOM/blob/master/doc/operators/getjson.md
https://preview.npmjs.com/package/rx-dom

* Async Actions + Typescript
  --> https://rjzaworski.com/2016/09/typescript-redux-async-actions

* Flatmap vs Switchmap guide
  --> https://medium.com/@w.dave.w/becoming-more-reactive-with-rxjs-flatmap-and-switchmap-ccd3fb7b67fa  

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

## React-Redux

  * Provides bindings for the React virtual DOM views, and the redux state tree
  * Good Tutorial: http://www.sohamkamani.com/blog/2017/03/31/react-redux-connect-explained/

    https://github.com/reactjs/redux/blob/master/docs/basics/UsageWithReact.md
    http://blog.tylerbuchea.com/super-simple-react-redux-application-example/

## Testing React
  * https://hackernoon.com/a-guide-to-tdd-a-react-redux-todolist-app-part-1-b8a200bb7091
  * https://rjzaworski.com/2016/12/testing-typescript-with-jest
      --> https://github.com/rjz/typescript-react-redux
