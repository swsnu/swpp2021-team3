import React, { Component } from "react";
import Header from '../Container/Header/Header';
import MyApologyWrite from "./../Component/MyApologyWrite/MyApologyWrite";

class MyApologyWritePage extends Component {
  render() {
    return (
      <div className = "MyApologyWritePage">
        <Header/>
        <MyApologyWrite />
      </div>
    );
  }
}

export default MyApologyWritePage;
