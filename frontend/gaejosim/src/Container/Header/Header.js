import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

import './Header.css';

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
                <img className = 'logoImage' alt = 'logo-img' src = './images/logo.png' />
                <button className='loginButton'
                    onClick={() => this.onClickLoginButton()}>
                    Login
                </button>
                <button className='mypageButton'
                    onClick={() => this.onClickMyPageButton()}>
                    MyPage
                </button>
            </div>
        )
    }
}

export default Header;