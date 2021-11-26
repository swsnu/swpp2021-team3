import React, { Component } from "react";
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom'
import axios from 'axios';

// TODO: axios 연결

class ChangePassword extends Component {
    state = {
        prevPW : '',
        newPW : '', 
        newPWConfirm : '',
    }

    onClickChangePWButton = () => {
        if(!(this.state.newPW  === this.state.newPWConfirm)) {
            alert('신규로 입력한 비밀번호가 같지 않습니다.')
            return
        }
        else {
            console.log('비밀번호 변경')
        }
    }

    render() {
        return (
            <div className = 'ChangePW'> 
                <input
                    className = 'inputField'
                    type = 'string'
                    placeholder = '기존 비밀번호'
                    onChange={(event) => this.setState({ prevPW : event.target.value })} />
                <input
                    className = 'inputField'
                    type = 'string'
                    placeholder = '신규 비밀번호'
                    onChange={(event) => this.setState({ newPW : event.target.value })} />
                <input
                    className = 'inputField'
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

export default ChangePassword;