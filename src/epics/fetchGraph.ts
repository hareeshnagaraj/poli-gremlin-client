import {ajax} from 'rxjs/observable/dom/ajax'
import * as Rx from 'rxjs';

const ADD_Message = 'ADD_Message'
const FETCH_GRAPH = 'FETCH_GRAPH'
const graphName = 'Make a dynamic graph name'

export type Action = {
    // type: FETCH_GRAPH,
    text: 'Build my first Redux app',
    // date: new Date
}

const fetchGraph = graph => ({ type: FETCH_GRAPH, payload: graphName });

export const fetchGraphEpic = action$ =>
  action$.ofType(FETCH_GRAPH)
    .mergeMap(action =>
      ajax.getJSON(`localhost:3000/Test`)
        .filter(filterCongressCritters('D'))
        .forEach(node => console.log(node))
    )


function filterCongressCritters(party: string): any {
  return (critter) => {
    return critter.properties.party[0].value === party
  }
}
