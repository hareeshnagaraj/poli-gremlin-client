import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import rootReducer from './reducers/root'

const store = createStore(rootReducer)

export default store
