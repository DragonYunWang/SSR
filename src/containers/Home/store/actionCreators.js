import { fromJS } from 'immutable'
import * as types from './actionTypes'

const changeHomeList = list => ({
  type: types.CHANGE_HOME_LIST,
  list: fromJS(list)
})
export const getHomeList = server => {
  // http://47.95.113.63/ssr/api/news.json?secret=D37msjPeC3
  // 浏览器运行
  // /api/news.json = http://localhost:9001/api/news.json
  // 服务器运行
  // /api/new.json = 服务器根目录下/api/news.json
  let url = '/api/news.json?secret=D37msjPeC3'
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance
      .get(url)
      .then(res => {
        const result = res.data.data
        dispatch(changeHomeList(result))
      })
      .catch(err => {
        console.log('err: ', err)
      })
  }
}
