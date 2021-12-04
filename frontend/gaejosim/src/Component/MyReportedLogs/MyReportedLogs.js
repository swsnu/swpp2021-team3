import React, { Component } from "react";
import axios from "axios";
import "./MyReportedLogs.css";

import { withRouter } from "react-router-dom";

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

    const response = await axios
      .get("/api/my/received_reports/", {})
      .then((res) => {
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
          reportedlogs: reportInfo.reports,
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
      console.log(myReportedLogs);
      // todo : 이게 데이터를 받지 못하고 있음 map function이 문제인 것 같은데 해결 방법을 모르겠음
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
