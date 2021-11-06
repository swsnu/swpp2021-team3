import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// TODO: Sprint4에 reducer와 함께 구현 예정
class Header extends Component {
    state = {
        clickLogin : false,
        clickMyPage: false
    }

    postLoginHandler = () => {
        this.setState({ clickLogin: true });
    }

    postMyPageHandler = () => {
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
                <h1>Gaejosim</h1>
                <button onClick={() => this.postLoginHandler()}>Login</button>
                {/* <button onClick={() => this.postMyPageHandler()}>MyPage</button> */}
            </div>
        )
    }
}

export default Header;