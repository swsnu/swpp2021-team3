import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import axios from 'axios'

import './Signup.css'

class SignUp extends Component {
    state = {
        id : '', 
        email : '', 
        summonerID : '', 
        password : '', 
        passwordConfirm : false,
        agreePolicy : false,
    }

    // Use email regex from https://www.w3resource.com/javascript/form/email-validation.php
    emailChecker = (email) => {
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(email);
    }

    passwordHandler = (passwordCheck) => {
        if(this.state.password === passwordCheck) this.setState({ passwordConfirm : true})
        else return
    }

    onClickAgreeButton = () => {
        this.setState({ agreePolicy : !this.state.agreePolicy })
    }

    onClickSignUpButton = () => {
        if(!this.state.id || !this.state.email || !this.state.summonerID || !this.state.password) {
            alert('모든 필드의 값들을 다 기입해주셔야 회원가입이 가능합니다.')
            return
        }
        if(!this.emailChecker(this.state.email)){
            alert('이메일 형식이 올바르지 않습니다.')
        }
        else if(!this.state.passwordConfirm) {
            alert('기입한 비밀번호와 비밀번호 체크 영역의 값이 동일하지 않습니다.')
            return
        }
        else if(!this.state.agreePolicy) {
            alert('회원가입을 위해서는 웹 규약 조항에 동의해주셔야 합니다.')
            return
        }
        else {
            this.postSignUpData()
        }
    }

    postSignUpData = async () => {
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.xsrfHeaderName = 'X-CSRFToken'

        axios.get('/api/token/').then()
       
        await axios.post('/api/signup/', {
            'username' : this.state.id,
	        'email' : this.state.email, 
	        'summoner_name' : this.state.summonerID,
	        'password' : this.state.password,
        })
        .then((response) => {
            alert(`${response.data.message}\n로그인 페이지로 이동합니다.`)
            this.props.history.push('/login')
        })
        .catch((error) => {
            alert(error.response.data.error)
        })
    }

    render() {
        return (
            <div className = 'SignUp'>
                <div className = 'SignupTitle'>회원가입</div>
                <NavLink exact to = '/login'>
                  <div className= 'Signup_Login_text'>로그인하기</div>
                </NavLink> 
                <input
                    className = 'Signup_inputField1'
                    type = 'string'
                    placeholder = '아이디'
                    onChange={(event) => this.setState({ id : event.target.value })} />
                <input
                    className = 'Signup_inputField2'
                    type = 'string'
                    placeholder = '이메일'
                    onChange={(event) => this.setState({ email : event.target.value })} />
                <input
                    className = 'Signup_inputField3'
                    type = 'string'
                    placeholder = '소환사 이름'
                    onChange={(event) => this.setState({ summonerID : event.target.value })} />
                <input
                    className = 'Signup_inputField4'
                    type = 'password'
                    placeholder = '비밀번호'
                    onChange={(event) => this.setState({ password : event.target.value })} />
                <input
                    className = 'Signup_inputField5'
                    type = 'password'
                    placeholder = '비밀번호 확인'
                    onChange={(event) => this.passwordHandler(event.target.value)} />
                {(!this.state.agreePolicy) && <button className = 'AgreeButton'
                    onClick={() => this.onClickAgreeButton()}>
                    웹규약조항
                </button>}
                {(this.state.agreePolicy) && <button className = 'AgreeButton'
                    onClick={() => this.onClickAgreeButton()}>
                    웹규약조항 V
                </button>}
                <button className = 'SignUpButton'
                    onClick={() => this.onClickSignUpButton()}>
                    회원가입
                </button>
            </div>
        )
    }
}

export default withRouter(SignUp)
 
