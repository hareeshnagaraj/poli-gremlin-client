import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';

import {fetchGraphEpic} from '../epics'
import graphState from './reducers/graphState'

/* Remember to destructure import on store config when combining multiple epics */
// export const rootEpic = combineEpics({
//   fetchGraphEpic
// })

export const rootEpic = combineEpics(fetchGraphEpic)

//set graphState to null as a temporary hack -> REPLACE
export const rootReducer = combineReducers({
  graphState
})
