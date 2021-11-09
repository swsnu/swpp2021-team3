import React, { Component } from "react";
import { Redirect, Route } from 'react-router-dom';

// TODO: corner case 처리 (1) 이름 적지 않고 내기


class Searchbar extends Component {
    state = {
        summonerName: '',
        summonerList: '',
        searchType: 'Single',
        clickSearch: false
    }
    
    onClickSearchButton = () => {
        this.setState({ clickSearch: true });
    }

    onClickSingleOrMultiButton = () => {
        if(this.state.searchType === 'Single') {
            this.setState({ searchType : 'Multi'});
        }
        else {
            this.setState({ searchType : 'Single'});
        }
    }

    // TODO: MultiSearch parsing 구현하기: 한국어로 할건지 영어로 할건지 논의
    // https://regexr.com/
    parseSummoner = () => {
        if(this.state.searchType === 'Multi') {
            let summonerArr = []
            let summonerStr =''
            if(this.state.summonerList) {
                summonerArr = this.state.summonerList.split(' joined the room\n.')
            }
            if(summonerArr.length === 6) {
                summonerArr.pop()
                summonerStr = summonerArr.join('-');
            } 
            else {
                alert('You have to put five summoners for multiSearch')
            }
            this.setState({ summonerList : summonerStr })
        }
        else {
            if(this.state.summonerName === '')
                alert('You cannot search summoner without typing summonerName')
        }
    }

    render() {
        let redirect = null;
        let router = null;
        if (this.state.clickSearch) {
            if(this.state.searchType === 'Single') {
                if(this.state.summonerName != '') {
                    redirect = <Redirect to = {`/singleSearchResult/${this.state.summonerName}`} />
                }
                else {
                    this.setState({ clickSearch : false})
                    redirect = <Redirect to ={'/search'} />
                }
            } else {
                // SummonerList는 Summoner1-Summoner2-Summoner3-Summoner4-Summoner5 형태로 전달됨.
                redirect = <Redirect to = {`/multiSearchResult/${this.state.summonerList}`}/>
            }
        }
        return (
            <div className='Searchbar'>
                {router}
                {redirect}
                {(this.state.searchType==='Single') && 
                    <input type='text' placeholder='SummonerID' 
                        value={this.state.summonerName}
                        onChange={(event) => this.setState({ summonerName: event.target.value })} />}
                {(this.state.searchType==='Multi') && 
                    <textarea type='text' row='10'  
                        placeholder={`Summoner1 joined the room.\nSummoner2 joined the room.\nSummoner3 joined the room.\nSummoner4 joined the room.\nSummoner5 joined the room.`}
                        value={this.state.summonerList}
                        onChange={(event) => this.setState({ summonerList: event.target.value })} />}
                <button onClick={() => this.onClickSingleOrMultiButton ()}>
                    {(this.state.searchType==='Single') ? 'Go to MultiSearch' : 'Go to SingleSearch'}
                </button>
                <button onClick={() => { 
                    this.parseSummoner() 
                    this.onClickSearchButton()}}>Search</button>
            </div>
        )
    }
}

export default Searchbar;