import * as React from 'react'
import * as Graph from 'react-graph-vis'
import {connect} from 'react-redux'


import {Store} from '../state/store'

/* sync fetch and retreive latest state tree
  way to turn the observable into a regular object
  call the redux state store instead of the observables
*/

const GraphState = {
  nodes: []
}

async function graphController(){
  const latestGraphData = await retrieveGraphState()

  console.log(latestGraphData)

  //.then(data => data.graphReducer.graph)

  return wrangleGraphData(latestGraphData)
}

function retrieveGraphState(): any {
  Store.dispatch({type: 'FETCH_GRAPH'})
  console.log('STORE STATE', Store.getState() )
  return Store.getState()
}

/* convert state tree format to proper node format (map func) */
function updateGraphState(): any{
  Store.subscribe(() => {
    GraphState.nodes.push(Store.getState())
  })
  return GraphState
}

function wrangleGraphData(data){
  console.log('wrangling',data,data.graphReducer,data.graphReducer.graph)
  if(data.graphReducer.graph){
    console.log('hey we wrangling')
    return data.graphReducer.graph.map(node => {
      return {id: node.id[0].id, label: `${node.first_name[0].value + node.last_name[0].value}`, color: '#e04141'}
    })
  }
  console.error('Graph property is not showing up')
}

// updateGraphState()

// const newGraph = wrangleGraphData(retrieveGraphState())
// console.log('Graph post wrangling!',newGraph,GraphState.nodes[0].graphReducer)

let nodes = []

graphController().then

const graph = {
  nodes: nodes,
  edges: [
      {from: 1, to: 2},
      {from: 1, to: 3},
      {from: 2, to: 4},
      {from: 2, to: 5}
    ]
};

// const graph = {
//   nodes: [
//       {id: 1, label: 'Node 1', color: '#e04141'},
//       {id: 2, label: 'Node 2', color: '#e09c41'},
//       {id: 3, label: 'Node 3', color: '#e0df41'},
//       {id: 4, label: 'Node 4', color: '#7be041'},
//       {id: 5, label: 'Node 5', color: '#41e0c9'}
//     ],
//   edges: [
//       {from: 1, to: 2},
//       {from: 1, to: 3},
//       {from: 2, to: 4},
//       {from: 2, to: 5}
//     ]
// };

const options = {
    layout: {
        hierarchical: true
    },
    edges: {
        color: "#000000"
    }
};

const events = {
    select: function(event) {
        const { nodes, edges } = event;
    }
}

export {Graph,graph,options,events}

/* Strict TS

export interface GraphProps { graph: object; options: object; events: object; }

export function NetworkGraph(props: GraphProps){
  return (
    <div>
      <Graph graph={props.graph} options={props.options} events={props.events} />
    </div>
  )
}

*/
