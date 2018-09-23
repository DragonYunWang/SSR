import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'
// 同构: 一套代码React代码, 在服务器执行一次, 再在客户端执行一次

class Home extends PureComponent {
  getList() {
    const { list } = this.props
    return list.map(item => {
      return <div key={item.get('id')}>{item.get('title')}</div>
    })
  }
  render() {
    const { name } = this.props
    return (
      <div>
        <div>react server {name}</div>
        {this.getList()}
        <button
          onClick={() => {
            alert('React server')
          }}
        >
          click
        </button>
      </div>
    )
  }
  // 只会在客户端执行,不会在服务端执行
  componentDidMount() {
    if (this.props.list.isEmpty()) {
      this.props.getHomeList()
    }
  }
}

Home.loadData = store => {
  return store.dispatch(actionCreators.getHomeList())
}

const mapStateToProps = state => ({
  name: state.getIn(['home', 'name']),
  list: state.getIn(['home', 'newList'])
})

const mapDispatchToProps = dispatch => ({
  getHomeList() {
    dispatch(actionCreators.getHomeList())
  }
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
