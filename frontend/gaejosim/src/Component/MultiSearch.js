import React, { Component } from 'react'
import axios from 'axios'

import CommonSearch from './CommonSearch/CommonSearch'

import './MultiSearch.css'


class MultiSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      summoners: props.summoners,
      matchers: [],
      getResult: false,
    }
  }

  getMatchers = async () => {

    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'

    axios.get('/api/token/').then()

    await axios.get('/api/search/', {
        params: {
          summoners: this.state.summoners,
        },
    })
      .then((res) => {
        console.log("getMatchers")
        this.setState({ matchers: res.data.matchers, getResult: true })
      })
  }

  // TODO: 한번만 콜하게 바꾸기
  render() {
    let matcherInfos
    if (this.state.getResult === false) {
      this.getMatchers()
    } else {
      matcherInfos = this.state.matchers.map((matcher, matcherIdx) => {
        return (
          <div className = {`summoner${matcherIdx+1}`} key = {matcherIdx+1}>
            <CommonSearch
              summonerName = {matcher.summoner_name}
              tier = {matcher.tier}
              rank = {matcher.rank}
              mannerPoint = {matcher.manner_point}
              tagValues = {matcher.tag_values}
              winLose = {matcher.win_lose}
              recentResults = {matcher.recent_result}
              num = {matcherIdx+1}
            />
          </div>
        )
      })
    }
    return (
      <div className='MultiSearch'>
        {!this.state.getResult && <div className='loading'>Loading...</div>}
        {this.state.getResult && (<div className='matchInfos'>{matcherInfos}</div>)}
      </div>
    )
  }
}

export default MultiSearch
