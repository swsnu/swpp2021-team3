import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import './ReportingLog.css'

class ReportingLog extends Component {
  
  state = {
    deleted: false
  }

  deleteReportingLog = async (reportID) => {
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'

    axios.get('/api/token/').then()

    await axios.delete(`/api/reports/${reportID}/`, {})
      .then((res) => {
        this.setState({deleted: true})
        alert('과거 작성하였던 리포트가 성공적으로 삭제되었습니다.')
      })
      .catch((error) => {
        alert(error.response.data.error)
      })
  }

  onClickDeleteButton = (reportID) => {
    this.deleteReportingLog(reportID)
  }

  onClickCheckApologyButton = (reportID) => {
    this.props.history.push(`/apologycheck/${reportID}`)
  }

  render() {
    return (
      <div className = 'ReportingLog'>
        <div className = 'ReportingLog_Box'>
          <div className = 'ReportingLog_Text'>
            [신고 대상 소환사] {this.props.reportedSummoner} [매너포인트] {this.props.evaluation}           
            <br />
            [태그] {this.props.tags} 
            {/* ,[한줄평] {this.props.comments} */}
          </div>
          {/* this.props.apology && 에 따라 visibility 설정하기 */}
          <img
            className='ReportingLog_Paper'
            alt='paper_img'
            src={process.env.PUBLIC_URL + `/images/icons/icon-paper.png`}
            onClick={() => this.onClickCheckApologyButton(this.props.reportID)}
          />
          <img
            className='ReportingLog_Delete'
            alt='delete_img'
            src={process.env.PUBLIC_URL + `/images/icons/icon-delete.png`}
            onClick={() => this.onClickDeleteButton(this.props.reportID)}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(ReportingLog)

