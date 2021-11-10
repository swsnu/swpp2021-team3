import React, { Component } from "react";
import { Redirect, Route } from 'react-router-dom';

// TODO: corner case 처리 (1) 이름 적지 않고 내기
// 질문: multiSearch api search call: 5명 안들어가도 처리 되는지?

class Searchbar extends Component {
    state = {
        summoner_name_single: '',
        summoner_names_multi: '',
        summoner_list: '',
        summoners_str : '',
        search_type: 'Single',
        click_search: false
    }
    
    onClickSearchButton = () => {
        this.setState({ click_search: true });
    }

    onClickSingleOrMultiButton = () => {
        if(this.state.search_type === 'Single') {
            this.setState({ search_type : 'Multi'});
        }
        else {
            this.setState({ search_type : 'Single'});
        }
    }

    parseSummoner = () => {
        if(this.state.search_type === 'Multi') {
            let summoners_arr = []
            if(this.state.summoner_names_multi != '') {
                summoners_arr = this.state.summoner_names_multi.split(' joined the room.')
                summoners_arr = summoners_arr.map((summoner) => (summoner).includes('\n')? (summoner).replace('\n', '') : (summoner))
            }
            if(summoners_arr.length === 6) {
                summoners_arr.pop()
                this.state.summoners_str = summoners_arr.join('-');
            } 
            else {
                alert('You have to put five summoners for multiSearch')
            }
        }
        else {
            if(this.state.summoner_name_single === '')
                alert('You cannot search summoner without typing any summonerName')
        }
    }

    render() {
        let redirect = null;
        let router = null;
        if (this.state.click_search) {
            if(this.state.search_type === 'Single') {
                if(this.state.summoner_name_single != '') {
                    redirect = <Redirect to = {`/singleSearchResult/${this.state.summoner_name_single}`} />
                }
                else {
                    this.setState({ click_search : false })
                    redirect = <Redirect to ={'/search'} />
                }
            } else {
                redirect = <Redirect to = {`/multiSearchResult/${this.state.summoners_str}`}/>
            }
        }
        return (
            <div className='Searchbar'>
                {router}
                {redirect}
                {(this.state.search_type==='Single') && 
                    <input style = {{
                        position: "absolute",
                        left: "18.96%",
                        right: "33.06%",
                        top: "40.11%",
                        bottom: "43.89%",
                        background: "white",
                        border: "2px solid #5F2EEA",
                        boxSizing: "border-box",
                        borderRadius: "16px"}}
                        type='text' placeholder='SummonerID' 
                        value={this.state.summoner_name_single}
                        onChange={(event) => this.setState({ summoner_name_single: event.target.value })} />}
                {(this.state.search_type==='Multi') && 
                    <textarea type='text' row='10'  
                        style = {{
                            position: "absolute",
                            left: "18.96%",
                            right: "33.06%",
                            top: "40.11%",
                            bottom: "43.89%",
                            // width: "691px",
                            // height: "144px",
                            background: "white",
                            border: "2px solid #5F2EEA",
                            boxSizing: "border-box",
                            borderRadius: "16px"}}
                        placeholder={`Summoner1 joined the room.\nSummoner2 joined the room.\nSummoner3 joined the room.\nSummoner4 joined the room.\nSummoner5 joined the room.`}
                        value={this.state.summoner_names_multi}
                        onChange={(event) => this.setState({ summoner_names_multi: event.target.value })} />}
                <button 
                    style={{
                        position: "absolute",
                        left: "68.47%",
                        right: "18.91%",
                        top: "40.11%",
                        bottom: "52.78%",
                        background: "#5F2EEA",
                        borderRadius: "16px",
                        color: "white",}}
                    onClick={() => this.onClickSingleOrMultiButton ()}>
                    {(this.state.search_type==='Single') ? 'Go to MultiSearch' : 'Go to SingleSearch'}
                </button>
                <button 
                    style={{
                        position: "absolute",
                        left: "68.47%",
                        right: "18.91%",
                        top: "49%",
                        bottom: "43.89%",
                        // width: "181.63px",
                        // height: "64px",
                        background: "#5F2EEA",
                        borderRadius: "16px",
                        color: "white",
                    }}
                    onClick={() => { 
                    this.parseSummoner() 
                    this.onClickSearchButton()}}>Search</button>
            </div>
        )
    }
}

export default Searchbar;