import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import axios from "axios";
import "./MyApologyCheck.css";

class MyApologyCheck extends Component {
  state = {
    GotoMyPage: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      // id: props.id,
      // content: props.content,
      // is_verified: props.is_verified,
      // report_id: props.report_id,

      // getApologyBoolean: false,

      GotoMyPage: false,
    };
  }

  // componentDidMount() {
  //   if (this.state.getApologyBoolean === false) {
  //     this.getApology();
  //   }
  // }

  // getApology = async () => {
  //   axios.defaults.xsrfCookieName = "csrftoken";
  //   axios.defaults.xsrfHeaderName = "X-CSRFToken";

  //   axios.get("/api/token/").then();

  //   const response_signin = await axios.post("/api/signin/", {
  //     username: "test1",
  //     password: "password",
  //   });

  //   if (response_signin.status === 200) {
  //     const response = await axios.get(
  //       "/api/reports//api/reports/:report_id/apology/"
  //     );

  //     this.setState({
  //       id: response.data.id,
  //       content: response.data.content,
  //       is_verified: response.data.is_verified,
  //       report_id: response.data.report_id,
  //       getMyPageDataBoolean: true,
  //     });
  //   }
  // };

  onClickGotoMyPage = () => {
    this.setState({ GotoMyPage: true });
  };

  render() {
    let redirect = null;
    if (this.state.GotoMyPage === true) {
      redirect = <Redirect to={`/my`} />;
    }

    return (
      <div className="myReportedLogsPage">
        {redirect}
        <text className="myApologyCheckTitle">반성문 확인</text>
        <div>
          <div className="apology_box1">
            <text className="boxText1">
              Recent Reporting Log reports_for_user.id :
              reports_by_user.reported_summoner
            </text>
            <text className="boxText2">
              reports_by_user.tag, reports_by_user.evaluation,
              reports_by_user.comment{" "}
            </text>
          </div>
        </div>
        <div>
          <div className="apology_check_box">
            <text className="apology_check_text">apology.content</text>
          </div>
        </div>
        <button
          className="Apology_check_completed_button"
          onClick={() => this.onClickGotoMyPage()}
        >
          확인
        </button>
      </div>
    );
  }
}

export default MyApologyCheck;
