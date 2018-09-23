// import React from 'react'
// import { Route } from 'react-router-dom'
import App from './App'
import Home from './containers/Home'
import Translation from './containers/Translation'

// 改写路由,支持服务器端获取数据
// 多级路由支持
export default [
  {
    path: '/',
    component: App,
    loadData: App.loadData,
    routes: [
      {
        path: '/',
        component: Home,
        exact: true,
        loadData: Home.loadData,
        key: 'home'
      },
      {
        path: '/translation',
        component: Translation,
        exact: true,
        loadData: Translation.loadData,
        key: 'translation'
      }
    ]
  }
]

// export default (
//   <div>
//     <Route path="/" exact component={Home} />
//     <Route path="/login" exact component={Login} />
//   </div>
// )
