import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import axios from "axios";
import "./MyReportingLogs.css";
import Paper from "../../Assets/Images/icon-paper.png";
import Delete from "../../Assets/Images/icon-delete.png";

class MyReportingLogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // reports: [],
      // getReportsBoolean: false,

      ApologyCheck: false,
    };
  }

  // componentDidMount() {
  //   if (this.state.getReportsBoolean === false) {
  //     this.getReports();
  //   }
  // }

  // getReports = async () => {
  //   axios.defaults.xsrfCookieName = "csrftoken";
  //   axios.defaults.xsrfHeaderName = "X-CSRFToken";

  //   axios.get("/api/token/").then();

  //   const response_signin = await axios.post("/api/signin/", {
  //     username: "test1",
  //     password: "password",
  //   });

  //   if (response_signin.status === 200) {
  //     const response = await axios.get("/api/my/reports/");

  //     this.setState({
  //       reports: response.data.reports,
  //       getReports: true,
  //     });
  //   }
  // };

  deleteReport = async () => {
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
    this.deleteReport();
  };

  render() {
    let redirect = null;

    // let reports_info;

    // if (this.state.reports_info === false) {
    //   this.getReports();
    // } else {
    //   reports_info = this.state.reports.map((reports) => {
    //     return (
    //       <div className={reports.id}>
    //         <div>
    //           Recent Reported Log{reports.id}: {reports.reported_summoner}
    //         </div>
    //         <div>
    //           {reports.tag}, {reports.evaluation}, {reports.comment}
    //         </div>
    //       </div>
    //     );
    //   });
    // }

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
              Recent Reporting Log reports.id : reports.reported_summoner
            </text>
            <text className="Reportinglogs_boxText2">
              reports.tag, reports.evaluation, reports.comment
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
              onClick={() => this.onClickDeleteHandler()}
            />
          </div>
          <div className="Reportinglogs_box2">
            <text className="Reportinglogs_boxText1">
              Recent Reporting Log reports.id : reports.reported_summoner
            </text>
            <text className="Reportinglogs_boxText2">
              reports.tag, reports.evaluation, reports.comment
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
              onClick={() => this.onClickDeleteHandler()}
            />
          </div>
          <div className="Reportinglogs_box3">
            <text className="Reportinglogs_boxText1">
              Recent Reporting Log reports.id : reports.reported_summoner
            </text>
            <text className="Reportinglogs_boxText2">
              reports.tag, reports.evaluation, reports.comment
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
              onClick={() => this.onClickDeleteHandler()}
            />
          </div>
          <div className="Reportinglogs_box4">
            <text className="Reportinglogs_boxText1">
              Recent Reporting Log reports.id : reports.reported_summoner
            </text>
            <text className="Reportinglogs_boxText2">
              reports.tag, reports.evaluation, reports.comment
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
              onClick={() => this.onClickDeleteHandler()}
            />
          </div>
          <div className="Reportinglogs_box5">
            <text className="Reportinglogs_boxText1">
              Recent Reporting Log reports.id : reports.reported_summoner
            </text>
            <text className="Reportinglogs_boxText2">
              reports.tag, reports.evaluation, reports.comment
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
              onClick={() => this.onClickDeleteHandler()}
            />
          </div>
          <div className="Reportinglogs_box6">
            <text className="Reportinglogs_boxText1">
              Recent Reporting Log reports.id : reports.reported_summoner
            </text>
            <text className="Reportinglogs_boxText2">
              reports.tag, reports.evaluation, reports.comment
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
              onClick={() => this.onClickDeleteHandler()}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MyReportingLogs;
