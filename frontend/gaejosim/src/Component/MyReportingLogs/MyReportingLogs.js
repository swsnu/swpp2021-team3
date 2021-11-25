import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import axios from "axios";
import "./MyReportingLogs.css";
import Paper from "../../Assets/Images/icon-paper.png";
import Delete from "../../Assets/Images/icon-delete.png";

class MyReportingLogs extends Component {
  state = {
    ApologyCheck: false,
  };

  onClickApologyCheck = () => {
    this.setState({ ApologyCheck: true });
  };

  render() {
    let redirect = null;
    if (this.state.ApologyCheck === true) {
      redirect = <Redirect to={`/myApologyCheck`} />;
    }

    return (
      <div className="myReportingLogsPage">
        {redirect}
        <text className="myReportingLogsTitle">작성한 리포트</text>
        <div style={{ left: "38.5%" }}>
          <div className="Reportinglogs_box1">
            <text className="Reportinglogs_boxText1">
              Recent Reporting Log1 : ReportedSummoner
            </text>
            <text className="Reportinglogs_boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
            <img
              className="Reportinglogs1_Paper"
              src={Paper}
              alt={Paper}
              onClick={() => this.onClickApologyCheck()}
            />
            <img
              className="Reportinglogs1_Delete"
              src={Delete}
              alt={Delete}
              onClick={() => alert("해당하는 리포트가 삭제되었습니다")}
            />
          </div>
          <div className="Reportinglogs_box2">
            <text className="Reportinglogs_boxText1">
              Recent Reporting Log1 : ReportedSummoner
            </text>
            <text className="Reportinglogs_boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
            <img
              className="Reportinglogs2_Paper"
              src={Paper}
              alt={Paper}
              onClick={() => this.onClickApologyCheck()}
            />
            <img
              className="Reportinglogs2_Delete"
              src={Delete}
              alt={Delete}
              onClick={() => alert("해당하는 리포트가 삭제되었습니다")}
            />
          </div>
          <div className="Reportinglogs_box3">
            <text className="Reportinglogs_boxText1">
              Recent Reporting Log1 : ReportedSummoner
            </text>
            <text className="Reportinglogs_boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
            <img
              className="Reportinglogs3_Paper"
              src={Paper}
              alt={Paper}
              onClick={() => this.onClickApologyCheck()}
            />
            <img
              className="Reportinglogs3_Delete"
              src={Delete}
              alt={Delete}
              onClick={() => alert("해당하는 리포트가 삭제되었습니다")}
            />
          </div>
          <div className="Reportinglogs_box4">
            <text className="Reportinglogs_boxText1">
              Recent Reporting Log1 : ReportedSummoner
            </text>
            <text className="Reportinglogs_boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
            <img
              className="Reportinglogs4_Paper"
              src={Paper}
              alt={Paper}
              onClick={() => this.onClickApologyCheck()}
            />
            <img
              className="Reportinglogs4_Delete"
              src={Delete}
              alt={Delete}
              onClick={() => alert("해당하는 리포트가 삭제되었습니다")}
            />
          </div>
          <div className="Reportinglogs_box5">
            <text className="Reportinglogs_boxText1">
              Recent Reporting Log1 : ReportedSummoner
            </text>
            <text className="Reportinglogs_boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
            <img
              className="Reportinglogs5_Paper"
              src={Paper}
              alt={Paper}
              onClick={() => this.onClickApologyCheck()}
            />
            <img
              className="Reportinglogs5_Delete"
              src={Delete}
              alt={Delete}
              onClick={() => alert("해당하는 리포트가 삭제되었습니다")}
            />
          </div>
          <div className="Reportinglogs_box6">
            <text className="Reportinglogs_boxText1">
              Recent Reporting Log1 : ReportedSummoner
            </text>
            <text className="Reportinglogs_boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
            <img
              className="Reportinglogs6_Paper"
              src={Paper}
              alt={Paper}
              onClick={() => this.onClickApologyCheck()}
            />
            <img
              className="Reportinglogs6_Delete"
              src={Delete}
              alt={Delete}
              onClick={() => alert("해당하는 리포트가 삭제되었습니다")}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MyReportingLogs;
