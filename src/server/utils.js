import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'

const render = (req, routes, store) => {
  // 1. 服务器接收到请求,这时store是空的
  // 2. 服务器端不会执行componentDidMount这个生命周期函数
  // 3. 客户端代码运行, 这个时候store仍然也是空的
  // 4. 客户端执行componentDidMount,列表数据背获取
  // 5. store中的列表数据被更新
  // 6. 客户端渲染出store中list数据对应的列表内容

  // 如果在这里,我能够拿到异步数据,并填充到store之中
  // store里面到底填充什么,我们不知道,我们需要结合用户当前用户请求地址, 和路由,做出判断
  // 如果用户访问 / 路径, 我们就拿Home组件的异步数据
  // 如果用户访问login路径, 我们就拿Login组件的异步数据
  // 根据路由的路径,来往store里面加数据

  // inside a request
  // const promises = []
  // use `some` to imitate `<Switch>` behavior of selecting only
  // the first to match
  // routes.some(route => {
  //   // use `matchPath` here
  //   // matchPath 只能匹配一层路由
  //   const match = matchPath(req.path, route)
  //   if (match) promises.push(route.loadData(match))
  //   return match
  // })
  // console.log('promises: ', promises)

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        <div>
          {/* {routes.map(route => {
            return <Route {...route} />
          })} */}
          {renderRoutes(routes)}
        </div>
      </StaticRouter>
    </Provider>
  )
  return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Cyan</title>
    </head>
    
    <body>
      <div id="root">${content}</div>
      <script>
          // 服务器端注水
          window.context = {
            state: ${JSON.stringify(store.getState())}
          }
      </script>
      <script src="/index.js"></script>
    </body>
    
    </html>`
}

export default render
