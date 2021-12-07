import React, { Component } from 'react'

import Header from '../Container/Header/Header'
import MyApologyWrite from './../Component/MyApologyWrite/MyApologyWrite'

class MyApologyWritePage extends Component {
  render() {
    let reportID = this.props.match.params.reportid
    return (
      <div className = 'MyApologyWritePage'>
        <Header/>
        <MyApologyWrite reportID = {reportID} />
      </div>
    )
  }
}

export default MyApologyWritePage
