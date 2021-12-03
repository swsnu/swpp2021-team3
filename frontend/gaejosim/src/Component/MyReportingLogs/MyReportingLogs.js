import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import axios from "axios";
import "./MyReportingLogs.css";

import ReportingLog from "../ReportingLog/ReportingLog";

class MyReportingLogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // reports: [],
      // getReportsBoolean: false,

      ApologyCheck: false,
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
  //     const response = await axios.get("/api/my/reports/");

  //     this.setState({
  //       reports: response.data.reports,
  //       getReports: true,
  //     });
  //   }
  // };

  deleteReport = async () => {
    // axios.defaults.xsrfCookieName = "csrftoken";
    // axios.defaults.xsrfHeaderName = "X-CSRFToken";

    // axios.get("/api/token/").then();

    // const response_signin = await axios.post("/api/signin/", {
    //   username: "test1",
    //   password: "password",
    // });

    // if (response_signin.status === 200) {
    //   axios
    //     .delete("/api/reports/:id/")
    //     .then(() => this.setState({ status: "Your report is deleted" }));
    // }
    alert("리포트가 삭제되었습니다");
  };

  onClickApologyCheck = () => {
    this.setState({ ApologyCheck: true });
  };

  onClickDeleteHandler = () => {
    this.deleteReport();
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

    if (this.state.ApologyCheck === true) {
      redirect = <Redirect to={`/myApologyCheck`} />;
    }

    return (
      <div className="myReportingLogsPage">
        {redirect}
        <text className="myReportingLogsTitle">작성한 리포트</text>
        <div style={{ left: "38.5%" }}>
          <div className="Reportinglogs_box1">
            <ReportingLog />
          </div>
          <div className="Reportinglogs_box2">
            <ReportingLog />
          </div>
          <div className="Reportinglogs_box3">
            <ReportingLog />
          </div>
          <div className="Reportinglogs_box4">
            <ReportingLog />
          </div>
          <div className="Reportinglogs_box5">
            <ReportingLog />
          </div>
          <div className="Reportinglogs_box6">
            <ReportingLog />
          </div>
        </div>
      </div>
    );
  }
}

export default MyReportingLogs;
