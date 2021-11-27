import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import axios from "axios";
import "./MyReportedLogs.css";
import Pencil from "../../Assets/Images/icon-pencil.png";

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
              className="Reportedlogs1_Pencil"
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
              className="Reportedlogs2_Pencil"
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
              className="Reportedlogs3_Pencil"
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
              className="Reportedlogs4_Pencil"
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
              className="Reportedlogs5_Pencil"
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
              className="Reportedlogs6_Pencil"
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
