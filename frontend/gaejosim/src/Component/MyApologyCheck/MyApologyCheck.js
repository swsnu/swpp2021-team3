import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
// import axios from "axios";
import "./MyApologyCheck.css";

class MyApologyCheck extends Component {
  render() {
    return (
      <div className="myReportedLogsPage">
        {/* {redirect} */}
        <text className="myApologyCheckTitle">반성문 확인</text>
        <div>
          <div className="box1">
            <text className="boxText1">
              Recent Reported Log1 : ReportedSummoner
            </text>
            <text className="boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
          </div>
        </div>
        <div>
          <div className="apology_check_box">
            <text className="apology_check_text">
              asdf asdfasdfas dfasdfasdfasdfasdfasdfasdfasdfasd
              fasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfa sdfasdfasdf
            </text>
          </div>
        </div>
        <button className="apology_check_completed_button">확인</button>
      </div>
    );
  }
}

export default MyApologyCheck;