import { ProviderProps } from 'react-redux'
import { AnyAction, applyMiddleware, compose, createStore, EmptyObject, PreloadedState, Store, StoreEnhancerStoreCreator } from 'redux'
import thunkMiddleware from 'redux-thunk'

import monitorReducersEnhancer from './enhancers/monitorReducer'
import loggerMiddleware from './middleware/logger'
import rootReducer from './reducers'
import { initialStatePlayer, usePlayerState } from './types/player'

const configureStore = (): Store<usePlayerState, AnyAction> => {
    const middlewares = [loggerMiddleware, thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
    const composedEnhancers = compose <StoreEnhancerStoreCreator<{}, {}>>(...enhancers)

    const store = createStore(rootReducer, initialStatePlayer, composedEnhancers)

    return store
}
export default configureStore
