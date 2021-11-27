import React, { Component } from "react";
// import { connect } from 'react-redux';
import { NavLink, withRouter } from "react-router-dom";
import axios from "axios";

import "./Login.css";

// TODO: login 유저 스토어에 저장하기

class Login extends Component {
  state = {
    id: "",
    password: "",
  };

  postLoginData = async () => {
    console.log("postSignUpData");

    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";

    axios.get("/api/token/").then();

    const response = await axios
      .post("/api/signin/", {
        username: this.state.id,
        password: this.state.password,
      })
      .then((response) => {
        console.log("로그인 완료");
        this.props.history.push("/search");
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };

  onClickLoginButton = () => {
    if (!this.state.id) {
      alert("아이디를 입력해야합니다.");
      return;
    } else if (!this.state.password) {
      alert("패스워드를 입력해야합니다.");
      return;
    } else {
      this.postLoginData();
    }
  };

  render() {
    return (
      <div className="Login">
        <text className="LoginTitle">로그인</text>
        <NavLink exact to="/signup">
          <text className="Login_Signup_text">회원가입</text>
        </NavLink>
        <NavLink exact to="/finduserinfo">
          <text className="Login_Finduserinfo_text">아이디 비밀번호 찾기</text>
        </NavLink>
        <NavLink exact to="/changepassword">
          <text className="Login_Changepassword_text">비밀번호 변경</text>
        </NavLink>

        <input
          className="Login_inputField1"
          type="string"
          placeholder="아이디"
          onChange={(event) => this.setState({ id: event.target.value })}
        />
        <input
          className="Login_inputField2"
          type="string"
          placeholder="비밀번호"
          onChange={(event) => this.setState({ password: event.target.value })}
        />
        <button
          className="LoginButton"
          onClick={() => this.onClickLoginButton()}
        >
          로그인
        </button>
      </div>
    );
  }
}

export default withRouter(Login);
