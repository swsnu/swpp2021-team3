import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'

import './MyApologyWrite.css'


class MyApologyWrite extends Component {

  state = {
    content: '',
  }

  postApologyData = async (reportID) => {
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'

    axios.get('/api/token/').then()
    
    await axios.post(`/api/reports/${this.props.reportID}/apology/`, {
      content : this.state.content
    })
      .then((res) => {
        // console.log(JSON.stringify(res.data))
        alert('성공적으로 제출하였습니다.\nML을 통해 작성한 내용을 분석합니다.')
        this.props.history.push('/my')
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  onClickSubmitButton = () => {
    this.postApologyData(this.props.reportID)
  }

  render() {
    return (
      <div className='myReportedLogsPage'>
        <text className='myApologyWriteTitle'>반성문 작성</text>
        <div>
          {/* <div className='apology_box1'>
            <text className='boxText1'>
              Recent Reported Log1 : ReportedSummoner
            </text>
            <text className='boxText2'>
              #tag1, #tag2, #tag3, Evalutation, Comment
            </text>
          </div> */}
        </div>
        <div className = 'apology_write_box'>
          <input
            className = 'apology_write_input'
            id = 'text'
            type = 'text'
            placeholder = {'반성문을 이곳에 작성하세요'}
            onChange = {(event) => this.setState({ content: event.target.value })}
          />
        </div>
        <button
          className='Apology_write_completed_button'
          onClick={() => this.onClickSubmitButton()}
        >
          제출
        </button>
      </div>
    );
  }
}

export default withRouter(MyApologyWrite)
