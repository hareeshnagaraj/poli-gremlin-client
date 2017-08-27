import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { rootEpic, rootReducer } from './root'

export const epicMiddleware = createEpicMiddleware(rootEpic)

/* pass an initalize store object as 2nd argument to store config */
export function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware)
  )

  return store
}
