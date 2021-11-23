import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
// import axios from "axios";
import "./MyReportedLogs.css";
import Pencil from "../../Assets/Images/icon-pencil.png";
// import Paper from "../../Assets/Images/icon-paper.png";
// import Delete from "../../Assets/Images/icon-delete.png";

class MyReportedLogs extends Component {
  render() {
    return (
      <div className="myReportedLogsPage">
        {/* {redirect} */}
        <text className="myReportedLogsTitle">작성된 리포트</text>
        <div style={{ left: "38.5%" }}>
          <div className="box1">
            <text className="boxText1">
              Recent Reported Log1 : ReportedSummoner
            </text>
            <text className="boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>

            <img className="Pencil" src={Pencil} alt={Pencil} />
          </div>
          <div className="box2">
            <text className="boxText1">
              Recent Reported Log1 : ReportedSummoner
            </text>
            <text className="boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
            <img className="Pencil" src={Pencil} alt={Pencil} />
          </div>
          <div className="box3">
            <text className="boxText1">
              Recent Reported Log1 : ReportedSummoner
            </text>
            <text className="boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
            <img className="Pencil" src={Pencil} alt={Pencil} />
          </div>
          <div className="box4">
            <text className="boxText1">
              Recent Reported Log1 : ReportedSummoner
            </text>
            <text className="boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
            <img className="Pencil" src={Pencil} alt={Pencil} />
          </div>
          <div className="box5">
            <text className="boxText1">
              Recent Reported Log1 : ReportedSummoner
            </text>
            <text className="boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
            <img className="Pencil" src={Pencil} alt={Pencil} />
          </div>
          <div className="box6">
            <text className="boxText1">
              Recent Reported Log1 : ReportedSummoner
            </text>
            <text className="boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
            <img className="Pencil" src={Pencil} alt={Pencil} />
          </div>
        </div>
      </div>
    );
  }
}

export default MyReportedLogs;
