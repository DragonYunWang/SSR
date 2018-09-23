import { fromJS } from 'immutable'
import * as types from './actionTypes'

const defaultState = fromJS({
  name: 'cyan',
  newList: []
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.CHANGE_HOME_LIST:
      return state.set('newList', action.list)
    default:
      return state
  }
}
