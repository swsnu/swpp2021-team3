import React, { Component } from "react";
import Header from '../Container/Header/Header';
import MyApologyCheck from "./../Component/MyApologyCheck/MyApologyCheck";

class MyApologyCheckPage extends Component {
  render() {
    return (
      <div className="MyApologyCheckPage">
        <Header/>
        <MyApologyCheck />
      </div>
    );
  }
}

export default MyApologyCheckPage;
