import React, { Component } from "react";
import axios from "axios";
import "./MyReportedLogs.css";

import ReportedLog2 from "./ReportedLog2/ReportedLog2";

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

    console.log("getReportedLogs");
    const response = await axios
      .get("/api/my/received_reports/", {})
      .then((res) => {
        // let userInfo = res.data.user;
        let reportInfo = res.data.reports;
        console.log(res.data);
        this.setState({
          // username: userInfo.username,
          // email: userInfo.email,
          // summonerName: userInfo.summoner_name,
          // mannerPoint: userInfo.mannerPoint,
          // reportsForUser: reportInfo.reports_for_user,
          // reportsByUser: reportInfo.reports_by_user,
          reports: reportInfo.reports,
          getResult: true,
        });
      });
  };

  render() {
    let reports = [];

    if (this.state.getREsult === false) {
      this.getReportedLogs();
    } else {
      let idx = 0;
      reports = this.state.reports.map((report) => {
        idx++;
        return (
          <ReportedLog2
            key={idx}
            userID={report.id}
            userEvaluation={report.userEvaluation}
            tags={report.tags}
            comment={report.comment}
            apology={report.apology}
          />
        );
      });
    }

    let i = 0;

    return (
      <div className="myReportedLogsPage">
        <text className="myReportedLogsTitle">작성된 리포트</text>
        <div style={{ left: "38.5%" }}>
          <div className="reportedlogs_box1">{reports[0]}</div>
          <div className="reportedlogs_box2">{reports[1]}</div>
          <div className="reportedlogs_box3">{reports[2]}</div>
          <div className="reportedlogs_box4">{reports[3]}</div>
          <div className="reportedlogs_box5">{reports[4]}</div>
          <div className="reportedlogs_box6">{reports[5]}</div>
        </div>
      </div>
    );
  }
}

export default MyReportedLogs;
