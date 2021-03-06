import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Graph from './components/App';
import './styles/index.css';

let d3graph:any = {};
d3graph.nodes = [];
d3graph.links = [];

ReactDOM.render(
  <Graph
    width={window.screen.availWidth}
    height={window.screen.availHeight}
    graph={d3graph} />,
  document.getElementById('root')
);
