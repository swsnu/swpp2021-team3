import React, { Component } from "react";
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';

// TODO: axios 해결

class SignUp extends Component {
    state = {
        id : '', 
        email : '', 
        summonerID : '', 
        password : '', 
        passwordConfirm : false,
        agreePolicy : false,
    }

    componentDidMount() {
        
    }

    passwordHandler = (passwordCheck) => {
        if(this.state.password === passwordCheck) this.setState({ passwordConfirm : true})
        else return
    }

    onClickAgreeButton = () => {
        this.setState({ agreePolicy : !this.state.agreePolicy })
    }

    onClickSignUpButton = () => {
        if(!this.state.checkPassword) {
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
       
        const response = await axios.post('/api/signup/', {
            "username" : this.state.id,
	        "email" : this.state.email, 
	        "summoner_name" : this.state.summonerID,
	        "password" : this.state.password,
        })
        
        if(response.status === 201) {
            alert(response.body.message)
            this.props.history.push('/login')
        }
        else if(response.status === 400) {
            console.log(response.body)
            alert(response.body.error)
        }
    }


    render() {
        return (
            <div className = 'SignUp'>
                <NavLink exact to = '/login'>로그인으로</NavLink>
                <input
                    className = 'inputField'
                    type = 'string'
                    placeholder = '아이디'
                    onChange={(event) => this.setState({ id : event.target.value })} />
                <input
                    className = 'inputField'
                    type = 'string'
                    placeholder = '이메일'
                    onChange={(event) => this.setState({ email : event.target.value })} />
                <input
                    className = 'inputField'
                    type = 'string'
                    placeholder = '소환사 이름'
                    onChange={(event) => this.setState({ summonerID : event.target.value })} />
                <input
                    className = 'inputField'
                    type = 'string'
                    placeholder = '비밀번호'
                    onChange={(event) => this.setState({ password : event.target.value })} />
                <input
                    className = 'inputField'
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

export default SignUp;