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



function GraphVisual({graph,onClickLink}){
  const asyncGraph = asyncGraphData(customizeNodes(graph))
  return (
    <Graph
         id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
         data={asyncGraph}
         onChange={asyncGraph}
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

function asyncGraphData(graphData){
  return graphData ? {
    nodes: graphData,
    links: [
        {source: 'Roger Wicker', target: "Christopher Murphy"}
    ]
  }
  : sampleData
}

function customizeNodeColor(node){
  switch(node.properties.party[0].value) {
    case 'D':
      return '#0000FF'
    case 'R':
      return '#FF0000'
  }
}

function getName(node){
  return `${node.properties.first_name[0].value + ' ' + node.properties.last_name[0].value}`
}

function customizeNodes(data){
  if(Object.keys(data).length !== 0){
    return data.map(node => {
      return {uuid: node.id, id: getName(node), color: customizeNodeColor(node)}
    })
  }
}
