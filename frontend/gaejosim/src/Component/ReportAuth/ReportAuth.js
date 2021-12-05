import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
import { connect } from "react-redux";

import "./ReportAuth.css";

class ReportAuth extends Component {
  state = {
    recentPlayers: [],
    getPlayers: false,
    reportedSummoner: "",
    authenticated: false,
  };

  componentDidMount() {
    if (this.props.storedisLogin && this.state.getPlayers === false) {
      this.getPlayersData();
    }
  }

  getPlayersData = async () => {
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";

    axios.get("/api/token/").then();

    const response = await axios
      .get("/api/reports/auth/")
      .then((res) => {
        this.setState({
          recentPlayers: res.data.recent_players,
          getPlayers: true,
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  // postAuthData = async () => {
  //   axios.defaults.xsrfCookieName = "csrftoken";
  //   axios.defaults.xsrfHeaderName = "X-CSRFToken";

  //   axios.get("/api/token/").then();

  //   const response_signin = await axios.post("/api/signin/", {
  //     username: "test1",
  //     password: "password",
  //   });

  //   if (response_signin.status === 200) {
  //     const response = await axios.post("/api/reports/auth/", {
  //       summoner_name: this.state.reportSummoner,
  //     });

  //     if (response.data.authenticated === false)
  //       alert(
  //         "소환사명을 체크해주세요. 현재 기입한 소환사는 최근 5판 게임 내에서 함께한 플레이어가 아닙니다."
  //       );
  //     this.setState({ authenticated: response.data.authenticated });
  //   } else {
  //     alert("로그인 한 유저만 트롤을 리포트 할 수 있습니다.");
  //   }
  // };

  handleReportSummoner = (selected) => {
    this.setState({ reportedSummoner: selected.label, authenticated: true });
  };

  onClickAuthenticateButton = () => {
    this.postAuthData();
  };

  onClickNextButton = () => {
    this.props.history.push(`/ReportAction/${this.state.reportedSummoner}`);
  };

  setValue = (newValue) => {
    this.setState({ reportedSummoner: newValue });
  };

  render() {
    let options = [];
    let redirect = null;

    if (!this.props.storedisLogin) {

      // todo: this.props.history.push makes infinite loop
      // this.props.history.push("/login");

    }
    if (this.props.storedisLogin && this.state.getPlayers) {
      options = this.state.recentPlayers.map((player, index) => ({
        label: player,
        key: index,
      }));
    }

    return (
      <div className="ReportAuth">
        {redirect}
        <div className="LeftBarStyle1">
          <div className="LeftText1">step1</div>
        </div>
        <div className="RightBarStyle1">
          <div className="RightText1">step2</div>
        </div>

        <div className="selectBox">
          <div className="subtitleTextStyle">트롤을 골라주세요</div>
          <Select
            id="reportSummoner"
            placeholder="리포트 대상 플레이어를 선택하세요."
            defaultValue={this.state.reportedSummoner}
            onChange={(selected) => this.handleReportSummoner(selected)}
            options={options}
          />
        </div>
        {/* <Autocomplete
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(event, newValue) => {
                      this.setValue(newValue);
                    }}
                    className = 'reportSummoner'
                    placeholder='리포트 대상 플레이어를 선택하세요.'
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    sx={{ width: 700 }}
                    renderInput={(params) => <TextField {...params} label = "신고할 소환사명을 써주세요." />}
                /> */}

        {!this.state.authenticated && (
          <button
            className="buttonAuthStyle"
            onClick={() => this.onClickAuthenticateButton()}
          >
            인증하기
          </button>
        )}
        {this.state.authenticated && (
          <button className="authStyle">인증됨</button>
        )}
        {this.state.authenticated && (
          <button
            className="buttonStyle"
            onClick={() => this.onClickNextButton()}
          >
            다음
          </button>
        )}
        {!this.state.authenticated && (
          <button
            className="buttonStyle"
            onClick={() => alert("인증해야 다음 단계로 넘어갈 수 있습니다.")}
          >
            다음
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    storedisLogin: state.userR.login,
  };
};

export default connect(mapStateToProps, null)(withRouter(ReportAuth));
