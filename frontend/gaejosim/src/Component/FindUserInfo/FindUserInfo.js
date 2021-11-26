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
        idforPW : '',
    }

    onClickFindIDButton = () => {
        if(!this.state.emailForID) {
            alert('이메일을 입력해야합니다.')
            return
        }
        else {
            console.log('아이디찾기 시도')
        }
    }

    onClickFindPWButton = () => {
        if(!(this.state.emailForPW && this.state.idforPW)) {
            alert('이메일과 아이디를 모두 입력해야합니다.')
            return
        }
        else {
            console.log('비밀번호 찾기 시도')
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
                        placeholder = '비밀번호'
                        onChange={(event) => this.setState({ emailForPW : event.target.value })} />
                    <input
                        className = 'inputField'
                        type = 'string'
                        placeholder = '비밀번호'
                        onChange={(event) => this.setState({ idforPW : event.target.value })} />
                    
                    <button className = 'FindIDButton'
                        onClick={() => this.onClickFindPWButton()}>
                        비밀번호 찾기
                    </button>
                </div>
            </div>
        )
    }
}

export default FindUserInfo;