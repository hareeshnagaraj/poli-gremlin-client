import * as Rx from 'rxjs';

/* Use redux epics as an abstraction layer on RxJS library */

export const graphData = Rx.Observable.ajax.getJSON('/test')

export * from './streamParse'
export * from './fetchGraph'
