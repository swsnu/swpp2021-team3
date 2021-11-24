import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import axios from "axios";
import "./MyReportedLogs.css";
import Pencil from "../../Assets/Images/icon-pencil.png";
// import Paper from "../../Assets/Images/icon-paper.png";
// import Delete from "../../Assets/Images/icon-delete.png";

class MyReportedLogs extends Component {
  state = {
    ApologyWrite: false,
  };

  onClickApologyWrite = () => {
    this.setState({ ApologyWrite: true });
  };

  render() {
    let redirect = null;

    if (this.state.ApologyWrite === true) {
      redirect = <Redirect to={`/myApologyWrite`} />;
    }

    if (this.state.MyPage === true) {
      redirect = <Redirect to={`/my`} />;
    }

    return (
      <div className="myReportedLogsPage">
        {redirect}
        <text className="myReportedLogsTitle">작성된 리포트</text>
        <div style={{ left: "38.5%" }}>
          <div className="reportedlogs_box1">
            <text className="reportedlogs_boxText1">
              Recent Reported Log1 : ReportedSummoner
            </text>
            <text className="reportedlogs_boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>

            <img
              className="reportedlogs_Pencil"
              src={Pencil}
              alt={Pencil}
              onClick={() => this.onClickApologyWrite()}
            />
          </div>
          <div className="reportedlogs_box2">
            <text className="reportedlogs_boxText1">
              Recent Reported Log1 : ReportedSummoner
            </text>
            <text className="reportedlogs_boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
            <img
              className="reportedlogs_Pencil"
              src={Pencil}
              alt={Pencil}
              onClick={() => this.onClickApologyWrite()}
            />
          </div>
          <div className="reportedlogs_box3">
            <text className="reportedlogs_boxText1">
              Recent Reported Log1 : ReportedSummoner
            </text>
            <text className="reportedlogs_boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
            <img
              className="reportedlogs_Pencil"
              src={Pencil}
              alt={Pencil}
              onClick={() => this.onClickApologyWrite()}
            />
          </div>
          <div className="reportedlogs_box4">
            <text className="reportedlogs_boxText1">
              Recent Reported Log1 : ReportedSummoner
            </text>
            <text className="reportedlogs_boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
            <img
              className="reportedlogs_Pencil"
              src={Pencil}
              alt={Pencil}
              onClick={() => this.onClickApologyWrite()}
            />
          </div>
          <div className="reportedlogs_box5">
            <text className="reportedlogs_boxText1">
              Recent Reported Log1 : ReportedSummoner
            </text>
            <text className="reportedlogs_boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
            <img
              className="reportedlogs_Pencil"
              src={Pencil}
              alt={Pencil}
              onClick={() => this.onClickApologyWrite()}
            />
          </div>
          <div className="reportedlogs_box6">
            <text className="reportedlogs_boxText1">
              Recent Reported Log1 : ReportedSummoner
            </text>
            <text className="reportedlogs_boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
            <img
              className="reportedlogs_Pencil"
              src={Pencil}
              alt={Pencil}
              onClick={() => this.onClickApologyWrite()}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MyReportedLogs;
