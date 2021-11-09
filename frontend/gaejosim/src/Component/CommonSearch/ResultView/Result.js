import React from "react";

const Result = (props) => {
    return (
        <div className='result'>    
            <div className='KDA'>
                <div className='K'>{props.result.kills}</div>
                <div className='D'>{props.result.deaths}</div>
                <div className='A'>{props.result.assists}</div>
            </div>
            <div className='win'>{props.result.win}</div>
            <div className='champion'>
                <img className = 'champion_img' alt = 'champion_img' src = '../../../public/images/imagename' />
                <div className='champion_id'>{props.result.champion_id}</div>
            </div>
            <div className='lane'>
                <img className = 'lane_img' alt = 'lane_img' src = '../../../public/images/imagename' />
                <div className='lane_text'>{props.result.lane}</div>
            </div>
            
        </div>
    )
}

export default Result;