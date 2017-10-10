import * as React from 'react'
import { Graph } from 'react-d3-graph'
import { connect } from 'react-redux'
import { Store } from '../../state/store'

//https://github.com/danielcaldas/react-d3-graph/blob/master/sandbox/Sandbox.js
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

const inMemoryData = { inMemoryNodes : {}, inMemoryLinks : {} };
const idMap = {}
const inMemNode = (d3NodeId) => 
{
  return inMemoryData.inMemoryNodes[idMap[d3NodeId]];
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
    height:950,
    panAndZoom:false
}

function GraphVisual({nodes,links,onClickLink,onMouseOverNode}){
  const asyncGraph = asyncGraphData(customizeNodes(nodes), customizeLinks(links))
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
    nodes : state.graphReducer.nodes,
    links : state.graphReducer.links
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
    onMouseOverNode : (d3NodeId) => {
    }
  }
}


function asyncGraphData(nodes, links){
  if (nodes) {
    return {
      nodes: nodes,
      links: links == undefined ? [] : links
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
  let firstName = decodeURIComponent(node.properties.first_name[0].value);
  let lastName = decodeURIComponent(node.properties.last_name[0].value);
  return `${firstName} ${lastName}`;
}

function customizeLinks(links){
  if(links === null || links === undefined){
    return null;
  }

  return links.reduce((filtered,link) => {
    inMemoryData.inMemoryLinks[`${link.id}`] = link;
    let currentLink = inMemoryData.inMemoryLinks[link.id];
      
    let outgoingVertex = inMemoryData.inMemoryNodes[currentLink.outV];
    let outName = getName(outgoingVertex);
    let incomingVertex = inMemoryData.inMemoryNodes[currentLink.inV];
    let incomingName = getName(incomingVertex);

    if(outgoingVertex.properties.party[0].value != 'R' 
      && outgoingVertex.properties.party[0].value != 'D'){
        filtered.push( {
          source : outName,
          target : incomingName
        });
      }

      return filtered;
  }, []);
}

function customizeNodes(data){

  if(data === null || data === undefined){
    return null;
  }

  if(Object.keys(data).length !== 0){
    return data.map(node => {

      let name = getName(node);

      inMemoryData.inMemoryNodes[node.id] = node;
      idMap[name] = node.id;

      return { 
        labelProperty: 'name',
        id: name, 
        color: customizeNodeColor(node),
        details:node };
    })
  }
}

// Graph event callbacks
const onClickNode = function(d3id) {
  console.log(inMemNode(d3id));
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
