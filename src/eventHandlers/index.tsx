import * as Rx from 'rxjs';

export const graphData = Rx.Observable.ajax.getJSON('/test')

export * from './streamParse'
