import React, {Component} from 'react';

import Header from '../Container/Header/Header';
import Searchbar from '../Component/Searchbar/Searchbar';
// import TagView from '../Component/CommonSearch/TagView/TagView';
// import CommonSearch from '../Component/CommonSearch/CommonSearch';
// import MatchInfo from '../Component/MatchInfo/MatchInfo';

class SingleSearchResultPage extends Component {
    
    // TODO: 우선 연결 작업을 위해 singleSearch api 구현되지 않은 부분은 주석처리해둠.
    state = {
        searchType : '',
        summonerName : '',
        manner : {
            manner_point : 38,
            tag : 5,
            comment : 'I think he is damn bad',
            tag_pentagon : 'img of tag_pentagon',
        },
        numMatches: 5,
    //     matches : [
    //         {
    //             match_result : 'A',
    //             matchers : [
    //                 // TEAM A
    //                 {
    //                     summoner_name : "summoner_name(String)",
    //                     tier : "tier(String)",
    //                     KDA : "kda(Integer)",
    //                     champion : "champion(String->Image)",
    //                     lane : "lane(String->Image)"
    //                 },
    //                 {
    //                     summoner_name : "summoner_name(String)",
    //                     tier : "tier(String)",
    //                     KDA : "kda(Integer)",
    //                     champion : "champion(String->Image)",
    //                     lane : "lane(String->Image)"
    //                 },
    //             ],
    //             kill_score : ["team A score", "team B score"],
    //             items : "items list",
    //             rune: "rune list",
    //             spell : "spell list",
    //         },
    //         {
    //             match_result : 'B',
    //             matchers : [
    //                 // TEAM A
    //                 {
    //                     summoner_name : "summoner_name(String)",
    //                     tier : "tier(String)",
    //                     KDA : "kda(Integer)",
    //                     champion : "champion(String->Image)",
    //                     lane : "lane(String->Image)"
    //                 },
    //                 {
    //                     summoner_name : "summoner_name(String)",
    //                     tier : "tier(String)",
    //                     KDA : "kda(Integer)",
    //                     champion : "champion(String->Image)",
    //                     lane : "lane(String->Image)"
    //                 },
    //                 {
    //                     summoner_name : "summoner_name(String)",
    //                     tier : "tier(String)",
    //                     KDA : "kda(Integer)",
    //                     champion : "champion(String->Image)",
    //                     lane : "lane(String->Image)"
    //                 },
    //                 {
    //                     summoner_name : "summoner_name(String)",
    //                     tier : "tier(String)",
    //                     KDA : "kda(Integer)",
    //                     champion : "champion(String->Image)",
    //                     lane : "lane(String->Image)"
    //                 },
    //                 {
    //                     summoner_name : "summoner_name(String)",
    //                     tier : "tier(String)",
    //                     KDA : "kda(Integer)",
    //                     champion : "champion(String->Image)",
    //                     lane : "lane(String->Image)"
    //                 },
    //                 {
    //                     summoner_name : "summoner_name(String)",
    //                     tier : "tier(String)",
    //                     KDA : "kda(Integer)",
    //                     champion : "champion(String->Image)",
    //                     lane : "lane(String->Image)"
    //                 },
    //                 {
    //                     summoner_name : "summoner_name(String)",
    //                     tier : "tier(String)",
    //                     KDA : "kda(Integer)",
    //                     champion : "champion(String->Image)",
    //                     lane : "lane(String->Image)"
    //                 },
    //                 {
    //                     summoner_name : "summoner_name(String)",
    //                     tier : "tier(String)",
    //                     KDA : "kda(Integer)",
    //                     champion : "champion(String->Image)",
    //                     lane : "lane(String->Image)"
    //                 },
    //                 {
    //                     summoner_name : "summoner_name(String)",
    //                     tier : "tier(String)",
    //                     KDA : "kda(Integer)",
    //                     champion : "champion(String->Image)",
    //                     lane : "lane(String->Image)"
    //                 },
    //                 {
    //                     summoner_name : "summoner_name(String)",
    //                     tier : "tier(String)",
    //                     KDA : "kda(Integer)",
    //                     champion : "champion(String->Image)",
    //                     lane : "lane(String->Image)"
    //                 },
    //             ],
    //             kill_score : ["team A score", "team B score"],
    //             items : "items list",
    //             rune: "rune list",
    //             spell : "spell list",
    //         },
    //     ],
        clickMoreMatch : false,
    }


    componentDidMount() {
        console.log('In componentDidMount!: SingleSearchPage')
    }
    
    // getMatchData = async() => {
        // Get data from API
        // const url = `http://localhost:3000/api/search/?type=${this.state.searchType}&?summoners=${this.state.summonerName}`;
        // console.log(url);
        // axios.get(url)
        // .then(
        //     (response) => {
        //         console.log('response get from /api/search/?type={ }&?summoners={}: ' + JSON.stringify(response))
        //         const reportNum = response.data.accumulated_reports;
        //         const preventNum = response.data.today_reports;
        //     }
        // )
        // .catch( error => console.log(error))
    // }
    
    onClickMoreMatchInfoButton = () => {
        this.setState({ numMatches : this.state.numMatches + 5})
    }
    
    render () {
        const path = this.props.location.pathname;
        const splitResult = path.split('/');
        console.log(splitResult);
        this.state.summonerName = splitResult[2];

        // const matches = this.state.matches.map((match) => {
        //     return (
        //         <MatchInfo matches={this.state.matches} />
        //     )
        // })
        
        return (
            <div className='SingleSearchResultPage'>
                <Header />
                <h2>SingleSearchResultPage</h2>
                <Searchbar />
                {/* tier={this.state.tier} recentHistory = {this.state.recentHistory} 추가하기  */}
                {/* <CommonSearch summonerID={this.state.summonerName} 
                    mannerPoint={this.state.manner.manner_point} 
                    taglist={this.state.manner.tag} 
                    comment = {this.state.manner.comment} 
                    tag_img={this.state.manner.tag_pentagon}
                    />
                {matches} */}
                <button className={moreMatchButton} onClick={() => this.onClickMoreMatchInfoButton()}>More match Info</button>
            </div>
        )
    }
}

export default SingleSearchResultPage;