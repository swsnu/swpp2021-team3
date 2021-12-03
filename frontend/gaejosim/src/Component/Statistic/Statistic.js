import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./Statistic.css";

// TODO: /api/statistics/ 만들어 져야 완성 가능

class Statistic extends Component {
  state = {
    getResult : false,
    numReports: 100,
    numPrevents: 5,
  };

  constructor(props) {
    super(props);
    this.getStatistics()
  }

  getStatistics = async () => {

    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";

    axios.get("/api/token/").then();

    const url = "http://localhost:3000/api/statistics/";
    console.log("call axios.get request");
    const response = await axios.get('/api/statistics/', {
    })
    .then(res => {
      console.log("response.data")
      console.log(res.data)
      this.setState({numReports: res.data.accumulated_reports, numPrevents: res.data.today_reports, getResult: true})
    })
  };


  render() {
    return (
      <div className="Statistic">
        {this.state.getResult && <div className="AllReports">All Reports</div>}
        {this.state.getResult && <div className="NumReports">{this.state.numReports}</div>}
        {this.state.getResult && <div className="TodayReports">Today Reports</div> }
        {this.state.getResult && <div className="NumPrevents">{this.state.numPrevents}</div> }
      </div>
    );
  }
}

export default Statistic;
