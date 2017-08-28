// import * as React from 'react'
// import * as Graph from 'react-graph-vis'
// import { connect } from 'react-redux'
//
// /* using to test if information is an instance of observable */
// import * as Rx from 'rxjs';
//
// import { Store } from '../../state/store'
//
// /* sync fetch and retreive latest state tree
//   way to turn the observable into a regular object
//   call the redux state store instead of the observables
// */
//
// //http://redux.js.org/docs/advanced/ExampleRedditAPI.html /containers/asyncapp
//
// /* fundamental issue is async nature of the epic middleware*/
//
// const GraphState = {
//   nodes: []
// }
//
//
// function retrieveGraphState(): any {
//   Store.dispatch({type: 'FETCH_GRAPH'})
//   console.log('STORE STATE', Store.getState() )
//   return Store.getState()
// }
//
// function wrangleGraphData(data){
//   console.log('pre wrangling!',data.graphReducer)
//   if(data.graphReducer instanceof Rx.Observable) console.log('we gots an observable!')
//   if(data.graphReducer.graph){
//     return data.graphReducer.graph.map(node => {
//       console.log('node!',node)
//       return {id: node.id, label: `${node.properties.first_name[0].value + node.properties.last_name[0].value}`, color: '#e04141'}
//     })
//   }
//   console.error('Graph property is not showing up')
// }
//
//
// const SampleGraph = {
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
//
// const graph = {
//   nodes: wrangleGraphData(retrieveGraphState()) ? wrangleGraphData(retrieveGraphState()) : SampleGraph,
//   edges: [
//       {from: 1, to: 2},
//       {from: 1, to: 3},
//       {from: 2, to: 4},
//       {from: 2, to: 5}
//     ]
// };
//
// const options = {
//     layout: {
//         hierarchical: true
//     },
//     edges: {
//         color: "#000000"
//     }
// };
//
// const events = {
//     select: function(event) {
//         const { nodes, edges } = event;
//     }
// }
//
// export {Graph,graph,options,events}
//
// /* Strict TS
//
// export interface GraphProps { graph: object; options: object; events: object; }
//
// export function NetworkGraph(props: GraphProps){
//   return (
//     <div>
//       <Graph graph={props.graph} options={props.options} events={props.events} />
//     </div>
//   )
// }
//
// */
