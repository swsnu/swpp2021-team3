import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./Statistic.css";

import { connect } from "react-redux";

// TODO: css numToAnswer display

class Statistic extends Component {
  state = {
    getResult: false,
    numReports: 100,
    numPrevents: 5,
    numToAnswer: 0,
  };

  constructor(props) {
    super(props);
    this.getStatistics();
  }

  getStatistics = async () => {
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";

    axios.get("/api/token/").then();

    const response = await axios.get("/api/home/", {}).then((res) => {
      console.log("response.data");
      console.log(res.data);
      this.state.numReports = res.data.accumulated_reports;
      this.state.numPrevents = res.data.today_reports;
      this.state.numToAnswer = res.data.not_answered_reports;
      this.state.getResult = true;
      // this.setState({numReports: res.data.accumulated_reports, numPrevents: res.data.today_reports, numToAswer: res.data.not_answered_reports, getResult: true})
    });
  };

  render() {
    return (
      <div className="Statistic">
        {this.state.getResult && <div className="AllReports">All Reports</div>}
        {this.state.getResult && (
          <div className="NumReports">{this.state.numReports}</div>
        )}
        {this.state.getResult && (
          <div className="TodayReports">Today Reports</div>
        )}
        {this.state.getResult && (
          <div className="NumPrevents">{this.state.numPrevents}</div>
        )}
        {this.props.storedisLogin && this.state.numToAnswer !== 0 && (
          <div>Alert:{this.state.numToAswer}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    storedisLogin: state.userR.login,
  };
};

export default connect(mapStateToProps, null)(withRouter(Statistic));
