import React from 'react'
import { renderRoutes } from 'react-router-config'
import Header from './components/Header/'
import { actionCreators } from './components/Header/store/'
// 同构: 一套代码React代码, 在服务器执行一次, 再在客户端执行一次

const App = props => {
  // 一级路由路由渲染之后,会把参数传给App组件
  return (
    <div>
      <Header />
      {/* 用于显示二级路由的内容 */}
      {renderRoutes(props.route.routes)}
    </div>
  )
}
App.loadData = store => {
  return store.dispatch(actionCreators.getHomeInfo())
}

export default App
