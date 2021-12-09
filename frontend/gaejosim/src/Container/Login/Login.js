import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import axios from 'axios'
import * as actionTypes from '../../Store/Actions/ActionTypes'
import { connect } from 'react-redux'

import './Login.css'

class Login extends Component {
  state = {
    id: '',
    password: '',
  }

  postLoginData = async () => {
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'

    axios.get('/api/token/').then();

    await axios.post('/api/signin/', {
        username: this.state.id,
        password: this.state.password,
    })
      .then(() => {
        this.props.onStoreLogin()
        alert('성공적으로 로그인하였습니다.\n검색페이지로 이동합니다.')
        this.props.history.push('/search')
      })
      .catch((error) => {
        alert(error.response.data.error)
      })
  }

  onClickLoginButton = () => {
    if (!this.state.id) {
      alert('아이디를 입력해야합니다.')
      return;
    } else if (!this.state.password) {
      alert('패스워드를 입력해야합니다.')
      return;
    } else {
      this.postLoginData()
    }
  }

  render() {
    return (
      <div className='Login'>
        <div className='LoginTitle'>로그인</div>
        <NavLink exact to='/signup'>
          <div className='Login_Signup_text'>회원가입</div>
        </NavLink>
        <NavLink exact to='/finduserinfo'>
          <div className='Login_Finduserinfo_text'>아이디 비밀번호 찾기</div>
        </NavLink>

        <input
          className = 'Login_inputField1'
          type = 'string'
          placeholder = '아이디'
          style={{fontSize: '11px'}}
          onChange = {(event) => this.setState({ id: event.target.value })}
        />
        <input
          className = 'Login_inputField2'
          type = 'password'
          placeholder = '비밀번호'
          style={{fontSize: '11px'}}
          onChange = {(event) => this.setState({ password: event.target.value })}
        />
        <button
          className = 'LoginButton'
          onClick = {() => this.onClickLoginButton()}
        >
          로그인
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onStoreLogin: () => dispatch({ type: actionTypes.SIGNIN_USER }),
  }
}

const mapStateToProps = (state) => {
  return {
    storedisLogin: state.userR.login,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
