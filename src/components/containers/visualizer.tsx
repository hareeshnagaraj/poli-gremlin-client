import * as React from 'react'
import * as Graph from 'react-graph-vis'
import { connect } from 'react-redux'


import { Store } from '../../state/store'

/* sync fetch and retreive latest state tree
  way to turn the observable into a regular object
  call the redux state store instead of the observables
*/

//http://redux.js.org/docs/advanced/ExampleRedditAPI.html /containers/asyncapp

/* fundamental issue is async nature of the epic middleware*/

const GraphState = {
  nodes: []
}

let graphState

function graphController(){
  const latestGraphData = retrieveGraphState()
  // console.log('latestGraphData!',latestGraphData, retrieveGraphState)

  // console.log(latestGraphData,
  //   latestGraphData
  //     .then(data => console.log(data))
  //     .catch(err => console.error(err))
  // )

  //.then(data => data.graphReducer.graph)
  graphState = latestGraphData

  // return setTimeout(wrangleGraphData(latestGraphData),10000)
}
graphController()

function retrieveGraphState(): any {
  Store.dispatch({type: 'FETCH_GRAPH'})
  console.log('STORE STATE', Store.getState() )
  return Store.getState()
}

function wrangleGraphData(data){
  if(data.graphReducer.graph){
    return data.graphReducer.graph.map(node => {
        console.log('node!',node)
      return {id: node.id, label: `${node.properties.first_name[0].value + node.properties.last_name[0].value}`, color: '#e04141'}
    })
  }
  console.error('Graph property is not showing up')
}

async function updateGraphState(){
  Store.dispatch({type: 'FETCH_GRAPH'})

  const data = await Store.subscribe(() => {
    graphState = Store.getState()
    console.log('knee deep',graphState, Store.getState())
    // const latestGraphData = Store.getState()
    // GraphState.nodes.push(latestGraphData['graphReducer'].graph)
  })

  return graphState
}

// updateGraphState()
// .then(data => console.log('data?',data))
// .catch(err => console.error(err))

const graphInterval = setInterval(function() {
    if (graphState) {
        clearInterval(graphInterval);
        console.log('current graph state: ',graphState,Array.isArray(wrangleGraphData(graphState)));

        return wrangleGraphData(graphState)
    }
}, 2500);

const SampleGraph = {
  nodes: [
      {id: 1, label: 'Node 1', color: '#e04141'},
      {id: 2, label: 'Node 2', color: '#e09c41'},
      {id: 3, label: 'Node 3', color: '#e0df41'},
      {id: 4, label: 'Node 4', color: '#7be041'},
      {id: 5, label: 'Node 5', color: '#41e0c9'}
    ],
  edges: [
      {from: 1, to: 2},
      {from: 1, to: 3},
      {from: 2, to: 4},
      {from: 2, to: 5}
    ]
};

console.log(graphInterval)

const graph = {
  nodes: graphInterval ? graphInterval : SampleGraph,
  edges: [
      {from: 1, to: 2},
      {from: 1, to: 3},
      {from: 2, to: 4},
      {from: 2, to: 5}
    ]
};

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
