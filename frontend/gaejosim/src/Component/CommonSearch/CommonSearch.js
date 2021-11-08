import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

import TagView from "./TagView/TagView";

const CommonSearch = (props) => {
    return (
        <div className='commonSearch'>            
            <NavLink className = 'summonerIDh' exact to = {`/singleSearchResult/${props.summonerID}`}  
                >{props.summonerID}</NavLink>
            <text className = 'tier'>{props.tier}</text> 
            <div className ='mannerPoint'>
                <img className = 'mannerPoint-img' alt = 'mannerPoint-img' src = '../../../public/images/imagename' />    
                <text className = 'mannerPoint-text'>{props.mannerPoint}</text>
            </div>
            <TagView tags={props.taglist}/>
            {/* <div className = 'recentGameHistory'> 
                {/* TODO: img 파일 디자인에서 넘어오면 Switch 문으로 line value별 이미지 랜딩 필요 */}
                {/* <text className = 'recentHistory-text'>{this.props.recentHistory}</text>
                <img className = 'recentHistory-img' alt = 'history-img' src = '../../../public/images/imagename' />    
            </div> */} 
        </div>
    )
}

export default CommonSearch;