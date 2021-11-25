import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import axios from "axios";
import "./My.css";
import Pencil from "../../Assets/Images/icon-pencil.png";
import Paper from "../../Assets/Images/icon-paper.png";
import Delete from "../../Assets/Images/icon-delete.png";

//TODO: 서버 돌아가는 것 확인하면 확실하게 개발하기

class My extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // user model
      // username: props.username,
      // email: props.email,
      // summoner_name: props.summoner_name,
      // manner_point: props.manner_point,

      // reports_for_user: [],
      // reports_by_user: [],

      // getMyPageDataBoolean: false,

      // button routers
      ApologyCheck: false,
      ApologyWrite: false,
      ReportedLogs: false,
      ReportingLogs: false,
    };
  }

  // getMyPageData = async () => {
  //   console.log("call of getMyPageData");
  //   console.log("state of getMyPageData: " + this.state.getMyPageDataBoolean);

  //   axios.defaults.xsrfCookieName = "csrftoken";
  //   axios.defaults.xsrfHeaderName = "X-CSRFToken";

  //   console.log(this.state.username);
  //   console.log(this.state.email);
  //   console.log(this.state.summoner_name);
  //   console.log(this.state.manner_point);

  //   axios.get("/api/token/").then();

  //   const url = `http://localhost:3000/api/me/mypage`;
  //   console.log("call get request");

  //   const response = await axios.get(url, {
  //     params: {
  //       username: this.state.username,
  //       email: this.state.email,
  //       summoner_name: this.state.summoner_name,
  //       manner_point: this.state.manner_point,
  //     },
  //   });

  //   this.setState({
  //     reports_for_user: response.data.reports_for_user,
  //     reports_by_user: response.data.reports_by_user,
  //     getMyPageDataBoolean: true,
  //   });

  // };

  onClickApologyCheck = () => {
    this.setState({ ApologyCheck: true });
  };

  onClickApologyWrite = () => {
    this.setState({ ApologyWrite: true });
  };

  onClickReportedLogs = () => {
    this.setState({ ReportedLogs: true });
  };

  onClickReportingLogs = () => {
    this.setState({ ReportingLogs: true });
  };

  onClickDeleteHandler = () => {
    // DELETE request with axios
    // axios
    // .delete("/api/reports/:id/")
    // .then(() => this.setState({ status: "Your report is deleted" }));
    alert("해당하는 리포트가 삭제되었습니다");
  };

  render() {
    let redirect = null;

    // let mypageInfos;
    // if (this.state.mypageInfos === false) {
    //   console.log("call getMyPageData");
    //   this.getMyPageData();
    // } else {
    //   mypageInfos = this.state.reports_by_user.map((reports_by_user) => {
    //     return (
    //       <div>{this.state.reports_by_user}</div>
    //     );
    //   });
    // }

    if (this.state.ApologyCheck === true) {
      redirect = <Redirect to={`/myApologyCheck`} />;
    }

    if (this.state.ApologyWrite === true) {
      redirect = <Redirect to={`/myApologyWrite`} />;
    }

    if (this.state.ReportedLogs === true) {
      redirect = <Redirect to={`/myReportedLogs`} />;
    }

    if (this.state.ReportingLogs === true) {
      redirect = <Redirect to={`/myReportingLogs`} />;
    }

    return (
      <div className="myPage">
        {redirect}
        {/* <div>{mypageInfos}</div> */}
        <text className="mypageTitle">마이페이지</text>
        <text className="mypageContent">
          <text style={{ fontWeight: "bold" }}>유저네임</text>
          <br /> XXXXXXXX
          {/* {this.state.username} */}
          <br />
          <br />
          <text style={{ fontWeight: "bold" }}>이메일</text>
          <br />
          Email@email.com
          {/* {this.state.email} */}
          <br />
          <br />
          <text style={{ fontWeight: "bold" }}>소환사이름</text>
          <br />
          XXXXXXXX
          {/* {this.state.summoner_name} */}
          <br />
          <br />
          <text style={{ fontWeight: "bold" }}>매너포인트</text> 80%{" "}
          {/* {this.state.manner_point} */}
          <div className="mpGraphPercent" />
          <div className="mpGraphAll" />
        </text>
        <div style={{ left: "38.5%" }}>
          <text className="recentText1">Recent Reporting Logs</text>
          <text
            className="SeemoreText1"
            onClick={() => this.onClickReportingLogs()}
          >
            더보기
          </text>
          <div className="mypage_box1">
            <text className="boxText1">
              Recent Reporting Log1 : ReportedSummoner
            </text>
            <text className="boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
            <img
              className="Paper1"
              src={Paper}
              alt={Paper}
              onClick={() => this.onClickApologyCheck()}
            />
            <img
              className="Delete1"
              src={Delete}
              alt={Delete}
              // onClick={() => this.onClickDeleteHandler()}
              onClick={() => alert("해당하는 리포트가 삭제되었습니다")}
            />
          </div>
          <div className="mypage_box2">
            <text className="boxText1">
              Recent Reporting Log1 : ReportedSummoner
            </text>
            <text className="boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
            <img
              className="Paper2"
              src={Paper}
              alt={Paper}
              onClick={() => this.onClickApologyCheck()}
            />
            <img
              className="Delete2"
              src={Delete}
              alt={Delete}
              // onClick={() => this.onClickDeleteHandler()}
              onClick={() => alert("해당하는 리포트가 삭제되었습니다")}
            />
          </div>
        </div>
        <div>
          <text className="recentText2">Recent Reported Logs</text>
          <text
            className="SeemoreText2"
            onClick={() => this.onClickReportedLogs()}
          >
            더보기
          </text>
          <div className="mypage_box3">
            <text className="boxText1">
              Recent Reported Log1 : ReportedSummoner
            </text>
            <text className="boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
            <img
              className="Pencil1"
              src={Pencil}
              alt={Pencil}
              onClick={() => this.onClickApologyWrite()}
            />
          </div>
          <div className="mypage_box4">
            <text className="boxText1">
              Recent Reported Log1 : ReportedSummoner
            </text>
            <text className="boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
            <img
              className="Pencil2"
              src={Pencil}
              alt={Pencil}
              onClick={() => this.onClickApologyWrite()}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default My;
