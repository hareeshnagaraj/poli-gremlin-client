import * as Rx from 'rxjs';

export const graphData = Rx.Observable.ajax.getJSON('/test')

import {graphDataObservable} from './streamParse'

export {graphDataObservable}
