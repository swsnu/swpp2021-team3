import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import ReportedLog from "./ReportedLog/ReportedLog";
import ReportingLog from "./ReportingLog/ReportingLog";

import "./My.css";

//TODO: 리포트 없을 때는 디스플레이 하지 않게 변경

class My extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      summonerName: "",
      mannerPoint: 0,
      reportsForUser: [],
      reportsByUser: [],
      getResult: false,
    };
  }

  getMyInfo = async () => {
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";

    axios.get("/api/token/").then();

    console.log("getMyInfo");
    const response = await axios.get("/api/mypage/", {}).then((res) => {
      let userInfo = res.data.user;
      let reportInfo = res.data.reports;
      console.log(res.data);
      this.setState({
        username: userInfo.username,
        email: userInfo.email,
        summonerName: userInfo.summoner_name,
        mannerPoint: userInfo.mannerPoint,
        reportsForUser: reportInfo.reports_for_user,
        reportsByUser: reportInfo.reports_by_user,
        getResult: true,
      });
    });
  };

  onClickReportedLogs = () => {
    this.props.history.push("/myReportedLogs");
  };

  onClickReportingLogs = () => {
    this.props.history.push("/myReportingLogs");
  };

  render() {
    let reportedLogs = [];
    let reportingLogs = [];
    if (this.state.getResult === false) {
      this.getMyInfo();
    } else {
      let idx1 = 0;
      let idx2 = 0;
      reportedLogs = this.state.reportsForUser.map((report) => {
        idx1++;
        return (
          <ReportedLog
            key={idx1}
            userID={report.id}
            userEvaluation={report.userEvaluation}
            tags={report.tags}
            comment={report.comment}
            apology={report.apology}
          />
        );
      });
      reportingLogs = this.state.reportsByUser.map((report) => {
        idx2++;
        return (
          <ReportingLog
            key={idx2}
            userID={report.id}
            reportedSummoner={report.reported_summoner}
            userEvaluation={report.userEvaluation}
            tags={report.tags}
            comment={report.comment}
            apology={report.apology}
          />
        );
      });
    }
    return (
      <div className="myPage">
        <div className="mypageTitle">마이페이지</div>
        {this.state.getResult && (
          <div className="resultDisplay">
            <div className="mypageContent">
              <div style={{ fontWeight: "bold" }}>유저네임</div>
              {this.state.username}
              <br />
              <br />
              <div style={{ fontWeight: "bold" }}>이메일</div>
              {this.state.email}
              <br />
              <br />
              <div style={{ fontWeight: "bold" }}>소환사이름</div>
              {this.state.summonerName}
              <br />
              <br />
              <div style={{ fontWeight: "bold" }}>매너포인트</div>
              {this.state.mannerPoint}
            </div>
            <div style={{ left: "38.5%" }}>
              <div className="recentText1">Recent Reporting Logs</div>
              <div
                className="SeemoreText1"
                onClick={() => this.onClickReportingLogs()}
              >
                더보기
              </div>
              <div className="mypage_box1">{reportingLogs[0]}</div>
              <div className="mypage_box2">
                {reportingLogs.length === 2 && reportingLogs[1]}
              </div>
            </div>
            <div>
              <div className="recentText2">Recent Reported Logs</div>
              <div
                className="SeemoreText2"
                onClick={() => this.onClickReportedLogs()}
              >
                더보기
              </div>
              <div className="mypage_box3">
                {/* <ReportedLog /> */}
                {reportedLogs[0]}
              </div>
              <div className="mypage_box4">
                {/* <ReportedLog /> */}
                {reportedLogs.length === 2 && reportingLogs[1]}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(My);
