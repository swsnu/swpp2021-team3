import React, { Component } from "react";
// import { connect } from 'react-redux';

import { NavLink, withRouter } from "react-router-dom";
import axios from "axios";

import "./ChangePassword.css";

// TODO: post 요청을 put으로 back에서 바꾸면 axios 코드 변경

class ChangePassword extends Component {
    state = {
        oldPW : '',
        newPW : '', 
        newPWConfirm : '',
    }

    putChangePWData = async () => {
        // console.log("postchangePWData")

        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';

        axios.get('/api/token/').then()
       
        await axios.post('/api/change/password/', {
            "old_password" : this.state.oldPW,
            "new_password" : this.state.newPW,
            "password_confirm" : this.state.newPWConfirm,
        })
        .then((response) => {
            alert(response.data.message)
            this.props.history.push('/login')
        })
        .catch((error) => {
            alert(error.response.data.error)
            if(error.response.status === 401) this.props.history.push('/login')
        })
    }

    // TODO: password confirm을 back에서 수행하므로 해당 if 문 삭제 필요?
    onClickChangePWButton = () => {
        if(!this.state.oldPW || !this.state.newPW || !this.state.newPWConfirm){
            alert('모든 필드 값을 다 입력해주셔야 비밀번호를 변경할 수 있습니다.')
            return
        }
        else {
            this.putChangePWData()
        }
    }

    render() {
        return (
            <div className = 'ChangePW'> 
                <text className="ChangePWTitle">비밀번호 변경</text>
                <NavLink exact to = '/login'>
                  <div className="ChangePW_Login_text">로그인</div>
                </NavLink>
                <NavLink exact to = '/finduserinfo'>
                   <div className="ChangePW_Finduserinfo_text">
                    아이디 비밀번호 찾기
                   </div>
                </NavLink>
                <input
                    className="ChangePW_inputField1"
                    type = 'string'
                    placeholder = '기존 비밀번호'
                    onChange={(event) => this.setState({ oldPW : event.target.value })} />
                <input
                    className="ChangePW_inputField2"
                    type = 'string'
                    placeholder = '신규 비밀번호'
                    onChange={(event) => this.setState({ newPW : event.target.value })} />
                <input
                    className="ChangePW_inputField3"
                    type = 'string'
                    placeholder = '신규 비밀번호 확인'
                    onChange={(event) => this.setState({ newPWConfirm : event.target.value })} />
                <button className = 'ChangePWButton'
                onClick={() => this.onClickChangePWButton()}>
                비밀번호 변경하기
                </button>
            </div>
        )
    }
}

export default withRouter(ChangePassword)