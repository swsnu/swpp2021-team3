import React, { Component } from "react";
import axios from "axios";
import "./MyReportedLogs.css";

<<<<<<< HEAD
import { withRouter } from "react-router-dom";

import ReportedLog2 from "./ReportedLog2/ReportedLog2";
=======
import ReportedLog2 from "./ReportedLog2/ReportedLog2";

//todo: my.js와 유사한 형태로 코드를 작성했지만 나오지를 않음
>>>>>>> 1a46e2f9723512a1a4de794ccf7e8781d3dd3977

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

<<<<<<< HEAD
    const response = await axios
      .get("/api/my/received_reports/", {})
      .then((res) => {
        // let userInfo = res.data.user;
        let reportInfo = res.data.reports;
        // console.log("reportInfo:" + reportInfo); // this works
        console.log(res.data); //this works
=======
    console.log("getReportedLogs");
    const response = await axios
      .get("/api/my/received_reports/", {})
      .then((res) => {
        let reportInfo = res.data.reports;
        console.log("res.data : " + res.data);
>>>>>>> 1a46e2f9723512a1a4de794ccf7e8781d3dd3977
        this.setState({
          // username: userInfo.username,
          // email: userInfo.email,
          // summonerName: userInfo.summoner_name,
          // mannerPoint: userInfo.mannerPoint,
          // reportsForUser: reportInfo.reports_for_user,
          // reportsByUser: reportInfo.reports_by_user,
<<<<<<< HEAD
          reportedlogs: reportInfo.reports,
=======
          reports: reportInfo.reports,
>>>>>>> 1a46e2f9723512a1a4de794ccf7e8781d3dd3977
          getResult: true,
        });
      });
  };

  render() {
    let myReportedLogs = [];

    if (this.state.getResult === false) {
      this.getReportedLogs();
    } else {
      myReportedLogs = this.state.reports.map((report, reportIdx) => {
        let myreportedlogsIdx = "myreportedlogs" + reportIdx;
        return (
          <div className={myreportedlogsIdx} key={reportIdx}>
            <ReportedLog2
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

    console.log("test : " + myReportedLogs);

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
