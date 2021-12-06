import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'

import './Statistic.css'

class Statistic extends Component {
  
  state = {
    getResult: false,
    numReports: 100,
    numPrevents: 5,
    numToAnswer: 0,
  }

  componentDidMount() {
    this.getStatistics()
  }

  getStatistics = async () => {
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'

    axios.get('/api/token/').then()

    await axios.get('/api/home/', {})
      .then((res) => {
        this.setState({numReports: res.data.accumulated_reports, numPrevents: res.data.today_reports, numToAswer: res.data.not_answered_reports, getResult: true})
    })
  }

  render() {
    return (
      <div className='Statistic'>
        {this.state.getResult && <div className = 'AllReports'>All Reports</div>}
        {this.state.getResult && (<div className = 'NumReportsContainer'>
          <div className = 'NumReports'>{this.state.numReports}</div>
        </div>)}
        {this.state.getResult && (<div className = 'TodayReports'>Today Reports</div>)}
        {this.state.getResult && (<div className = 'NumPreventsContainer'>
          <div className = 'NumPrevents'>{this.state.numPrevents}</div>
        </div>)}
        {/* {this.props.storedisLogin && this.state.numToAnswer !== 0 &&  */}
        {this.props.storedisLogin && 
        (<div className = 'NumToAnser'> 
          <div className = 'NumToAnswerText'>numToAnswer</div>
          <div className = 'NumToAnswerContainer'>
            <NavLink to = '/my'>
              <div className='NumToAnswer'>{this.state.numToAnswer}</div>
            </NavLink>
          </div>
        </div>)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    storedisLogin: state.userR.login,
  }
}

export default connect(mapStateToProps, null)(withRouter(Statistic))
