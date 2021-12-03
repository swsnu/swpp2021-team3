import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux';

import * as actionTypes from '../../Store/Actions/ActionTypes';

import "./Header.css";

// TODO: login 상태일 때는 로그아웃 버튼으로 디스플레이, 아니면 login 버튼으로 디스플레이.
// TODO: css에 로그아웃 버튼 추가하기

class Header extends Component {
  state = {
    clickLogin: false,
    clickLogout: false,
    clickMyPage: false,
  };

  postLogoutData = async () => {
    console.log("postSignUpData")

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    axios.get('/api/token/').then()

    const response = await axios.post('/api/signin/', {
        "username" : this.state.id,
      "password" : this.state.password,
    })
    .then((response) => {
        console.log("로그인 완료")
        this.props.onStoreLogin()
        this.props.history.push('/search')
    })
    .catch((error) => {
        alert(error.response.data.error)
    })
  }

  onClickLogoutButton = () => {
    this.setState({ clickLogout: true });
  };

  onClickLoginButton = () => {
    this.setState({ clickLogin: true });
  };

  onClickMyPageButton = () => {
    this.setState({ clickMyPage: true });
  };

  render() {
    let redirect = null;
    if (this.state.clickLogin) {
      redirect = <Redirect to="/login" />;
    }
    if (this.state.clickMyPage) {
      redirect = <Redirect to="/my" />;
    }
    if(this.state.clickLogout) {
      redirect = <Redirect to="/search" />;
    }
    return (
      <div className="Header">
        {redirect}
        {!this.props.storedisLogin && <button
          className="loginButton"
          onClick={() => this.onClickLoginButton()}
        >
          로그인
        </button>}
        {this.props.storedisLogin && <button
          className="loginButton"
          onClick={() => this.onClickLogoutButton()}
        >
          로그아웃
        </button>}
        {this.props.storedisLogin && <button
          className="mypageButton"
          onClick={() => this.onClickMyPageButton()}
        >
          마이페이지
        </button>}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onStoreLogout: () => dispatch({ type : actionTypes.SIGNOUT_USER }),
  }
}

const mapStateToProps = state => {
  return {
      storedisLogin : state.userR.login,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
