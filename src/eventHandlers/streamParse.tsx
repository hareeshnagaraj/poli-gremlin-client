import * as Rx from 'rxjs';

export const graphData = Rx.Observable.ajax.getJSON('/test')

//
// export interface ParseProps { name: string; }
//
// export function parse(){
//
// }
