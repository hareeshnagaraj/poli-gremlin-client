import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';

import { fetchGraphEpic, changeRatingEpic } from '../epics'
import { graphReducer } from './reducers/graphState'
import { ratingReducer } from './reducers/rating'

export const rootEpic = combineEpics(
  fetchGraphEpic,
  changeRatingEpic
)

export const rootReducer = combineReducers({
  graphReducer,
  ratingReducer
})
