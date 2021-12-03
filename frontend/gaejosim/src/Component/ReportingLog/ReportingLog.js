import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import axios from "axios";
// import Pencil from "../../Assets/Images/icon-pencil.png";
import Paper from "../../Assets/Images/icon-paper.png";
import Delete from "../../Assets/Images/icon-delete.png";

import "./ReportingLog.css";

class ReportedLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // username: props.username,
      // email: props.email,
      // summoner_name: props.summoner_name,
      // manner_point: props.manner_point,

      // reports_for_user: [],
      // reports_by_user: [],

      // getMyPageDataBoolean: false,

      ApologyCheck: false,
      ApologyWrite: false,
      // ReportedLogs: false,
      // ReportingLogs: false,
    };
  }

  // componentDidMount() {
  //   if (this.state.getMyPageDataBoolean === false) {
  //     this.getMyPageData();
  //   }
  // }

  // getMyPageData = async () => {
  //   axios.defaults.xsrfCookieName = "csrftoken";
  //   axios.defaults.xsrfHeaderName = "X-CSRFToken";

  //   axios.get("/api/token/").then();

  //   const response_signin = await axios.post("/api/signin/", {
  //     username: "test1",
  //     password: "password",
  //   });

  //   if (response_signin.status === 200) {
  //     const response = await axios.get("/api/me/mypage/");

  //     this.setState({
  //       username: response.data.username,
  //       email: response.data.email,
  //       summoner_name: response.data.summoner_name,
  //       manner_point: response.data.manner_point,
  //       reports_for_user: response.data.reports_for_user,
  //       reports_by_user: response.data.reports_by_user,
  //       getMyPageDataBoolean: true,
  //     });
  //   }
  // };

  deleteReportData = async () => {
    // axios.defaults.xsrfCookieName = "csrftoken";
    // axios.defaults.xsrfHeaderName = "X-CSRFToken";

    // axios.get("/api/token/").then();

    // const response_signin = await axios.post("/api/signin/", {
    //   username: "test1",
    //   password: "password",
    // });

    // if (response_signin.status === 200) {
    //   axios
    //     .delete("/api/reports/:id/")
    //     .then(() => this.setState({ status: "Your report is deleted" }));
    // }
    alert("리포트가 삭제되었습니다");
  };

  onClickApologyCheck = () => {
    this.setState({ ApologyCheck: true });
  };

  onClickDeleteHandler = () => {
    this.deleteReportData();
  };

  render() {
    let redirect = null;

    if (this.state.ApologyCheck === true) {
      redirect = <Redirect to={`/myApologyCheck`} />;
    }

    return (
      <div className="ReportingLog">
        {redirect}
        <div className="ReportingLog_Box">
          <div className="ReportingLog_Text">
            Recent Reporting Log reports_for_user.id :
            reports_for_user.reported_summoner
            <br />
            reports_for_user.tag, reports_for_user.evaluation,
            reports_for_user.comment
          </div>
          <img
            className="ReportingLog_Paper"
            src={Paper}
            alt={Paper}
            onClick={() => this.onClickApologyCheck()}
          />
          <img
            className="ReportingLog_Delete"
            src={Delete}
            alt={Delete}
            onClick={() => this.onClickDeleteHandler()}
          />
        </div>
      </div>
    );
  }
}

export default ReportedLog;
