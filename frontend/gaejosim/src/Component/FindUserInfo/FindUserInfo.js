import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import axios from 'axios'
// import { connect } from 'react-redux'


class FindUserInfo extends Component {
  
  state = {
    emailForID: '',
    emailForPW: '',
    IDforPW: '',
  }

  // Use email regex from https://www.w3resource.com/javascript/form/email-validation.php
  emailChecker = (email) => {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  }

  postFindIDData = async () => {
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'

    axios.get('/api/token/').then()

    await axios.post('/api/forgot/id/', {
        email: this.state.emailForID,
    })
      .then((response) => {
        alert(response.data.message)
      })
      .catch((error) => {
        alert(error.response.data.error)
      })
  }

  postFindPWData = async () => {

    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'

    axios.get('/api/token/').then()

    await axios.post('/api/forgot/password/', {
        email: this.state.emailForPW,
        username: this.state.IDforPW,
    })
      .then((response) => {
        alert(response.data.message)
      })
      .catch((error) => {
        alert(error.response.data.error)
      })
  }

  onClickFindIDButton = () => {
    if (!this.state.emailForID) {
      alert('아이디를 찾기 위해서는 이메일을 입력해야합니다.')
    } else if(!this.emailChecker) {
      alert('아이디를 찾기 위해서는 올바른 형식의 이메일을 입력해야합니다.')
    } else {
      this.postFindIDData()
    }
  }

  onClickFindPWButton = () => {
    if (!this.state.emailForPW || !this.state.IDforPW) {
      alert('비밀번호를 찾기 위해서는 이메일과 아이디를 모두 입력해야합니다.')
    } else if(!this.emailChecker) {
      alert('비밀번호를 찾기 위해서는 올바른 형식의 이메일을 입력해야합니다.')
    } else {
      this.postFindPWData()
    }
  }

  render() {
    return (
      <div className = 'Login'>
        <NavLink exact to = '/signup'>
          회원가입하기
        </NavLink>
        <NavLink exact to = '/login'>
          로그인하기
        </NavLink>
        <NavLink exact to = '/changepassword'>
          비밀번호 변경하기
        </NavLink>
        <div className = 'FindID'>
          <label className = 'FindIDTitle'>아이디 찾기</label>
          <input
            className = 'FindID_inputField'
            type = 'string'
            placeholder = '이메일'
            onChange = {(event) => this.setState({ emailForID: event.target.value })}
          />
          <button
            className = 'FindIDButton'
            onClick = {() => this.onClickFindIDButton()}
          >
            아이디 찾기
          </button>
        </div>
        <div className = 'FindPW'>
          <label className = 'FindPWTitle'>비밀번호 찾기</label>
          <input
            className = 'FindPW_inputField1'
            type = 'string'
            placeholder = '이메일'
            onChange = {(event) => this.setState({ emailForPW: event.target.value })}
          />
          <input
            className = 'FindPW_inputField2'
            type = 'string'
            placeholder = '아이디'
            onChange = {(event) => this.setState({ IDforPW: event.target.value })}
          />
          <button
            className = 'FindPWButton'
            onClick = {() => this.onClickFindPWButton()}
          >
            비밀번호 찾기
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(FindUserInfo)
