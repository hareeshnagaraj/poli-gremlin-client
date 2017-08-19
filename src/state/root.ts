import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';

import {fetchGraphEpic} from '../epics'
import graphState from './reducers/graphState'

export const rootEpic = combineEpics(fetchGraphEpic)

export const rootReducer = combineReducers({
  graphState
})
