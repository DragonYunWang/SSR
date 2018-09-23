import { combineReducers } from 'redux-immutable'
import { reducer as headerReducer } from '../components/Header/store'
import { reducer as homeReducer } from '../containers/Home/store'
import { reducer as translationReducer } from '../containers/Translation/store'

const reducer = combineReducers({
  header: headerReducer,
  home: homeReducer,
  translation: translationReducer
})
export default reducer
