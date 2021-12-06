import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

import DetailReportedLog from "./DetailReportedLog/DetailReportedLog";

import "./MyReportedLogs.css";

class MyReportedLogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      getResult: false,
    };
  }

  getReportedLogs = async () => {
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";

    axios.get("/api/token/").then();


    await axios.get("/api/my/received_reports/", {})
      .then((res) => {
        // let reportInfo = res.data.reports;
        this.setState({
          reportedlogs: res.data.reports,
          getResult: true,
        })
      })
      .catch((error) => {
        alert(error.response.data.error + '\n 로그인 페이지로 이동합니다.')
        this.props.history.push('/login')
      })
  };

  render() {
    let myReportedLogs = [];

    if (this.state.getResult === false) {
      this.getReportedLogs();
    } else {
      myReportedLogs = this.state.reports.map((report, reportIdx) => {
        // let myreportedlogsIdx = "myreportedlogs" + reportIdx;
        return (
          <div className={`myreportedlogs`+reportIdx} key={reportIdx}>
            <DetailReportedLog
              key={reportIdx}
              userID={report.id}
              userEvaluation={report.evaluation}
              tags={report.tag}
              // reportedSummoer={report.reported_summoner}
              comment={report.comment}
              apology={report.apology}
            />
          </div>
        );
      });
    }

    // console.log("test : " + myReportedLogs);

    return (
      <div className="myReportedLogsPage">
        <div className="myReportedLogsTitle">작성된 리포트</div>
        <div style={{ left: "38.5%" }}>
          {this.state.getResult && <div>{myReportedLogs}</div>}
        </div>
      </div>
    );
  }
}

export default withRouter(MyReportedLogs);
