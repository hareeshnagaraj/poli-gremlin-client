import * as React from "react";
import * as d3 from "d3";
import { d3Types } from "../types";

class Link extends React.Component<{ link: d3Types.d3Link }, {}> {
  ref: SVGLineElement;
  link: d3Types.d3Link;

  constructor(link: d3Types.d3Link){
    super();
    this.link = link;
  }

  shouldComponentUpdate(nextProps:any){

    if(nextProps.link != this.link){
      this.link = nextProps.link;
      d3.select(this.ref).data([this.link]);
      return true;
    }

    return false;
  }

  componentDidMount() {
    d3.select(this.ref).data([this.props.link]);
  }

  render() {
    return <line className="link" ref={(ref: SVGLineElement) => this.ref = ref}
      strokeWidth={Math.sqrt(this.props.link.value)} />;
  }
}

export default class Links extends React.Component<{ links: d3Types.d3Link[] }, {}> {
  links: d3Types.d3Link[];

  constructor(links: d3Types.d3Link[] ){
    super();
    this.links = links;
  }

  shouldComponentUpdate(nextProps:any){

    console.log(`Links updating : ${nextProps.links != this.links}`);

    if(nextProps.links != this.links){
      this.links = nextProps.links;
      return true;
    }

    return false;
  }

  render() {

    if(this.links.length == undefined){
      return (
        <g className="links">
        </g>
      );
    }

    const links = this.links.map((link: d3Types.d3Link, index: number) => {
      return <Link key={index} link={link} />;
    });

    return (
      <g className="links">
        {links}
      </g>
    );
  }
}
