import React from 'react'

import './Result.css'

const Result = (props) => {
  let matchResult = props.winLose
  return (
    <div className = 'result'>
      <b className = 'champion'>
        <img className = 'championImg' alt = 'champion_img' src = {process.env.PUBLIC_URL + `/images/champions/champion_${props.result.champion_id}.png`} />   
      </b>
      <b className = 'lane'>
        <img className = 'laneImg'
          alt = 'lane_img'
          src = {process.env.PUBLIC_URL + `/images/lanes/lane_${props.result.lane}.png`}
        />
      </b>
      <b className='KDA' id={matchResult}>
        {props.result.kills}/{props.result.deaths}/{props.result.assists}
      </b>
    </div>
  )
}

export default Result
