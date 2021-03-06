import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import './DetailReportedLog.css'


class DetailReportedLog extends Component {
  
  onClickWriteApologyButton = (reportID) => {
    this.props.history.push(`/apologywrite/${reportID}`)
  }

  render() {
    return (
      <div className='DetailReportedLog'>
        <div className='DetailReportedLog_Box'>
          <div className='DetailReportedLog_Text'>
            [신고 대상 소환사] {this.props.reportedSummoner} [매너포인트] {this.props.evaluation}           
            <br />
            [태그] {this.props.tags} 
            {this.props.comments}
            {this.props.apology}
          </div>
          <img
            className = 'DetailReportedLog_Pencil'
            alt = 'pencil_img'
            src = {process.env.PUBLIC_URL + `/images/icons/icon-pencil.png`}
            onClick = {() => this.onClickWriteApologyButton(this.props.reportID)}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(DetailReportedLog)
