import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./My.css";
import Pencil from "../../Assets/Images/icon-pencil.png";
import Paper from "../../Assets/Images/icon-paper.png";
import Delete from "../../Assets/Images/icon-delete.png";

//TODO: mypage + apology backend 구현되면 + 서버 돌아가는 것 확인하면 확실하게 개발하기

class My extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // user model
      username: props.username,
      email: props.email,
      summoner_name: props.summoner_name,
      manner_point: props.manner_point,

      reports: [],

      getMyPageDataBoolean: false,

      // button routers
      ApologyCheck: false,
      ApologyWrite: false,
      ReportedLogs: false,
      ReportingLogs: false,
      // DeleteReport: false,
    };
  }

  // state = {
  //   ApologyCheck: false,
  //   ApologyWrite: false,
  //   ReportedLogs: false,
  //   ReportingLogs: false,
  //   // DeleteReport: false,
  // };

  getMyPageData = async () => {
    console.log("call of getMyPageData");
    console.log("state of getMyPageData: " + this.state.getMyPageDataBoolean);

    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";

    console.log(this.state.username);
    console.log(this.state.email);
    console.log(this.state.summoner_name);
    console.log(this.state.manner_point);

    axios.get("/api/token/").then();

    const url = `http://localhost:3000/api/me/mypage`;
    console.log("call get request");

    const response = await axios.get(url, {
      params: {
        username: this.state.username,
        email: this.state.email,
        summoner_name: this.state.summoner_name,
        manner_point: this.state.manner_point,
      },
    });

    this.setState({
      reports: response.data.reports,
      getMyPageDataBoolean: true,
    });
  };

  onClickApologyCheck = () => {
    this.setState({ ApologyCheck: true });
  };

  onClickApologyWrite = () => {
    this.setState({ ApologyWrite: true });
  };

  onClickReportedLogs = () => {
    this.setState({ ReportedLogs: true });
  };

  onClickReportingLogs = () => {
    this.setState({ ReportingLogs: true });
  };

  // onClickDeleteReport = () => {
  //   this.setState({ DeleteReport: true });
  // };

  render() {
    let redirect = null;

    if (this.state.ApologyCheck === true) {
      redirect = <Redirect to={`/myApologyCheck`} />;
    }

    if (this.state.ApologyWrite === true) {
      redirect = <Redirect to={`/myApologyWrite`} />;
    }

    if (this.state.ReportedLogs === true) {
      redirect = <Redirect to={`/myReportedLogs`} />;
    }

    if (this.state.ReportingLogs === true) {
      redirect = <Redirect to={`/myReportingLogs`} />;
    }

    return (
      <div className="myPage">
        {redirect}
        <text className="mypageTitle">마이페이지</text>
        <text className="mypageContent">
          <text style={{ fontWeight: "bold" }}>유저네임</text>
          <br /> XXXXXXXX {this.state.username}
          <br />
          <br />
          <text style={{ fontWeight: "bold" }}>이메일</text>
          <br />
          Email@email.com {this.state.email}
          <br />
          <br />
          <text style={{ fontWeight: "bold" }}>소환사이름</text>
          <br />
          XXXXXXXX {this.state.summoner_name}
          <br />
          <br />
          <text style={{ fontWeight: "bold" }}>매너포인트</text> 80%{" "}
          {this.state.manner_point}
          <div className="mpGraphPercent" />
          <div className="mpGraphAll" />
        </text>
        <div style={{ left: "38.5%" }}>
          <text className="recentText1">Recent Reporting Logs</text>
          <text
            className="seemoreText1"
            onClick={() => this.onClickReportingLogs()}
          >
            더보기
          </text>
          <div className="mypage_box1">
            <text className="boxText1">
              Recent Reporting Log1 : ReportedSummoner
            </text>
            <text className="boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
            <img
              className="Paper"
              src={Paper}
              alt={Paper}
              onClick={() => this.onClickApologyCheck()}
            />
            <img
              className="Delete"
              src={Delete}
              alt={Delete}
              onClick={() => alert("해당하는 리포트가 삭제되었습니다")}
            />
          </div>
          <div className="mypage_box2">
            <text className="boxText1">
              Recent Reporting Log1 : ReportedSummoner
            </text>
            <text className="boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
            <img
              className="Paper"
              src={Paper}
              alt={Paper}
              onClick={() => this.onClickApologyCheck()}
            />
            <img
              className="Delete"
              src={Delete}
              alt={Delete}
              onClick={() => alert("해당하는 리포트가 삭제되었습니다")}
            />
          </div>
        </div>
        <div>
          <text className="recentText2">Recent Reported Logs</text>
          <text
            className="seemoreText2"
            onClick={() => this.onClickReportedLogs()}
          >
            더보기
          </text>
          <div className="mypage_box3">
            <text className="boxText1">
              Recent Reported Log1 : ReportedSummoner
            </text>
            <text className="boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
            <img
              className="Pencil"
              src={Pencil}
              alt={Pencil}
              onClick={() => this.onClickApologyWrite()}
            />
          </div>
          <div className="mypage_box4">
            <text className="boxText1">
              Recent Reported Log1 : ReportedSummoner
            </text>
            <text className="boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
            <img
              className="Pencil"
              src={Pencil}
              alt={Pencil}
              onClick={() => this.onClickApologyWrite()}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default My;
