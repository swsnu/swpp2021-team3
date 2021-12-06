import React, { Component } from 'react'

import './DetailReportingLog.css'

class DetailReportingLog extends Component {
  
  

  render() {
    return (
      <div className = 'DetailReportingLog'>
        <div className = 'DetailReportingLog_Box'>
          <div className = 'DetailReportingLog_Text'>
            [신고 대상 소환사] {this.props.reportedSummoner} [매너포인트] {this.props.evaluation}           
            <br />
            [태그] {this.props.tags} 
            {/* {this.props.comments} */}
          </div>
          {/* this.props.apology && 에 따라 visibility 설정하기 */}
          <img
            className='DetailReportingLog_Paper'
            alt='paper_img'
            src={process.env.PUBLIC_URL + `/images/icons/icon-paper.png`}
            // onClick={() => this.props.clicked}
          />
          <img
            className='DetailReportingLog_Delete'
            alt='delete_img'
            src={process.env.PUBLIC_URL + `/images/icons/icon-delete.png`}
            // onClick={() => this.props.clicked}
          />
        </div>
      </div>
    );
  }
}

export default DetailReportingLog
