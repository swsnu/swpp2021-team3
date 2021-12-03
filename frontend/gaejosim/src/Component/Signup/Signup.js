import React, { Component } from "react";
// import { connect } from 'react-redux';

import { NavLink, withRouter } from "react-router-dom";
import axios from "axios";

import "./Signup.css";


// TODO: reducer 연결해 로그인시 접근 불가하게 수정
// TODO: 각 필드 값 형식 제한하는 validate 함수 추가하기

class SignUp extends Component {

    state = {
        id : '', 
        email : '', 
        summonerID : '', 
        password : '', 
        passwordConfirm : false,
        agreePolicy : false,
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
        if(!this.state.passwordConfirm) {
            alert('기입한 비밀번호와 비밀번호 체크 영역의 값이 동일하지 않습니다.')
            return
        }
        else if(!this.state.agreePolicy) {
            alert('회원가입을 위해서는 웹 규약 조항에 동의해주셔야 합니다.')
            return
        }
        else {
            console.log('call post call')
            this.postSignUpData()
        }
    }

    postSignUpData = async () => {
        console.log("postSignUpData")

        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';

        axios.get('/api/token/').then()
       
        const response = await axios.post('/api/signup/', {
            "username" : this.state.id,
	        "email" : this.state.email, 
	        "summoner_name" : this.state.summonerID,
	        "password" : this.state.password,
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
                <text className="SignupTitle">회원가입</text>
                <NavLink exact to="/login">
                  <text className="Signup_Login_text">로그인하기</text>
                </NavLink>
                <input
                    className="Signup_inputField1"
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
                    type = 'string'
                    placeholder = '비밀번호'
                    onChange={(event) => this.setState({ password : event.target.value })} />
                <input
                    className = 'Signup_inputField5'
                    type = 'string'
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
 
