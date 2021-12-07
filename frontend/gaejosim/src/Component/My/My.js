import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import DetailReportingLog from '../MyReportingLogs/DetailReportingLog/DetailReportingLog'
import DetailReportedLog from '../MyReportedLogs/DetailReportedLog/DetailReportedLog'

import './My.css'


class My extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      summonerName: '',
      mannerPoint: 0,
      reportsForUser: [],
      reportsByUser: [],
      getResult: false,
    }
  }


  getMyInfo = async () => {
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'

    axios.get('/api/token/').then()

    await axios.get('/api/mypage/', {}).then((res) => {
      let userInfo = res.data.user
      let reportInfo = res.data.reports
      this.setState({
        username: userInfo.username,
        email: userInfo.email,
        summonerName: userInfo.summoner_name,
        mannerPoint: userInfo.manner_point,
        reportsForUser: reportInfo.reports_for_user,
        reportsByUser: reportInfo.reports_by_user,
        getResult: true,
      })
    })
  }

  onClickReportedLogs = () => {
    this.props.history.push('/reportedlogs')
  }

  onClickReportingLogs = () => {
    this.props.history.push('/reportinglogs')
  }

  render() {
    let reportingLogs = []
    let reportedLogs = []
    if (this.state.getResult === false) {
      this.getMyInfo()
    } else {
      reportingLogs = this.state.reportsByUser.map((report, reportIdx) => {
        return (
          <div className={`reportingLogs${reportIdx}`} key={reportIdx}>
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
      reportedLogs = this.state.reportsForUser.map((report, reportIdx) => {
        return (
          <div className = {`reportedLogs${reportIdx}`} key={reportIdx}>
            <DetailReportedLog
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
      <div className = 'myPage'>
        <div className = 'mypageTitle'>마이페이지</div>
        {this.state.getResult && (
          <div className = 'resultDisplay'>
            <div className = 'mypageContent'>
              <div style = {{ fontWeight: 'bold' }}>유저네임</div>
              {this.state.username}
              <br />
              <br />
              <div style = {{ fontWeight: 'bold' }}>이메일</div>
              {this.state.email}
              <br />
              <br />
              <div style = {{ fontWeight: 'bold' }}>소환사이름</div>
              {this.state.summonerName}
              <br />
              <br />
              <div style = {{ fontWeight: 'bold' }}>매너포인트</div>
              {this.state.mannerPoint}
            </div>
            <div style = {{ left: '38.5%' }}>
              <div className='recentText1'>Recent Reporting Logs</div>
              <div
                className = 'SeemoreText1'
                onClick = {() => this.onClickReportingLogs()}
              >
                더보기
              </div>
              <div>{reportingLogs}</div>
            </div>
            <div>
              <div className = 'recentText2'>Recent Reported Logs</div>
              <div
                className = 'SeemoreText2'
                onClick = {() => this.onClickReportedLogs()}
              >
                더보기
              </div>
              <div>{reportedLogs}</div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(My)