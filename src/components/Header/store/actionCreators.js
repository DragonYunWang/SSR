import * as types from './actionTypes'

const changeHomeInfo = isTrue => ({
  type: types.CHANGE_HOME_INFO,
  login: isTrue
})

export const getHomeInfo = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance
      .get('/api/isLogin.json?secret=D37msjPeC3')
      .then(res => {
        dispatch(changeHomeInfo(res.data.data.login))
      })
      .catch(err => {
        console.log('err: ', err)
      })
  }
}

export const login = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance
      .get('/api/login.json?secret=D37msjPeC3')
      .then(res => {
        dispatch(changeHomeInfo(true))
      })
      .catch(err => {
        console.log('err: ', err)
      })
  } 
}

export const logout = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance
      .get('/api/logout.json?secret=D37msjPeC3')
      .then(res => {
        dispatch(changeHomeInfo(false))
      })
      .catch(err => {
        console.log('err: ', err)
      })
  } 
}
