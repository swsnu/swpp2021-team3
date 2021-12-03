import React, { Component } from "react";
import axios from "axios";
import "./MyReportedLogs.css";

import ReportedLog2 from "./ReportedLog2/ReportedLog2";

//todo: my.js와 유사한 형태로 코드를 작성했지만 나오지를 않음

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
        let reportInfo = res.data.reports;
        console.log("res.data : " + res.data);
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
    let myReportedLogs = [];

    if (this.state.getREsult === false) {
      this.getReportedLogs();
    } else {
      // let idx = 0;
      myReportedLogs = this.state.reports.map((report, reportIdx) => {
        // idx++;
        let reportedLogsIdx = "reportedLogs" + reportIdx;
        console.log("reports: " + myReportedLogs);

        return (
          <div className={reportedLogsIdx} key={reportIdx}>
            <ReportedLog2
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
    }

    return (
      <div className="myReportedLogsPage">
        <div className="myReportedLogsTitle">작성된 리포트</div>
        <div style={{ left: "38.5%" }}>
          {/* <div className="reportedlogs_box1">{reports[0]}</div>
          <div className="reportedlogs_box2">{reports[1]}</div>
          <div className="reportedlogs_box3">{reports[2]}</div>
          <div className="reportedlogs_box4">{reports[3]}</div>
          <div className="reportedlogs_box5">{reports[4]}</div>
          <div className="reportedlogs_box6">{reports[5]}</div> */}
          <div>{myReportedLogs}</div>
        </div>
      </div>
    );
  }
}

export default MyReportedLogs;
