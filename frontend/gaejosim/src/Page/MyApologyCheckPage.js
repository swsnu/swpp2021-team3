import React, { Component } from "react"

import Header from '../Container/Header/Header'
import MyApologyCheck from "./../Component/MyApologyCheck/MyApologyCheck"

class MyApologyCheckPage extends Component {
  render() {
    let reportID = this.props.match.params.reportid
    return (
      <div className = "MyApologyCheckPage">
        <Header/>
        <MyApologyCheck reportID={reportID}/>
      </div>
    )
  }
}

export default MyApologyCheckPage
