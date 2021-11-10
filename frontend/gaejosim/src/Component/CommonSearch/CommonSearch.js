import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

import ResultView from "./ResultView/ResultView";
import TagView from "./TagView/TagView";

import './CommonSearch.css';

 class CommonSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            summoner_name : props.summoner_name,
            tier : props.tier,
            rank : props.rank,
            manner_point : props.manner_point,
            tag_values : props.tag_values,
            recent_result : props.recent_result,
            win_lose : props.win_lose
        }
    }
    
    render() {
        const winLoseArr = this.state.win_lose
        let idx = -1;
        const resultViews = this.state.recent_result.map((result) => {
            idx = idx + 1;
            return (
                <ResultView win_lose = {winLoseArr[idx]} recent_result = {result}/>
            )
        })
        return (
            <div className='commonSearch'>            
                <NavLink className = 'summoner_name' exact to = {`/singleSearchResult/${this.state.summoner_name}`}>
                    {this.state.summoner_name}
                </NavLink>
                <text className = 'tier'>{this.state.tier}</text> 
                <text className = 'rank'>{this.state.rank}</text> 
                <div className = 'manner_point'>
                    <img className = 'manner_point_img' alt = 'manner_point_img' src = '../../../public/images/imagename' />    
                    <text className = 'manner_point_text'>{this.state.manner_point}</text>
                </div>
                <div className= 'recent_results'>
                    {resultViews}
                </div>
                <div className = 'tag_values'>
                    <TagView tag_values={this.state.tag_values}/>
                </div>
            </div>
        )
    }
}   
    
export default CommonSearch;