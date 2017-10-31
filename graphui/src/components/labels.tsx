import * as React from "react";
import * as d3 from "d3";
import { d3Types } from "../types";

class Label extends React.Component<{ node: d3Types.d3Node }, {}> {
  ref: SVGTextElement;

  componentDidMount() {
    d3.select(this.ref).data([this.props.node]);
    
  }

  render() {
    return <text opacity="0.5" className="label" ref={(ref: SVGTextElement) => this.ref = ref}>
      {this.props.node.id}
    </text>;
  }
}

export default class Labels extends React.Component<{ nodes: d3Types.d3Node[] }, {}> {
  componentDidUpdate(prevProps:any,prevState:any){
    const labels = d3.selectAll(".label");

    labels.on("mouseover", (d:any)=>{
        console.log(d);
      });
  }
  
  render() {

    const labels = this.props.nodes.map((node: d3Types.d3Node, index: number) => {
      return <Label key={index} node={node} />;
    });

    return (
      <g className="labels">
        {labels}
      </g>
    );
  }
}
