import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'

import './MyApologyCheck.css'


class MyApologyCheck extends Component {

  state = {
    reportID : this.props.reportID,
    apologyID : 0,
    content : '',
    verified: false,
    getApology: false,
  }

  getApology = async () => {
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'

    axios.get('/api/token/').then()
    
    await axios.get(`/api/reports/${this.props.reportID}/apology/`, {})
      .then((res) => {
        console.log("response data" , res.data)
        this.setState({apologyID: res.data.id, content: res.data.content, verified: res.data.verified, getApology: true})  
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  onClickGotoMyPageButton = () => {
    this.props.history.push('/my')
  }

  render() {
    if(this.state.getApology === false) {
      this.getApology()
    }
    return (
      <div className = 'myReportedLogsPage'>
        <div className = 'myApologyCheckTitle'>반성문 확인</div>
        {this.state.getApology === false && <div className='loading'>loading</div>}
        {this.state.getApology === true && <div className = 'ApologyInfo'>
          <div className = 'myApologyInfo'>
              [신고 리포트 번호]{this.state.reportID}
              [반성문 번호] {this.state.apologyID}
              [유효성 검증 여부] {this.state.verified}
          </div>
          <div>
            <div className='apology_check_box'>
              <div className='apology_check_text'>{this.state.content}</div>
            </div>
          </div>
          <button
            className = 'Apology_check_completed_button'
            onClick = {() => this.onClickGotoMyPageButton()}
          >
            확인
          </button>
          </div>  
        }
      </div>
    )
  }
}

export default withRouter(MyApologyCheck)
