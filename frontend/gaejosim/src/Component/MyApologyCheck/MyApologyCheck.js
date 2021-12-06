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
        <div className="myApologyCheckTitle">반성문 확인</div>
        <div>
          <div className="apology_check_box">
            <div className="apology_check_text">apology.content</div>
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
