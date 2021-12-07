import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import * as actionTypes from '../../Store/Actions/ActionTypes'
import { connect } from 'react-redux'

import Logo from './../../Assets/Images/GAEJOSIM.png'

import './Header.css'


class Header extends Component {

  postLogoutData = async () => {
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'

    axios.get('/api/token/').then()

    await axios.post('/api/logout/', {})
      .then(() => {
          this.props.onStoreLogout()
          alert('성공적으로 로그아웃 되었습니다.\n검색페이지로 이동합니다.')
          this.props.history.push('/search')
      })
      .catch((error) => {
          alert(error.response.data.error)
      })
  }

  onClickLogoutButton = () => {
    this.postLogoutData()
  }

  onClickLoginButton = () => {
    this.props.history.push('/login')
  }

  onClickMyPageButton = () => {
    this.props.history.push('/my')
  }

  onClickSearchPageButton = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <div className='Header'>
        <div className = 'mainpageButton' onClick = {() => this.onClickSearchPageButton()}>
          <img className="GotoSearchPageLogo" alt="GAEJOSIM" src={Logo} />
        </div>
        {!this.props.storedisLogin && <button
          className = 'loginButton'
          onClick = {() => this.onClickLoginButton()}
        >
          로그인
        </button>}
        {this.props.storedisLogin && <button
          className = 'loginButton'
          onClick = {() => this.onClickLogoutButton()}
        >
          로그아웃
        </button>}
        {this.props.storedisLogin && <button
          className = 'mypageButton'
          onClick = {() => this.onClickMyPageButton()}
        >
          마이페이지
        </button>}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onStoreLogout: () => dispatch({ type : actionTypes.SIGNOUT_USER }),
  }
}

const mapStateToProps = state => {
  return {
      storedisLogin : state.userR.login,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
