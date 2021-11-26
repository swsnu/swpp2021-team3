import React, { Component } from "react";
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom'
import axios from 'axios';

import * as actionTypes from '../../Store/Actions/ActionTypes';


// TODO: login 유저 스토어에 저장하기

class Login extends Component {
    state = {
        id : '',  
        password : '', 
    }

    postLoginData = async () => {
        console.log("postSignUpData")

        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';

        axios.get('/api/token/').then()

        const response = await axios.post('/api/signin/', {
            "username" : this.state.id,
	        "password" : this.state.password,
        })
        .then((response) => {
            console.log("로그인 완료")
            this.props.onStoreLogin()
            this.props.history.push('/search')
        })
        .catch((error) => {
            alert(error.response.data.error)
        })
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
            this.postLoginData()
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

const mapDispatchToProps = dispatch => {
    return {
        onStoreLogin: () => dispatch({ type : actionTypes.SIGNIN_USER })
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Login))