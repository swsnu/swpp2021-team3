import React, { Component } from "react";
import Header from '../Container/Header/Header';
import MyReportingLogs from "../Component/MyReportingLogs/MyReportingLogs";

class MyReportingLogsPage extends Component {
  render() {
    return (
      <div className="MyReportingLogsPage">
        <Header/>
        <MyReportingLogs />
      </div>
    );
  }
}

export default MyReportingLogsPage;
