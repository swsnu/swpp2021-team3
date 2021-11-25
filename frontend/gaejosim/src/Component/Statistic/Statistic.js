import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./Statistic.css";

// TODO: /api/statistics/ 만들어 져야 완성 가능

class Statistic extends Component {
  state = {
    isLoading: true,
    numReports: 100,
    numPrevents: 5,
  };

  render() {
    return (
      <div className="Statistic">
        <div className="AllReports">All Reports</div>
        <div className="NumReports">{this.state.numReports}</div>
        <div className="TodayReports">Today Reports</div>
        <div className="NumPrevents">{this.state.numPrevents}</div>
      </div>
    );
  }
}

export default Statistic;
