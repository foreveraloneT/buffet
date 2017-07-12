import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import thunk from 'redux-thunk'
import ENV from '../environment'
import rootReducer from '../reducers'

export default () => {
    const middlewares = [thunk, apiMiddleware]
    
    if (ENV === "development")
        middlewares.push(createLogger())

    const store = createStore(
        rootReducer,
        applyMiddleware(...middlewares)
    )
    return store
}