import * as React from 'react';
import * as d3 from 'd3';
import { d3Types } from "../types";
import Links from "./links";
import Nodes from "./nodes";
import Labels from "./labels";
import '../styles/App.css';
// import * as ReactDOM from 'react-dom';

const gremlin = require('gremlin-client');
const GremlinClient = gremlin.createClient(8182,'40.112.250.222');

let nodeA:string = "122925224";
let nodeB:string = "40980536";

interface Props {
  width: number;
  height: number;
  graph: d3Types.d3Graph;
}

export default class App extends React.Component<Props, {}> {
  simulation: any;
  inMemoryData:any = { inMemoryNodes : {}, inMemoryLinks : {} };
  idMap:any = {};
  graph:d3Types.d3Graph;
  width:number;
  height:number;

  constructor(props: Props) {
    super(props);

    this.graph = props.graph;
    this.width = props.width;
    this.height = props.height;

    // Initialize simulation
    this.simulation = d3.forceSimulation();
  }
  
  componentDidMount(){
    this.initializeGraph(nodeA,nodeB);
  }

  componentWillReceiveProps(nextProps:Props) {
    if(nextProps.graph !== this.props.graph) {
      this.setState({graph: nextProps.graph});
    }
  }

  getName(node: any){
    let firstName = decodeURIComponent(node.properties.first_name[0].value);
    let lastName = decodeURIComponent(node.properties.last_name[0].value);
    return `${firstName} ${lastName}`;
  }

  drawGraph_(){
      this.simulation = d3.forceSimulation()
      .force("link", 
        d3.forceLink()
          .id((d: d3Types.d3Node) => {
            return d.id;
          })
          .distance((d: d3Types.d3Link)=>{
            return d.value;
        }))
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("center", d3.forceCenter(this.width / 2, this.height / 2))
      .nodes(this.graph.nodes);

    this.simulation.force("link").links(this.graph.links);
    d3.selectAll(".node").on("click",this.clicked.bind(this));
  }

  drawGraph = () => {

      this.simulation
        .force("charge", d3.forceManyBody().strength(-1000))
        .force("center", d3.forceCenter(this.width / 2, this.height / 2))
        .nodes(this.graph.nodes)
        .force("link", d3.forceLink().id((d: d3Types.d3Node) => { 
          return d.id; 
        }))
        .force("link").links(this.graph.links);

      this.simulation.nodes(this.graph.nodes).on("tick", this.ticked);
      d3.selectAll(".node").on("click",this.clicked.bind(this));
  
      this.simulation.restart();
      console.log("Restarted sim");
  }

  initializeGraph = (id1:string, id2:string) => {
    let d3graph:d3Types.d3Graph = { nodes: [], links: []};
    this.inMemoryData = { inMemoryNodes : {}, inMemoryLinks : {} };
    
    GremlinClient.execute(
      "g.V()",
      {},
      (e: any, results: any) => {
          d3graph.nodes = this.createD3JsonNodes(results);
          this.addNodeEdges(d3graph, id1);
          this.throwOnError(e);
      });
  }

  addNodeEdges = (d3graph:d3Types.d3Graph, id1:string) => {

    GremlinClient.execute(
      `g.V(${id1}).outE()`,
      {},
      (e: any, results: any) => {

        this.throwOnError(e);
        d3graph.links = (this.createD3JsonLinks(d3graph.nodes, results));
        this.graph = d3graph;

        try{
          this.setState((prevState, props) => {
                return {
                  graph: this.graph
                };
              }, 
              this.drawGraph);
        }catch(any){
          console.log(any);
        }
    });
  }

  throwOnError = (e:any) => {
    if(e != null){ 
      console.log(e);
      throw e;
    }
  }

  createD3JsonNodes = (data : any): any => {
    if(data === null || data === undefined){
      return null;
    }

    if(Object.keys(data).length !== 0){
      
      let returnData : d3Types.d3Node[] = [];
      let i : number = 0;
      data.forEach((node:any) => {

        let name = this.getName(node);
        node.index = i;
        this.inMemoryData.inMemoryNodes[node.id] = node;
        this.idMap[name] = node.id;

        i++;

        returnData.push({ 
          id: name,
          index: i,
          group: 
            node.properties.party[0].value == 'R' ? 
              1 :
              node.properties.party[0].value == 'D' ? 
              10 :
              4,
            details: node
        });
      });

      return returnData;
    }
  }

   createD3JsonLinks = (d3Nodes : any, gremlinEdgeData: any) : any[]=> {
      let i : number = 0;
      return gremlinEdgeData.reduce((filtered:any[], link:any) => {

        this.inMemoryData.inMemoryLinks[`${link.id}`] = link;
        let currentLink = this.inMemoryData.inMemoryLinks[link.id];
        let outgoingVertex = this.inMemoryData.inMemoryNodes[currentLink.outV];
        let incomingVertex = this.inMemoryData.inMemoryNodes[currentLink.inV];

        let outgoingd3Node = d3Nodes[outgoingVertex.index];
        let incomingd3Node = d3Nodes[incomingVertex.index];

        filtered.push({
          index : i,
          source : outgoingd3Node,
          target : incomingd3Node,
          value : Math.round(currentLink.properties.agreePercent) % 10,
          gremlinInfo : link
        });

        i++;
          
         return filtered;
      }, []);
  }

  clicked(x:any){
       this.addNodeEdges(this.graph, x.details.id);
   }

  ticked() {
     const node = d3.selectAll(".node");
     const link = d3.selectAll(".link");
     const label = d3.selectAll(".label");

    link
      .attr("x1", function (d: any) {
        return d.source.x;
      })
      .attr("y1", function (d: any) {
        return d.source.y;
      })
      .attr("x2", function (d: any) {
        return d.target.x;
      })
      .attr("y2", function (d: any) {
        return d.target.y;
      });

    node
      .attr("cx", function (d: any) {
        return d.x;
      })
      .attr("cy", function (d: any) {
        return d.y;
      });

    label
      .attr("x", function (d: any) {
        return d.x;
      })
      .attr("y", function (d: any) {
        return d.y + 5;
      });
    }

  render() {
    const { width, height } = this.props;

    return (
      <svg className="container"
        width={width} height={height}>
        <Links links={this.graph.links} />
        <Nodes nodes={this.graph.nodes} simulation={this.simulation} />
        <Labels nodes={this.graph.nodes} />
      </svg>
    );
  }
}
