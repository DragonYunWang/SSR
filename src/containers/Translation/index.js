import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { actionCreators } from './store'
// 同构: 一套代码React代码, 在服务器执行一次, 再在客户端执行一次

class Translation extends PureComponent {
  getList() {
    const { list } = this.props
    return list.map(item => {
      return <div key={item.get('id')}>{item.get('title')}</div>
    })
  }
  render() {
    const { login } = this.props
    return login ? <div>{this.getList()}</div> : <Redirect to="/" />
  }
  // 只会在客户端执行,不会在服务端执行
  componentDidMount() {
    if (this.props.list.isEmpty()) {
      this.props.getTranslationsList()
    }
  }
}

Translation.loadData = store => {
  return store.dispatch(actionCreators.getTranslationsList())
}

const mapStateToProps = state => ({
  login: state.getIn(['header', 'login']),
  list: state.getIn(['translation', 'translationsList'])
})

const mapDispatchToProps = dispatch => ({
  getTranslationsList() {
    dispatch(actionCreators.getTranslationsList())
  }
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Translation)
