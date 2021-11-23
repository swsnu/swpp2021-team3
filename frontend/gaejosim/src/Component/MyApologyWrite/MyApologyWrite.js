import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
// import axios from "axios";
import "./MyApologyWrite.css";

class MyApologyWrite extends Component {
  render() {
    return (
      <div className="myReportedLogsPage">
        {/* {redirect} */}
        <text className="myApologyWriteTitle">반성문 작성</text>
        <div>
          <div className="apology_box1">
            <text className="boxText1">
              Recent Reported Log1 : ReportedSummoner
            </text>
            <text className="boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
          </div>
        </div>
        <div className="apology_write_box">
          {/* <div className="apology_write_box"> */}
          <input
            // className="apology_write_input"
            id="text"
            type="text"
            // row="10"
            placeholder={"반성문을 이곳에 작성하세요"}
            //   value={this.state.summoner_names_multi}
            //   onChange={(event) =>
            // this.setState({ summoner_names_multi: event.target.value })
            //   }
          />
        </div>
        <button className="apology_check_completed_button">제출</button>
      </div>
    );
  }
}

export default MyApologyWrite;
