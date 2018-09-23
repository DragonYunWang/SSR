import * as types from './actionTypes'
import { fromJS } from 'immutable'

const changeTranslationsList = list => ({
  type: types.CHANGE_TRANSLATIONS_LIST,
  list: fromJS(list)
})

export const getTranslationsList = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance
      .get('/api/translations.json?secret=D37msjPeC3')
      .then(res => {
        const list = res.data.data
        dispatch(changeTranslationsList(list))
      })
      .catch(err => {
        console.log('err: ', err)
      })
  }
}
