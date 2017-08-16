//https://flowingdata.com/2017/04/24/how-disinformation-spreads-in-a-network/

import {graphDataObservable} from '../eventHandlers'
import * as Graph from 'react-graph-vis'
// var Graph = require('react-graph-vis');

/* Visualize the Graph Data Stream

https://www.npmjs.com/package/react-graph-vis
http://visjs.org/network_examples.html
*/

const graph = {
  nodes: [
      {id: 1, label: 'Node 1'},
      {id: 2, label: 'Node 2'},
      {id: 3, label: 'Node 3'},
      {id: 4, label: 'Node 4'},
      {id: 5, label: 'Node 5'}
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

// React.render(<Graph graph={graph} options={options} events={events} />, document.body);
