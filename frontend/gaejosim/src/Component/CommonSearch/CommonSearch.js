import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

import ResultView from "./ResultView/ResultView";
import TagView from "./TagView/TagView";

const CommonSearch = (props) => {
    const recent_results = this.props.recent_results.map((result) => {
        return (
            <ResultView recent_result = {result}/>
        )
    })
    
    return (
        <div className='commonSearch'>            
            <NavLink className = 'summoner_name' exact to = {`/singleSearchResult/${props.summoner_name}`}>
                {props.summoner_name}
            </NavLink>
            <text className = 'tier'>{props.tier}</text> 
            <text className = 'rank'>{props.rank}</text> 
            <div className = 'manner_point'>
                <img className = 'manner_point_img' alt = 'manner_point_img' src = '../../../public/images/imagename' />    
                <text className = 'manner_point_text'>{props.manner_point}</text>
            </div>
            <div className= 'recent_results'>
                {recent_results}
            </div>
            <div className = 'tag_values'>
                <TagView tags={props.tag_values}/>
            </div>
        </div>
    )
}

export default CommonSearch;