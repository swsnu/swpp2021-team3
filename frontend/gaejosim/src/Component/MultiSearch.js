import React, { Component } from "react";
import CommonSearch from "./CommonSearch/CommonSearch";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class MultiSearch extends Component {

    state = {
        summoners : '',
        matchers : []
    }

    static getDerivedStateFromProps = (props, state) => {
        state.summoners = props.summoners
    }

    getMatchers = () => {
        // Get data from API
        const url = `http://localhost:3000/api/search/`
        
        // TODO: Check axios - failed.
        // axios.get(url, {
        //     params : {
        //         type : 'multi',
        //         summoners : this.state.summoners
        //     }
        // })
        // .then(
        //     (response) => {
        //         // Check response.body
        //         console.log('response get from /api/search: ' + JSON.stringify(response))
        //     }
        // )
        // .catch( error => console.log(error))

        let responseBody = {
            matchers : [
                {
                    summoner_name : "name",
                    manner_point : "manner point (integer)",
                    tag_values : [1, 2, 3, 4, 5],
                    tier : "tier",
                    rank : "rank",
                    win_lose : ["W", "W", "W", "L", "L", "W", "W", "W", "L", "L"],
                    recent_result: [
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        }
                    ], 
                },
                {
                    summoner_name : "name",
                    manner_point : "manner point (integer)",
                    tag_values : [1, 2, 3, 4, 5],
                    tier : "tier",
                    rank : "rank",
                    win_lose : ["W", "W", "W", "L", "L", "W", "W", "W", "L", "L"],
                    recent_result: [
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        }
                    ], 
                },
                {
                    summoner_name : "name",
                    manner_point : "manner point (integer)",
                    tag_values : [1, 2, 3, 4, 5],
                    tier : "tier",
                    rank : "rank",
                    win_lose : ["W", "W", "W", "L", "L", "W", "W", "W", "L", "L"],
                    recent_result: [
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        }
                    ], 
                },
                {
                    summoner_name : "name",
                    manner_point : "manner point (integer)",
                    tag_values : [1, 2, 3, 4, 5],
                    tier : "tier",
                    rank : "rank",
                    win_lose : ["W", "W", "W", "L", "L", "W", "W", "W", "L", "L"],
                    recent_result: [
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        }
                    ], 
                },
                {
                    summoner_name : "name",
                    manner_point : "manner point (integer)",
                    tag_values : [1, 2, 3, 4, 5],
                    tier : "tier",
                    rank : "rank",
                    win_lose : ["W", "W", "W", "L", "L", "W", "W", "W", "L", "L"],
                    recent_result: [
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        },
                        {
                            kills : "kills(string)",
                            deaths : "deaths(string)",
                            assists : "assists(string)",
                            win : "win or lose(boolean)",
                            champion_id : "champion_id",
                            lane : "lane"
                        }
                    ], 
                }
            ]
        } 

        this.state.matchers = responseBody.matchers
        console.log(this.state.matchers)
    }

    render() {
        this.getMatchers()
        const matcherInfos = this.state.matchers.map((matcher) => {
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
        return (
            <div className='MultiSearch'>
                {matcherInfos}
            </div>
        )
    }
}

export default MultiSearch;