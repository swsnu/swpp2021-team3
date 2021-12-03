import React, { Component } from "react";
import Header from '../Container/Header/Header';
import MyReportedLogs from "../Component/MyReportedLogs/MyReportedLogs";

class MyReportedLogsPage extends Component {
  render() {
    return (
      <div className="MyReportedLogsPage">
        <Header/>
        <MyReportedLogs />
      </div>
    );
  }
}

export default MyReportedLogsPage;
