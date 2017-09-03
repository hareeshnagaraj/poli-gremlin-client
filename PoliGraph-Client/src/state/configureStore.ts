import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { createLogger } from 'redux-logger'
import { rootEpic, rootReducer } from './root'

/* Dev purposes: logs action dispatch and store state over time */
const loggerMiddleware = createLogger()

export const epicMiddleware = createEpicMiddleware(rootEpic)

/* pass an initalize store object as 2nd argument to store config */
export function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware, loggerMiddleware)
  )

  return store
}
