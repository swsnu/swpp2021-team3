import React, { Component } from "react";
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom'
import axios from 'axios';

// TODO: axios 해결

class FindUserInfo extends Component {
    state = {
        emailForID : '',  
        emailForPW : '', 
        IDforPW : '',
    }

    postFindIDData = async () => {
        console.log("postFindIDData")

        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';

        axios.get('/api/token/').then()
       
        const response = await axios.post('/api/forgot/id/', {
            "email" : this.state.emailForID
        })
        .then((response) => {
            alert(response.data.message)
            this.props.history.push('/login')
        })
        .catch((error) => {
            alert(error.response.data.error)
        })
    }

    postFindPWData = async () => {
        console.log("postSignUpData")

        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';

        axios.get('/api/token/').then()
       
        const response = await axios.post('/api/forgot/password/', {
            "email" : this.state.emailForPW,
            "username" : this.state.IDforPW,
        })
        .then((response) => {
            alert(response.data.message)
            this.props.history.push('/login')
        })
        .catch((error) => {
            alert(error.response.data.error)
        })
    }

    

    onClickFindIDButton = () => {
        if(!this.state.emailForID) {
            alert('이메일을 입력해야합니다.')
            return
        }
        else {
            console.log('아이디찾기 시도')
            this.postFindIDData()
        }
    }

    onClickFindPWButton = () => {
        if(!this.state.emailForPW || !this.state.IDforPW) {
            alert('이메일과 아이디를 모두 입력해야합니다.')
            return
        }
        else {
            console.log('비밀번호 찾기 시도')
            this.postFindPWData()
        }
    }

    render() {
        return (
            <div className = 'Login'>
                <NavLink exact to = '/signup'>회원가입</NavLink>
                <NavLink exact to = '/finduserinfo'>아이디 비밀번호 찾기</NavLink>
                <NavLink exact to = '/changepassword'>비밀번호 변경</NavLink>
                <div className = 'FindID'>
                    <label>아이디 찾기</label>
                    <input
                        className = 'inputField'
                        type = 'string'
                        placeholder = '이메일'
                        onChange={(event) => this.setState({ emailForID : event.target.value })} />
                    <button className = 'FindIDButton'
                    onClick={() => this.onClickFindIDButton()}>
                    아이디 찾기
                    </button>
                </div>
                <div className = 'FindPW'>
                    <label>비밀번호 찾기</label>
                    <input
                        className = 'inputField'
                        type = 'string'
                        placeholder = '이메일'
                        onChange={(event) => this.setState({ emailForPW : event.target.value })} />
                    <input
                        className = 'inputField'
                        type = 'string'
                        placeholder = '아이디'
                        onChange={(event) => this.setState({ IDforPW : event.target.value })} />
                    <button className = 'FindIDButton'
                        onClick={() => this.onClickFindPWButton()}>
                        비밀번호 찾기
                    </button>
                </div>
            </div>
        )
    }
}

export default withRouter(FindUserInfo)