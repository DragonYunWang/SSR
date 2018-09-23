import express from 'express'
import proxy from 'express-http-proxy'
import { matchRoutes } from 'react-router-config'
import { getStore } from '../store'
import routes from '../Routes'
import render from './utils'
// 客户端渲染
// React代码在浏览器上执行, 消耗的是用户浏览器的性能

// 服务端渲染
// React代码在服务器上执行, 消耗的是服务器端的性能

const app = express()
app.use(express.static('public'))

// /api/news.json
// req.url = new.json
// proxyReqPathResolver: /ssr/api/news.json
// http://47.95.113.63 + proxyReqPathResolver()
// http://47.95.113.63/ssr/api/news.json
app.use(
  '/api',
  proxy('http://47.95.113.63', {
    proxyReqPathResolver: function(req) {
      return '/ssr/api' + req.url
    }
  })
)

app.get('*', function(req, res) {
  // 创建store
  const store = getStore(req)
  // 多级路由配置
  const matchedRoutes = matchRoutes(routes, req.path)
  const promises = []
  // 让matchRoutes里面的所有的组件,对应的loadData方法执行一次
  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      promises.push(item.route.loadData(store))
    }
  })
  // 当所有的promise执行完毕之后,数据准备好之后,再渲染页面
  Promise.all(promises).then(() => {
    res.send(render(req, routes, store))
  })
})

app.listen(9001, () => console.log('Example app listening on port 9001!'))
