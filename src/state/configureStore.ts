import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { rootEpic, rootReducer } from './root'

export const epicMiddleware = createEpicMiddleware(rootEpic)

export function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware)
  )

  return store
}
