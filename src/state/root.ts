import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';

import {fetchGraphEpic} from '../epics'
import {graphReducer} from './reducers/graphState'
import {ratingReducer} from './reducers/rating'

/* Remember to destructure import on store config when combining multiple epics
      export const rootEpic = combineEpics({
        fetchGraphEpic
      })
*/

export const rootEpic = combineEpics(fetchGraphEpic)

export const rootReducer = combineReducers({
  graphReducer,
  ratingReducer
})
