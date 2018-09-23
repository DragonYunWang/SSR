import React, { PureComponent, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { actionCreators } from './store/'

class Header extends PureComponent {
  render() {
    const { login, handleLogin, handleLogout } = this.props
    return (
      <div>
        <Link to="/" style={{ fontSize: '32px' }}>
          Home
        </Link>
        <br />
        {login ? (
          <Fragment>
            <div to="/login" style={{ fontSize: '32px' }} onClick={handleLogout}>
              Logut
            </div>
            <br />
            <Link to="/translation" style={{ fontSize: '32px' }}>
              Translation
            </Link>
          </Fragment>
        ) : (
          <div to="/login" style={{ fontSize: '32px' }} onClick={handleLogin}>
            Login
          </div>
        )}

        <br />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  login: state.getIn(['header', 'login'])
})

const mapDispatchToProps = dispatch => ({
  handleLogin() {
    dispatch(actionCreators.login())
  },
  handleLogout() {
    dispatch(actionCreators.logout())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
