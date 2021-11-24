import React, { Component } from "react";
import CommonSearch from "./CommonSearch/CommonSearch";
import axios from 'axios';

import './MultiSearch.css';

// TODO: api call 시 type 요소 뺄지 논의하기

class MultiSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            summoners : props.summoners,
            matchers : [],
            getResult : false
        }
    }

    
    getMatchers = async () => {
        console.log("call of getMatchers")
        console.log("state of getResult", this.state.getResult)

        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';

        axios.get('/api/token/').then(
        )
        
        const url = 'http://localhost:3000/api/search/'
        console.log("call axios.get request")
        const response = await axios.get(url, {
                    params : {
                        type : 'multi',
                        summoners : this.state.summoners
                    }
        }) 

        this.setState({
            matchers : response.data.matchers,
            getResult : true
        })
        
    }

    render() {
        let matcherInfos
        if(this.state.getResult === false) {
            this.getMatchers()
        }
        else {
            let idx = 0
            matcherInfos = this.state.matchers.map((matcher) => {
                idx = idx + 1
                let summonerIdx = 'summoner' + idx
                return (
                <div className = {summonerIdx}>
                    <CommonSearch 
                        summonerName = {matcher.summoner_name} 
                        tier = {matcher.tier}
                        rank = {matcher.rank}
                        mannerPoint = {matcher.manner_point}
                        tagValues = {matcher.tag_values}
                        winLose = {matcher.win_lose}
                        recentResults = {matcher.recent_result}
                        num = {idx}
                    />
                </div>
                )
            }) 
        }
        return (
            <div className='MultiSearch'>
                {(!this.state.getResult) && <div className = 'loading'>loading...</div>}
                {(this.state.getResult) && <div className='matchInfos'>{matcherInfos}</div>}
            </div>
        )
    }
}

export default MultiSearch;