import React, { Component } from "react";
import axios from "axios";
import "./MyReportingLogs.css";

// import ReportingLog2 from "../ReportingLog2/ReportingLog2";
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

    console.log("getReportingLogs");
    const response = await axios.get("/api/my/reports/", {}).then((res) => {
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
      this.getReportingLogs();
    } else {
      let idx = 0;
      reports = this.state.reports.map((report) => {
        idx++;
        return (
          <ReportingLog2
            key={idx}
            userID={report.id}
            userEvaluation={report.userEvaluation}
            tags={report.tags}
            // "reported_summoner" : "reported summoner name",
            reportedSummoer={report.reported_summoner}
            comment={report.comment}
            apology={report.apology}
          />
        );
      });
    }

    return (
      <div className="myReportingLogsPage">
        <div className="myReportingLogsTitle">작성한 리포트</div>
        <div style={{ left: "38.5%" }}>
          <div className="Reportinglogs_box1">{reports[0]}</div>
          <div className="Reportinglogs_box2">{reports[1]}</div>
          <div className="Reportinglogs_box3">{reports[2]}</div>
          <div className="Reportinglogs_box4">{reports[3]}</div>
          <div className="Reportinglogs_box5">{reports[4]}</div>
          <div className="Reportinglogs_box6">{reports[5]}</div>
        </div>
      </div>
    );
  }
}

export default MyReportingLogs;
