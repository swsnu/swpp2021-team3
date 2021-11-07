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
                <img className = 'logo-img' alt = 'logo-img' src = '../../../public/images/imagename' />
                <h1 className = 'logo-text'>Gaejosim</h1>
                <button onClick={() => this.onClickLoginButton()}>Login</button>
                <button onClick={() => this.onClickMyPageButton()}>MyPage</button>
            </div>
        )
    }
}

export default Header;