//https://flowingdata.com/2017/04/24/how-disinformation-spreads-in-a-network/

import {graphDataObservable} from '../eventHandlers'

import * as React from "react"
import * as Graph from 'react-graph-vis'

import {render} from 'react-dom'

/* Visualize the Graph Data Stream

https://www.npmjs.com/package/react-graph-vis
http://visjs.org/network_examples.html
https://medium.com/ninjaconcept/interactive-dynamic-force-directed-graphs-with-d3-da720c6d7811
*/

const graph = {
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


export interface GraphProps { graph: object; options: object; events: object; }

export function NetworkGraph(props: GraphProps){
  return (
    <div>
      <Graph graph={props.graph} options={props.options} events={props.events} />
    </div>
  )
}
