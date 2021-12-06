import React, { Component } from "react";

import "./ReportingLog.css";

class ReportingLog extends Component {
  render() {
    // console.log(this.props);
    return (
      <div className="ReportingLog">
        <div className="ReportingLog_Box">
          <div className="ReportingLog_Text">
            [신고 대상 소환사] {this.props.reportedSummoner} [매너포인트] {this.props.evaluation}           
            <br />
            [태그] {this.props.tags} 
            {/* {this.props.comments}
            {this.props.apology} */}
          </div>
          <img
            className="ReportingLog_Paper"
            alt="paper_img"
            src={process.env.PUBLIC_URL + `/images/icons/icon-paper.png`}
            // onClick={() => this.props.clicked}
          />
          <img
            className="ReportingLog_Delete"
            alt="delete_img"
            src={process.env.PUBLIC_URL + `/images/icons/icon-delete.png`}
            // onClick={() => this.props.clicked}
          />
        </div>
      </div>
    );
  }
}

export default ReportingLog;
