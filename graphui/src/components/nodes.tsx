import * as React from "react";
import * as d3 from "d3";
import { d3Types } from "../types";

class Node extends React.Component<{ node: d3Types.d3Node, color: string }, {}> {
  ref: SVGCircleElement;
  node:d3Types.d3Node;
  color:string;

  constructor(node: d3Types.d3Node, color: string){
    super();
    this.node = node;
    this.color = color;
  }

  componentDidMount() { 
    d3.select(this.ref).data([this.props.node]);
  }

  render() {
    return (
      <circle className="node" r={10} fill={this.props.color}
        ref={(ref: SVGCircleElement) => this.ref = ref}>
        <title>{this.node.id}</title>
      </circle>
    );
  }
}

export default class Nodes extends React.Component<{ nodes: d3Types.d3Node[], simulation: any }, {}> {
nodes: d3Types.d3Node[];
simulation:any;

  constructor(n: d3Types.d3Node[], s: any ){
    super();
    this.nodes = n;
    this.simulation = s;
  }

  shouldComponentUpdate(nextProps:any){

    if(nextProps.nodes != this.nodes){
      this.nodes = nextProps.nodes;
      this.simulation = nextProps.simulation;
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps:any,prevState:any){
    this.initializeDragListener();
  }

  initializeDragListener(){
  
    const onDragEnd = (d: any)=> {
      if (!d3.event.active) {
        this.props.simulation.alphaTarget(0);
      }
      
      d.fx = null;
      d.fy = null;
    };

    const onDragStart = (d: any) => {
      
      if (!d3.event.active) {
        this.props.simulation.alphaTarget(0.01).restart();
      }

      d.fx = d.x;
      d.fy = d.y;
    };

    const onDrag = (d: any) => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    };

    const nodes = d3.selectAll(".node");
    nodes.call(d3.drag()
      .on("start", onDragStart.bind(this))
      .on("drag", onDrag.bind(this))
      .on("end", onDragEnd).bind(this))
      .on("mouseover", (d:any)=>{
        console.log(d);
      });
    console.log("initializeDragListener");
  }

  colorFromParty(details: any){
    let party = details.properties.party[0].value;
    switch(party) { 
      case 'D': { 
          return '#0000FF';
      } 
      case 'R': { 
          return '#FF0000'; 
      } 
      default: { 
          return '#708090';
      } 
    } 
  }

  render() {

    if(this.nodes.length == undefined){
      return (
      <g className="nodes">
      </g>
    );
    }

    const nodes = this.nodes.map((node: d3Types.d3Node, index: number) => {
      return <Node key={index} node={node} color={this.colorFromParty(node.details)} />;
    });

    return (
      <g className="nodes">
        {nodes}
      </g>
    );
  }
}
