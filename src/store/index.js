import { createStore, compose, applyMiddleware } from 'redux'
import { fromJS } from 'immutable'
import thunk from 'redux-thunk'
import reducer from './reducer'
import clientAxios from '../client/request'
import serverAxios from '../server/request'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

export const getClientStore = () => {
  // 客户端数据脱水
  const defaultState = fromJS(window.context.state)
  // 改变客户端的store,一定要使用clientAxios
  return createStore(reducer, defaultState, composeEnhancers(applyMiddleware(thunk.withExtraArgument(clientAxios))))
}

export const getStore = (req) => {
  // 改变服务端的store,一定要使用serverAxios
  return createStore(reducer, composeEnhancers(applyMiddleware(thunk.withExtraArgument(serverAxios(req)))))
}
