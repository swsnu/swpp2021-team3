import React, { Component } from "react";
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom'
import axios from 'axios';

// TODO: axios 해결

class Login extends Component {
    state = {
        id : '',  
        password : '', 
    }

    onClickLoginButton = () => {
        if(!this.state.id) {
            alert('아이디를 입력해야합니다.')
            return
        }
        else if(!this.state.password) {
            alert('패스워드를 입력해야합니다.')
            return
        }
        else {
            console.log('로그인 시도')
        }
    }

    render() {
        return (
            <div className = 'Login'>
                <NavLink exact to = '/signup'>회원가입</NavLink>
                <NavLink exact to = '/finduserinfo'>아이디 비밀번호 찾기</NavLink>
                <NavLink exact to = '/changepassword'>비밀번호 변경</NavLink>
                <input
                    className = 'inputField'
                    type = 'string'
                    placeholder = '아이디'
                    onChange={(event) => this.setState({ id : event.target.value })} />
                <input
                    className = 'inputField'
                    type = 'string'
                    placeholder = '비밀번호'
                    onChange={(event) => this.setState({ password : event.target.value })} />
                <button className = 'LoginButton'
                    onClick={() => this.onClickLoginButton()}>
                    로그인
                </button>
            </div>
        )
    }
}

export default Login;