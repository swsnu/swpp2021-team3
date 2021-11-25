import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import './Searchbar.css'

// TODO: searchInput guide 문구 줄지 생각해보기. http://fow.kr/multi

class Searchbar extends Component {
    state = {
        searchInput : '',
        summonerList : '',
        summonerNum : 0,
    }
    
    onClickSearchButton = () => {
        if(this.state.summonerNum < 1) {
            alert('검색을 위해서는 한 명 이상의 소환사를 입력해야합니다.')
            this.props.history.push('/search')
        }
        else if(this.state.summonerNum > 5) {
            alert('한 번에 최대 다섯 명의 소환사까지 검색할 수 있습니다.')
            this.props.history.push('/search')
        }
        else {
            console.log(this.state.summonerList)
            this.props.history.push(`/searchresult/${this.state.summonerList}`)
            
        }
    }

    parseSummoner = () => {
        let summonerArr = []
        if(this.state.searchInput !== '') {
            if(this.state.searchInput.includes('님이 방에 참가했습니다.')) {
                summonerArr = this.state.searchInput.split('님이 방에 참가했습니다.') 
                summonerArr = summonerArr.map((summoner) => summoner.replace(/\s/g, ''))    
                summonerArr.pop()
            }
            else {
                summonerArr = this.state.searchInput.split(',')
                summonerArr = summonerArr.map((summoner) => summoner.replace(/\s/g, ''))
            }
            this.setState({ summonerNum: summonerArr.length, summonerList : summonerArr.join('-')})
            // this.state.summonerNum = summonerArr.length
            // this.state.summonerList = summonerArr.join('-')
        }
        else return
    }

    render() {
        return (
            <div className='Searchbar'>
                <textarea className='multiInput' type='text' 
                    placeholder=
                        {`소환사1님이 방에 참가했습니다.\n소환사2님이 방에 참가했습니다.\n소환사3님이 방에 참가했습니다.\n소환사4님이 방에 참가했습니다.\n소환사5님이 방에 참가했습니다.\n또는\n소환사1, 소환사2, 소환사3, 소환사4, 소환사5`}
                    value={this.state.searchInput}
                    onChange={(event) => this.setState({ searchInput : event.target.value })} />
                <button className='search'
                    onClick={() => { 
                    this.parseSummoner() 
                    this.onClickSearchButton()}}>검색</button>
            </div>
        )
    }
}

export default withRouter(Searchbar)