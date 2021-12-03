import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import axios from "axios";
import "./MyReportedLogs.css";

import ReportedLog from "../ReportedLog/ReportedLog";

class MyReportedLogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // reports: [],
      // getReportsBoolean: false,

      ApologyWrite: false,
    };
  }

  // componentDidMount() {
  //   if (this.state.getReportsBoolean === false) {
  //     this.getReports();
  //   }
  // }

  // getReports = async () => {
  //   axios.defaults.xsrfCookieName = "csrftoken";
  //   axios.defaults.xsrfHeaderName = "X-CSRFToken";

  //   axios.get("/api/token/").then();

  //   const response_signin = await axios.post("/api/signin/", {
  //     username: "test1",
  //     password: "password",
  //   });

  //   if (response_signin.status === 200) {
  //     const response = await axios.get("/api/my/received_reports/");

  //     this.setState({
  //       reports: response.data.reports,
  //       getReports: true,
  //     });
  //   }
  // };

  onClickApologyWrite = () => {
    this.setState({ ApologyWrite: true });
  };

  render() {
    let redirect = null;

    // let reports_info;

    // if (this.state.reports_info === false) {
    //   this.getReports();
    // } else {
    //   reports_info = this.state.reports.map((reports) => {
    //     return (
    //       <div className={reports.id}>
    //         <div>
    //           Recent Reported Log{reports.id}: {reports.reported_summoner}
    //         </div>
    //         <div>
    //           {reports.tag}, {reports.evaluation}, {reports.comment}
    //         </div>
    //       </div>
    //     );
    //   });
    // }

    if (this.state.ApologyWrite === true) {
      redirect = <Redirect to={`/myApologyWrite`} />;
    }

    return (
      <div className="myReportedLogsPage">
        {redirect}
        <text className="myReportedLogsTitle">작성된 리포트</text>
        <div style={{ left: "38.5%" }}>
          <div className="reportedlogs_box1">
            <ReportedLog />
          </div>
          <div className="reportedlogs_box2">
            <ReportedLog />
          </div>
          <div className="reportedlogs_box3">
            <ReportedLog />
          </div>
          <div className="reportedlogs_box4">
            <ReportedLog />
          </div>
          <div className="reportedlogs_box5">
            <ReportedLog />
          </div>
          <div className="reportedlogs_box6">
            <ReportedLog />
          </div>
        </div>
      </div>
    );
  }
}

export default MyReportedLogs;
