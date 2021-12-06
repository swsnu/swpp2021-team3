import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import DetailReportingLog from './DetailReportingLog/DetailReportingLog'

import './MyReportingLogs.css'

class MyReportingLogs extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      reports: [],
      getResult: false,
    }
  }

  getReportingLogs = async () => {
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'

    axios.get('/api/token/').then()

    await axios.get('/api/my/reports/', {})
      .then((res) => {
        this.setState({
          reports: res.data.reports,
          getResult: true,
        })
      })
      .catch((error) => {
        alert(error.response.data.error + '\n 로그인 페이지로 이동합니다.')
        this.props.history.push('/login')
      })
  }

  render() {
    let myReportingLogs = []

    if (this.state.getResult === false) {
      this.getReportingLogs()
    } else {
      myReportingLogs = this.state.reports.map((report, reportIdx) => {
        return (
          <div className = {`myreportinglogs`+reportIdx} key = {reportIdx}>
            <DetailReportingLog
              key = {reportIdx}
              reportID = {report.id}
              reportedSummoner = {report.reported_summoner}
              evaluation = {report.evaluation}
              tags = {report.tag}
              comment = {report.comment}
              apology = {report.apology}
            />
          </div>
        )
      })
    }


    return (
      <div className = 'myReportingLogsPage'>
        <div className = 'myReportingLogsTitle'>작성한 리포트</div>
        <div style = {{ left: '38.5%' }}>
          {this.state.getResult && <div>{myReportingLogs}</div>}
        </div>
      </div>
    )
  }
}

export default withRouter(MyReportingLogs)
