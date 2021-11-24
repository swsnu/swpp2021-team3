import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

import ResultView from "./ResultView/ResultView";
import TagView from "./TagView/TagView";


import tier_bronze from "./tiers/tier_BRONZE.png";
import tier_challenger from "./tiers/tier_CHALLENGER.png";
import tier_diamond from "./tiers/tier_DIAMOND.png";
import tier_gold from "./tiers/tier_GOLD.png";
import tier_grandmaster from "./tiers/tier_GRANDMASTER.png";
import tier_iron from "./tiers/tier_IRON.png";
import tier_master from "./tiers/tier_MASTER.png";
import tier_platinum from "./tiers/tier_PLATINUM.png";
import tier_silver from "./tiers/tier_SILVER.png";

import tagdiagram_1 from "./tagDiagrams/diagram_1.png";
import tagdiagram_2 from "./tagDiagrams/diagram_2.png";
import tagdiagram_3 from "./tagDiagrams/diagram_3.png";
import tagdiagram_4 from "./tagDiagrams/diagram_4.png";
import tagdiagram_5 from "./tagDiagrams/diagram_5.png";



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
            win_lose : props.win_lose,
            num: props.num,
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
        console.log(this.state.num)

        return (
            <div className='boxStyle1'> 
                {(this.state.num === 1) && <img className='diagram_1' src={tagdiagram_1} alt="tagdiagram_1" />}
                {(this.state.num === 2) && <img className='diagram_2' src={tagdiagram_2} alt="tagdiagram_2" />}
                {(this.state.num === 3) && <img className='diagram_3' src={tagdiagram_3} alt="tagdiagram_3" />}
                {(this.state.num === 4) && <img className='diagram_4' src={tagdiagram_4} alt="tagdiagram_4" />}
                {(this.state.num === 5) && <img className='diagram_5' src={tagdiagram_5} alt="tagdiagram_5" />}

                <NavLink className = 'nameStyle1' exact to = {`/singleSearchResult/${this.state.summoner_name}`}>
                    {this.state.summoner_name}
                </NavLink>
                {/* <text className = 'tier'>{this.state.tier}</text>  */}

                {(this.state.tier === "BRONZE") && <img className = 'tierImg' alt = 'tier_img' src = {tier_bronze} />}
                {(this.state.tier === "CHALLENGER") && <img className = 'tierImg' alt = 'tier_img' src = {tier_challenger} />}
                {(this.state.tier === "DIAMOND") && <img className = 'tierImg' alt = 'tier_img' src = {tier_diamond} />}
                {(this.state.tier === "GOLD") && <img className = 'tierImg' alt = 'tier_img' src = {tier_gold} />}
                {(this.state.tier === "GRANDMASTER") && <img className = 'tierImg' alt = 'tier_img' src = {tier_grandmaster} />}
                {(this.state.tier === "IRON") && <img className = 'tierImg' alt = 'tier_img' src = {tier_iron} />}
                {(this.state.tier === "MASTER") && <img className = 'tierImg' alt = 'tier_img' src = {tier_master} />}
                {(this.state.tier === "PLATINUM") && <img className = 'tierImg' alt = 'tier_img' src = {tier_platinum} />}
                {(this.state.tier === "SILVER") && <img className = 'tierImg' alt = 'tier_img' src = {tier_silver} />}
                
                {/* <text className = 'rank'>{this.state.rank}</text>  */}
                <div className = 'manner_point'>
                    {/* <img className = 'manner_point_img' alt = 'manner_point_img' src = '../../../public/images/imagename' />     */}
                    <text className = 'manner_point_text'>MP: {this.state.manner_point}</text>
                </div>

                <div className= 'recent_results'>
                    {resultViews}
                </div>
                {/* <div className = 'tag_values'>
                    <TagView tag_values={this.state.tag_values}/>
                </div> */}
            </div>
        )
    }
}   
    
export default CommonSearch;