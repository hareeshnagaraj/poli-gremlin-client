export namespace d3Types {
  export type d3Node = {
    id: string,
    group: number,
    index: number,
    details: any
  };

  export type d3Link = {
    source: string,
    target: string,
    value: number,
    gremlinInfo: any
  };

  export type d3Graph = {
    nodes: d3Node[],
    links: d3Link[]
  };
}
