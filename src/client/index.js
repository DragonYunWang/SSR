import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from '../Routes'
import { Provider } from 'react-redux'
import { getClientStore } from '../store'

const store = getClientStore()

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          {/* {Routes.map(route => {
            return <Route {...route} />
          })} */}
          {renderRoutes(routes)}
        </div>
      </BrowserRouter>
    </Provider>
  )
}

ReactDom.hydrate(<App />, document.getElementById('root'))
