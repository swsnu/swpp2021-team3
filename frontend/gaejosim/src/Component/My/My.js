import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import ReportedLog from "./ReportedLog/ReportedLog";
import ReportingLog from "./ReportingLog/ReportingLog";

import "./My.css";

// TODO: change password, change username 추가하기

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
    await axios.get("/api/mypage/", {}).then((res) => {
      let userInfo = res.data.user;
      let reportInfo = res.data.reports;
      // console.log(res.data);
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
      // let idx1 = 0;
      reportedLogs = this.state.reportsForUser.map((report, reportIdx) => {
        // idx1++;
        let reportedLogsIdx = "reportedLogs" + reportIdx;
        return (
          <div className={reportedLogsIdx} key={reportIdx}>
            <ReportedLog
              // key={idx1}
              key={reportIdx}
              userID={report.id}
              userEvaluation={report.evaluation}
              tags={report.tag}
              comment={report.comment}
              apology={report.apology}
            />
          </div>
        );
      });
      // console.log(reportedLogs); // this works
      reportingLogs = this.state.reportsByUser.map((report, reportIdx) => {
        let reportingLogsIdx = "reportingLogs" + reportIdx;
        return (
          <div className={reportingLogsIdx} key={reportIdx}>
            <ReportingLog
              key={reportIdx}
              userID={report.id}
              reportedSummoner={report.reported_summoner}
              userEvaluation={report.evaluation}
              tags={report.tag}
              comment={report.comment}
              apology={report.apology}
            />
          </div>
        );
      });
      // console.log(reportingLogs); // this works
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
              <div>{reportingLogs}</div>
            </div>
            <div>
              <div className="recentText2">Recent Reported Logs</div>
              <div
                className="SeemoreText2"
                onClick={() => this.onClickReportedLogs()}
              >
                더보기
              </div>
              <div>{reportedLogs}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(My);
