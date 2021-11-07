import React, { Component } from "react";
import { NavLink, activeStyle } from 'react-router-dom';

const MatchMate = (props) => {
    return (
        <div className='MatchMate'>
            {/* TODO: img 파일 디자인에서 넘어오면 Switch 문으로 Champion value별 이미지 랜딩 필요 */}
            <img className = 'champion-img' alt = 'champion-img' src = '../../../public/images/imagename' />
            <NavLink exact to = {`/singleSearchResult/${this.props.summonerID}`}  
                activeStyle={activeStyle}>{this.props.summonerID}</NavLink>
        </div>
    )
}

export default MatchMate;