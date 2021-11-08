import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

const TeamMate = (props) => {
    return (
        <div className='MatchMate'>            
            <div className = 'champion'>
                {/* TODO: img 파일 디자인에서 넘어오면 Switch 문으로 Champion value별 이미지 랜딩 필요 */}
                <img className = 'champion-img' alt = 'champion-img' src = '../../../public/images/imagename' />
            </div>
            <NavLink className = 'summonerID' exact to = {`/singleSearchResult/${this.props.summonerID}`}  
                >{this.props.summonerID}</NavLink>
            <text className = 'KDA'>{this.props.KDA}</text>
            <text className = 'tier'>{this.props.tier}</text> 
            <div className = 'line'> 
                {/* TODO: img 파일 디자인에서 넘어오면 Switch 문으로 line value별 이미지 랜딩 필요 */}
                <img className = 'line-img' alt = 'line-img' src = '../../../public/images/imagename' />    
                <text className = 'line-text'>{this.props.line}</text>   
            </div>
        </div>
    )
}

export default TeamMate;