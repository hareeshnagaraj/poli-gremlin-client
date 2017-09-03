import * as React from 'react'
import { Graph } from 'react-d3-graph'
import { connect } from 'react-redux'

import { Store } from '../../state/store'

// https://github.com/danielcaldas/react-d3-graph/blob/master/sandbox/Sandbox.js
//https://github.com/reactjs/reselect
// Graph payload (with minimalist structure)

//https://gist.github.com/zxbodya/20c63681d45a049df3fc

//http://redux.js.org/docs/advanced/AsyncActions.html

const sampleData = {
    nodes: [
      {id: 'Harry'},
      {id: 'Sally'},
      {id: 'Alice'}
    ],
    links: [
        {source: 'Harry', target: 'Sally'},
        {source: 'Harry', target: 'Alice'}
    ]
}

// const data = wrangleGraphData(retrieveGraphState()) || sampleData

// The graph configuration
const myConfig = {
    highlightBehavior: true,
    node: {
        color: 'lightgreen',
        size: 10000,
        highlightStrokeColor: 'blue'
    },
    link: {
        highlightColor: 'lightblue'
    }
}

// Graph event callbacks
const onClickNode = function(nodeId) {
  console.log('Clicked node', nodeId)
}

const onMouseOverNode = function(nodeId) {
  console.log('Mouse over node', nodeId)
  //  window.alert('Mouse over node', nodeId)
}

const onMouseOutNode = function(nodeId) {
}

const onClickLink = function(nodeId) {
}

function asyncGraphData(graphData){
  console.log('analyzing graph object')

  return graphData ? {
    nodes: graphData,
    links: [
        {source: 'RogerWicker', target: "ChristopherMurphy"}
    ]
  }

  : sampleData
}

function GraphVisual({graph,onClickLink}){
  const asyncGraph = asyncGraphData(wrangleGraphData(graph))
  console.log('async graph',asyncGraph)
  return (
    <Graph
         id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
         data={ asyncGraph }
         onChange={ asyncGraph }
         config={myConfig}
         onClickNode={onClickNode}
         onClickLink={onClickLink}
         onMouseOverNode={onMouseOverNode}
         onMouseOutNode={onMouseOutNode}
   />
  )
}

const mapStateToProps = state => {
  return {
    graph : state.graphReducer.graph
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchGraph : () => dispatch({
        type : 'FETCH_GRAPH'
    }),
    onClickLink : () => dispatch({
        type : 'SELECTED_EDGE'
    })
  }
}


export const GraphComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphVisual)




function wrangleGraphData(data){
  if(Object.keys(data).length !== 0){
    return data.map(node => {
      console.log('node!',node)
      return {uuid: node.id, id: `${node.properties.first_name[0].value + node.properties.last_name[0].value}`, color: '#e04141'}
    })
  }
  console.error('Graph property is not showing up')
}

/*

function getGraphNodes(state){
  console.log('current state tree!',state,state.graphReducer)
  return state.graphReducer
}
function getLatestGraph(){
  const currentStateTree = getGraphNodes(Store.getState())
  console.log('hey', wrangleGraphData(currentStateTree))
}
const unsubscribe = Store.subscribe(getLatestGraph)

*/
