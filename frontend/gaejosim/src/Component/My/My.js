import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import axios from "axios";
import "./My.css";

class My extends Component {
  render() {
    return (
      <div className="myPage">
        {/* {redirect} */}
        <text className="mypageTitle">마이페이지</text>
        {/* <text className='subtitleTextStyle'>Select A Troll</text> */}
        <text className="mypageContent">
          <text style={{ fontWeight: "bold" }}>유저네임</text>
          <br /> XXXXXXXX
          <br />
          <br />
          <text style={{ fontWeight: "bold" }}>이메일</text>
          <br />
          Email@email.com
          <br />
          <br />
          <text style={{ fontWeight: "bold" }}>소환사이름</text>
          <br />
          XXXXXXXX
          <br />
          <br />
          <text style={{ fontWeight: "bold" }}>매너포인트</text> 80%
          <div className="mpGraphPercent" />
          <div className="mpGraphAll" />
        </text>
        <div style={{ left: "38.5%" }}>
          <text className="recentText1">Recent Reported Logs</text>
          <text className="seemoreText1">더보기</text>
          <div className="box1">
            <text className="boxText1">
              Recent Reported Log1 : ReportedSummoner
            </text>
            <text className="boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
          </div>
          <div className="box2">
            <text className="boxText1">
              Recent Reported Log1 : ReportedSummoner
            </text>
            <text className="boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
          </div>
        </div>
        <div>
          <text className="recentText2">Recent Reporting Logs</text>
          <text className="seemoreText2">더보기</text>
          <div className="box3">
            <text className="boxText1">
              Recent Reporting Log1 : ReportedSummoner
            </text>
            <text className="boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
          </div>
          <div className="box4">
            <text className="boxText1">
              Recent Reporting Log1 : ReportedSummoner
            </text>
            <text className="boxText2">
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
          </div>
        </div>
      </div>
    );
  }
}

export default My;
