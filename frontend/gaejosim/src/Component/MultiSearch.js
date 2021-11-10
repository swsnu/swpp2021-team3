import React, { Component } from "react";
import CommonSearch from "./CommonSearch/CommonSearch";
import axios from 'axios';


class MultiSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            summoners : props.summoners,
            matchers : [],
            getResult : false
        }
    }

    // Get five matchers information by /api/search/ call.
    getMatchers = async () => {
        console.log("call of getMatchers")
        console.log("state of getResult", this.state.getResult)

        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';

        axios.get('/api/token/').then(
        )
        
        const url = `http://localhost:3000/api/search/`
        console.log("call get request")
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
            console.log("call getMatchers")
            this.getMatchers()
        }
        else {
            console.log("finished")
            matcherInfos = this.state.matchers.map((matcher) => {
                return (
                <CommonSearch summoner_name = {matcher.summoner_name} 
                    tier = {matcher.tier}
                    rank = {matcher.rank}
                    manner_point = {matcher.manner_point}
                    tag_values = {matcher.tag_values}
                    win_lose = {matcher.win_lose}
                    recent_result = {matcher.recent_result}
                />
                )
            }) 
        }
        return (
            <div className='MultiSearch'>
                {(!this.state.getResult) && <h3>loading</h3>}
                {(this.state.getResult) && <div className='matchInfos'>{matcherInfos}</div>}
            </div>
        )
    }
}

export default MultiSearch;