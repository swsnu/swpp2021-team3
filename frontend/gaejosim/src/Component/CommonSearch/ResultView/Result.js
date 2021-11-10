import React from "react";

import champion_0 from "./champions/champion_0.png";
import champion_1 from "./champions/champion_1.png";
import champion_2 from "./champions/champion_2.png";
import champion_3 from "./champions/champion_3.png";
import champion_4 from "./champions/champion_4.png";
import champion_5 from "./champions/champion_5.png";
import champion_6 from "./champions/champion_6.png";
import champion_7 from "./champions/champion_7.png";
import champion_8 from "./champions/champion_8.png";
import champion_9 from "./champions/champion_9.png";
import lane_TOP from "./lanes/lane_top.png";
import lane_MID from "./lanes/lane_middle.png";
import lane_BOTTOM from "./lanes/lane_bottom.png";
import lane_JUNGLE from "./lanes/lane_jungle.png";
import lane_NONE from "./lanes/lane_none.png";

import './Result.css'


const Result = (props) => {
    let url_cham = ''
    let url_lane = ''
    url_cham = `./images/champion_${props.result.champion_id}.png`
    url_lane = `./images/lane_${props.result.lane}.png`
    let random_champion = props.result.champion_id % 10
    return (
        <div className='result'>    
            <b className='champion'>
                {(random_champion === 0 ) && <img className = 'championImg' alt = 'champion_img' src = {champion_0} />}
                {(random_champion === 1 ) && <img className = 'championImg' alt = 'champion_img' src = {champion_1} />}
                {(random_champion === 2 ) && <img className = 'championImg' alt = 'champion_img' src = {champion_2} />}
                {(random_champion === 3 ) && <img className = 'championImg' alt = 'champion_img' src = {champion_3} />}
                {(random_champion === 4 ) && <img className = 'championImg' alt = 'champion_img' src = {champion_4} />}
                {(random_champion === 5 ) && <img className = 'championImg' alt = 'champion_img' src = {champion_5} />}
                {(random_champion === 6 ) && <img className = 'championImg' alt = 'champion_img' src = {champion_6} />}
                {(random_champion === 7 ) && <img className = 'championImg' alt = 'champion_img' src = {champion_7} />}
                {(random_champion === 8 ) && <img className = 'championImg' alt = 'champion_img' src = {champion_8} />}
                {(random_champion === 9 ) && <img className = 'championImg' alt = 'champion_img' src = {champion_9} />}
                {/* <div className='champion_id'>{props.result.champion_id}</div> */}
            </b>
            <b className='lane'>
                {/* <img className = 'laneImg' alt = 'lane_img' src = {lane} /> */}
                {(props.result.lane === "TOP") && <img className = 'laneImg' alt = 'lane_img' src = {lane_TOP} />}
                {(props.result.lane === "MID") && <img className = 'laneImg' alt = 'lane_img' src = {lane_MID} />}
                {(props.result.lane === "BOTTOM") && <img className = 'laneImg' alt = 'lane_img' src = {lane_BOTTOM} />}
                {(props.result.lane === "JUNGLE") && <img className = 'laneImg' alt = 'lane_img' src = {lane_JUNGLE} />}
                {(props.result.lane === "NONE") && <img className = 'laneImg' alt = 'lane_img' src = {lane_NONE} />}
                {/* <div className='lane_text'>{props.result.lane}</div> */}
            </b>
            <b className='KDA'>
                {props.result.kills}/{props.result.deaths}/{props.result.assists}
                {/* <div className='K'>{props.result.kills}</div>
                <div className='D'>{props.result.deaths}</div>
                <div className='A'>{props.result.assists}</div>
                 */}
            </b>
            {/* <div className='win'>{props.result.win}</div> */}
        </div>
    )
}

export default Result;