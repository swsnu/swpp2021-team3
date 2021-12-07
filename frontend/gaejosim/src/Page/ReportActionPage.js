import React, { Component } from 'react';

import Header from '../Container/Header/Header'
import ReportAction from '../Component/ReportAction/ReportAction'

import './ReportActionPage.css'

class ReportActionPage extends Component {
  render() {
    const reportedSummoner = this.props.match.params.summonerid
    return (
      <div className='ReportActionPage'>
        <Header />
        <ReportAction reported_summoner = {reportedSummoner} />
      </div>
    )
  }
}

export default ReportActionPage
