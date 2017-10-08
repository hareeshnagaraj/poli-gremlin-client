import * as React from 'react'
import { Graph } from 'react-d3-graph'
import { connect } from 'react-redux'

import { Store } from '../../state/store'

// https://github.com/danielcaldas/react-d3-graph/blob/master/sandbox/Sandbox.js

//https://gist.github.com/zxbodya/20c63681d45a049df3fc

//http://redux.js.org/docs/advanced/AsyncActions.html

const sampleData = {
    nodes: [
      {id: 'Harry',labelProperty:'name', name:'Fred'},
      {id: 'Sally'},
      {id: 'Alice'}
    ],
    links: [
        {source: 'Harry', target: 'Sally'},
        {source: 'Harry', target: 'Alice'}
    ]
}


/** The graph configuration ->
      https://github.com/danielcaldas/react-d3-graph/blob/master/src/components/Graph/config.js
*/
const myConfig = {
    highlightBehavior: true,
    node: {
        color: 'lightgreen',
        size: 1000,
        highlightStrokeColor: 'blue'
    },
    link: {
        highlightColor: 'lightblue'
    },
    width:1200,
    height:950
}


function GraphVisual({graph,onClickLink,onMouseOverNode}){
  const asyncGraph = asyncGraphData(customizeNodes(graph))
  return (
    <Graph
         id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
         data={asyncGraph}
         onChange={asyncGraph} // onChange attribute allows component to update on receipt of new state information
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
    // onFetchGraph : () => dispatch({
    //     type : 'FETCH_GRAPH'
    // }),
    onClickLink : () => {
      dispatch({
          type : 'SELECTED_EDGE'
      })
    },
    onMouseOverNode : (nodeId) => {
    }
  }
}


function asyncGraphData(graphData){
  if (graphData) {
    return {
      nodes: graphData,
      links: [
          // {source: 'Roger Wicker', target: 'Christopher Murphy'}
      ]
    }
  }
  return sampleData
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
  var firstName = decodeURIComponent(node.properties.first_name[0].value);
  var lastName = decodeURIComponent(node.properties.last_name[0].value);
  return `${firstName} ${lastName}`;
}

function customizeNodes(data){
  if(Object.keys(data).length !== 0){
    return data.map(node => {
      return { labelProperty: 'name', id: getName(node), color: customizeNodeColor(node) };
    })
  }
}

// Graph event callbacks
const onClickNode = function(nodeId) {
}

const onMouseOutNode = function(nodeId) {
}

const onClickLink = function(nodeId) {
}

const graphEvents = {
  onClickNode,
  onClickLink,
  onMouseOutNode,
  //onMouseOverNode
}

export const GraphComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphVisual)
