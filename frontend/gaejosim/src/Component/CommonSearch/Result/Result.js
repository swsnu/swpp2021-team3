import React from 'react'

import './Result.css'

// TODO : champion image 함수 위의 줄로 바꾸고 champion 폴더에 이미지 넣기

const Result = (props) => {
  let random_champion = props.result.champion_id % 10
  let matchResult = props.winLose
  return (
    <div className = 'result'>
      <b className = 'champion'>
        {/* <img className = 'championImg' alt = 'champion_img' src = {process.env.PUBLIC_URL + `/images/champions/champion_${props.result.champion_id}.png`} />    */}
        <img
          className = 'championImg'
          alt = 'champion_img'
          src = {process.env.PUBLIC_URL + `/images/champions/champion_${random_champion}.png`}
        />
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
