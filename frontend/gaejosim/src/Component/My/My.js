import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import axios from "axios";

import ReportedLog from "../ReportedLog/ReportedLog";
import ReportingLog from "../ReportingLog/ReportingLog";

import "./My.css";

class My extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // username: props.username,
      // email: props.email,
      // summoner_name: props.summoner_name,
      // manner_point: props.manner_point,

      // reports_for_user: [],
      // reports_by_user: [],

      // getMyPageDataBoolean: false,

      ReportedLogs: false,
      ReportingLogs: false,
    };
  }

  // componentDidMount() {
  //   if (this.state.getMyPageDataBoolean === false) {
  //     this.getMyPageData();
  //   }
  // }

  // getMyPageData = async () => {
  //   axios.defaults.xsrfCookieName = "csrftoken";
  //   axios.defaults.xsrfHeaderName = "X-CSRFToken";

  //   axios.get("/api/token/").then();

  //   const response_signin = await axios.post("/api/signin/", {
  //     username: "test1",
  //     password: "password",
  //   });

  //   if (response_signin.status === 200) {
  //     const response = await axios.get("/api/me/mypage/");

  //     this.setState({
  //       username: response.data.username,
  //       email: response.data.email,
  //       summoner_name: response.data.summoner_name,
  //       manner_point: response.data.manner_point,
  //       reports_for_user: response.data.reports_for_user,
  //       reports_by_user: response.data.reports_by_user,
  //       getMyPageDataBoolean: true,
  //     });
  //   }
  // };

  onClickReportedLogs = () => {
    this.setState({ ReportedLogs: true });
  };

  onClickReportingLogs = () => {
    this.setState({ ReportingLogs: true });
  };

  render() {
    let redirect = null;

    // let reports_by_user_info;
    // let reports_for_user_info;
    // if (
    //   this.state.reports_by_user_info === false ||
    //   this.state.reports_for_user_info === false
    // ) {
    //   this.getMyPageData();
    // } else {
    //   reports_by_user_info = this.state.reports_by_user.map(
    //     (reports_by_user) => {
    //       return (
    //         <div className={reports_by_user.id}>
    //           <div>
    //             Recent Reporting Log{reports_by_user.id}:{" "}
    //             {reports_by_user.reported_summoner}
    //           </div>
    //           <div>
    //             {reports_by_user.tag}, {reports_by_user.evaluation},{" "}
    //             {reports_by_user.comment}
    //           </div>
    //         </div>
    //       );
    //     }
    //   );
    //   reports_for_user_info = this.state.reports_for_user.map(
    //     (reports_for_user) => {
    //       return (
    //         <div className={reports_for_user.id}>
    //           <div>
    //             Recent Reporting Log{reports_for_user.id}:
    //             {reports_for_user.reported_summoner}
    //           </div>
    //           <div>
    //             {reports_for_user.tag}, {reports_for_user.evaluation},
    //             {reports_for_user.comment}
    //           </div>
    //         </div>
    //       );
    //     }
    //   );
    // }

    if (this.state.ReportedLogs === true) {
      redirect = <Redirect to={`/myReportedLogs`} />;
    }

    if (this.state.ReportingLogs === true) {
      redirect = <Redirect to={`/myReportingLogs`} />;
    }

    return (
      <div className="myPage">
        {redirect}
        <text className="mypageTitle">마이페이지</text>
        <text className="mypageContent">
          <text style={{ fontWeight: "bold" }}>유저네임</text>
          <br /> this.state.username
          <br />
          <br />
          <text style={{ fontWeight: "bold" }}>이메일</text>
          <br />
          this.state.email
          <br />
          <br />
          <text style={{ fontWeight: "bold" }}>소환사이름</text>
          <br />
          this.state.summoner_name
          <br />
          <br />
          <text style={{ fontWeight: "bold" }}>매너포인트</text>
          <br />
          this.state.manner_point
        </text>
        <div style={{ left: "38.5%" }}>
          <text className="recentText1">Recent Reporting Logs</text>
          <text
            className="SeemoreText1"
            onClick={() => this.onClickReportingLogs()}
          >
            더보기
          </text>
          <div className="mypage_box1">
            <ReportingLog />
          </div>
          <div className="mypage_box2">
            <ReportingLog />
          </div>
        </div>
        <div>
          <text className="recentText2">Recent Reported Logs</text>
          <text
            className="SeemoreText2"
            onClick={() => this.onClickReportedLogs()}
          >
            더보기
          </text>
          <div className="mypage_box3">
            <ReportedLog />
          </div>
          <div className="mypage_box4">
            <ReportedLog />
          </div>
        </div>
      </div>
    );
  }
}

export default My;
