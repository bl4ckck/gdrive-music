import { ProviderProps } from 'react-redux'
import { AnyAction, applyMiddleware, compose, createStore, EmptyObject, PreloadedState, Store, StoreEnhancerStoreCreator } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import monitorReducersEnhancer from './enhancers/monitorReducer'
import loggerMiddleware from './middleware/logger'
import rootReducer from './reducers'
import { ActionPlayerType, initialStatePlayer, usePlayerState } from '../types/player'
import { ACTION_TYPES } from '../types/actions'

const configureStore = (): Store<usePlayerState, ACTION_TYPES["type"]> => {
    const middlewares = [loggerMiddleware, thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
    const composedEnhancers = compose<StoreEnhancerStoreCreator<{}, {}>>(...enhancers)

    const store = createStore(rootReducer, composeWithDevTools(composedEnhancers))
    return store
}
export default configureStore
