import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// TODO: Sprint4에 reducer와 함께 구현 예정
class Header extends Component {
    state = {
        clickLogin : false,
        clickMyPage: false
    }

    onClickLoginButton = () => {
        this.setState({ clickLogin: true });
    }

    onClickMyPageButton = () => {
        this.setState({ clickMyPage: true });
    }

    render() {
        let redirect = null;
        if (this.state.clickLogin) {
            redirect = <Redirect to = '/login' />
        }
        if (this.state.clickMyPage) {
            redirect = <Redirect to = '/my' />
        }
        return (
            <div className='Header'>
                {redirect}
                <img className = 'logo-img' alt = 'logo-img' src = '../../../public/images/logo.png' />
                {/* <h3 className = 'logo-text'>Gaejosim</h3> */}
                <button 
                    style={{
                        position: 'absolute',
                        left: '77.92%',
                        right: '13.75%',
                        top: '5.78%',
                        bottom: '89.96%',
                        background: '#5F2EEA',
                        borderRadius: '40px',
                        color: 'white',
                    }}
                    onClick={() => this.onClickLoginButton()}>
                    Login
                </button>
                <button 
                    style={{
                        position: 'absolute',
                        left: '87.64%',
                        right: '4.03%',
                        top: '5.78%',
                        bottom: '89.96%',
                        background: '#5F2EEA',
                        borderRadius: '40px',
                        color: 'white',
                    }}
                    onClick={() => this.onClickMyPageButton()}>
                    MyPage
                </button>
            </div>
        )
    }
}

export default Header;