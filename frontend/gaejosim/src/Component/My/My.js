import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import axios from "axios";
import "./My.css";
import Pencil from "../../Assets/Images/icon-pencil.png";
import Paper from "../../Assets/Images/icon-paper.png";
import Delete from "../../Assets/Images/icon-delete.png";

class My extends Component {
  state = {
    ApologyCheck: false,
    ApologyWrite: false,
    ReportedLogs: false,
    ReportingLogs: false,
    // DeleteReport: false,
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
          <br /> XXXXXXXX
          <br />
          <br />
          <text style={{ fontWeight: "bold" }}>이메일</text>
          <br />
          Email@email.com
          <br />
          <br />
          <text style={{ fontWeight: "bold" }}>소환사이름</text>
          <br />
          XXXXXXXX
          <br />
          <br />
          <text style={{ fontWeight: "bold" }}>매너포인트</text> 80%
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
