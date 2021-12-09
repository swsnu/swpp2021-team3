import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import './Searchbar.css'


class Searchbar extends Component {
    
    state = {
        searchInput : '',
    }

    onClickSearchButton = () => {
        // console.log("onClickSearchButton")
        let summonerArr = []
        if(this.state.searchInput !== '') {
            if(this.state.searchInput.includes('님이 로비에 참가했습니다.')) {
                summonerArr = this.state.searchInput.split('님이 로비에 참가했습니다.') 
                summonerArr = summonerArr.map((summoner) => summoner.replace(/\s/g, ''))    
                summonerArr.pop()
            }
            else {
                summonerArr = this.state.searchInput.split(',')
                summonerArr = summonerArr.map((summoner) => summoner.replace(/\s/g, ''))
            }
            let summonerNum = summonerArr.length
            if(summonerNum < 1) {
                alert('검색을 위해서는 한 명 이상의 소환사를 입력해야합니다.')
            }
            else if(summonerNum > 5) {
                alert('한 번에 최대 다섯 명의 소환사까지 검색할 수 있습니다.')
            }
            else {
               let summonerList = summonerArr.join('-')    
               this.props.history.push(`/searchresult/${summonerList}`)
            }
        }
        else {
            alert('검색을 위해서는 한 명 이상의 소환사를 입력해야합니다.')
        }
    }

    render() {
         
        return (
            <div className = 'Searchbar'>
                <textarea className = 'multiInput' type = 'text' 
                    placeholder = {`소환사1님이 로비에 참가했습니다.\n소환사2님이 로비에 참가했습니다.\n소환사3님이 로비에 참가했습니다.\n소환사4님이 로비에 참가했습니다.\n소환사5님이 로비에 참가했습니다.\n또는\n소환사1, 소환사2, 소환사3, 소환사4, 소환사5`}
                    value = {this.state.searchInput}
                    style={{fontSize: '11px'}}
                    onChange = {(event) => this.setState({ searchInput : event.target.value })} />
                <button className = 'search'
                    onClick = {() => this.onClickSearchButton()}>검색</button>
            </div>
        )
    }
}

export default withRouter(Searchbar)
