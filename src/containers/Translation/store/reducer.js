import { fromJS } from 'immutable'
import * as types from './actionTypes'

const defaultState = fromJS({
  translationsList: []
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.CHANGE_TRANSLATIONS_LIST:
      return state.set('translationsList', action.list)
    default:
      return state
  }
}
