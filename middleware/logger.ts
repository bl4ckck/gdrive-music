import { Middleware } from "redux"

const logger: Middleware = api => next => action => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', api.getState())
    console.groupEnd()
    return result
}

export default logger