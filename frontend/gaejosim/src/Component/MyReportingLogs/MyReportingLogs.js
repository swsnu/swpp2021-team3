import React, { Component } from "react";
import axios from "axios";
import "./MyReportingLogs.css";

import { withRouter } from "react-router-dom";

import ReportingLog2 from "./ReportingLog2/ReportingLog2";

class MyReportingLogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      getResult: false,
    };
  }

  getReportingLogs = async () => {
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";

    axios.get("/api/token/").then();

    const response = await axios.get("/api/my/reports/", {}).then((res) => {
      // let userInfo = res.data.user;
      let reportInfo = res.data.reports;
      // console.log("reportInfo:" + reportInfo); // this works
      console.log(res.data); //this works
      this.setState({
        // username: userInfo.username,
        // email: userInfo.email,
        // summonerName: userInfo.summoner_name,
        // mannerPoint: userInfo.mannerPoint,
        // reportsForUser: reportInfo.reports_for_user,
        // reportsByUser: reportInfo.reports_by_user,
        reportinglogs: reportInfo.reports,
        getResult: true,
      });
    });
  };

  render() {
    let myReportingLogs = [];

    if (this.state.getResult === false) {
      this.getReportingLogs();
    } else {
      myReportingLogs = this.state.reports.map((report, reportIdx) => {
        let myreportinglogsIdx = "myreportinglogs" + reportIdx;
        return (
          <div className={myreportinglogsIdx} key={reportIdx}>
            <ReportingLog2
              key={reportIdx}
              userID={report.id}
              userEvaluation={report.evaluation}
              tags={report.tag}
              reportedSummoer={report.reported_summoner}
              comment={report.comment}
              apology={report.apology}
            />
          </div>
        );
      });
    }

    console.log("test : " + myReportingLogs);

    return (
      <div className="myReportingLogsPage">
        <div className="myReportingLogsTitle">작성한 리포트</div>
        <div style={{ left: "38.5%" }}>
          {this.state.getResult && <div>{myReportingLogs}</div>}
        </div>
      </div>
    );
  }
}

export default withRouter(MyReportingLogs);
