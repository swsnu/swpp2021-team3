import React, { Component } from "react";

import MatchMateList from './MatchMateList';
import TeamMateList from './TeamMateList';

class MatchInfo extends Component {

    // TODO: back에서 정보 정리해서 주기 : teamMateList, matchMateList 정리
    state = {
        match: this.props.match,
        // matchMateList : this.props.matchMatelist,
        // teamMateList : this.props.teamMateList,
        clickDetail : false 
    }
    
    onClickSingleOrMultiButton = () => {
        if(this.state.clickDetail === false) {
            this.setState({ clickDetail : true });
        }
        else {
            this.setState({ clickDetail : false });
        }
    }

    componentDidMount() {
        console.log('In componentDidMount!: MatchInfo')
    }

    render() {
        console.log(this.state.match);
        // const matchMate = this.state.match.matchers
        // const teamMate = this.state.match.matchers

        // console.log(matchMate);
        // console.log(teamMate);
        return (
            <div className = 'MatchInfo'>
                {/* <div className='userInfo'>
                    {/* <text className='KDA'>{this.state.match.kill-score}</text> */}
                    {/* TODO: img 파일 디자인에서 넘어오면 Switch 문으로 Champion value별 이미지 랜딩 필요 */}
                    {/* <img className = 'champion-img' alt = 'champion-img' src = '../../../public/images/imagename' />
                    <text className='killScore'>{this.state.match.killScore}</text>
                    <div className = 'item-img-list'>
                        <img className = 'item-img1' alt = 'item-img' src = '../../../public/images/imagename' />
                        <img className = 'item-img2' alt = 'item-img' src = '../../../public/images/imagename' />
                        <img className = 'item-img3' alt = 'item-img' src = '../../../public/images/imagename' />    
                    </div>
                    <div className = 'rune-img-list'>
                        <img className = 'rune-img1' alt = 'rune-img' src = '../../../public/images/imagename' />
                        <img className = 'rune-img2' alt = 'rune-img' src = '../../../public/images/imagename' />
                        <img className = 'rune-img3' alt = 'rune-img' src = '../../../public/images/imagename' />
                    </div>
                    <div className = 'spell-img-list'>
                        <img className = 'spell-img1' alt = 'spell-img' src = '../../../public/images/imagename' />
                        <img className = 'spell-img2' alt = 'spell-img' src = '../../../public/images/imagename' />
                        <img className = 'spell-img3' alt = 'spell-img' src = '../../../public/images/imagename' />
                    </div>
                </div>
                {(this.state.clickDetail) && 
                    <TeamMateList list={matchMate}/>}
                <MatchMateList list={teamMate}/>
                <button className = 'detail-button' onClick={() => this.onClickDetailButton()}>
                    {(!this.state.clickDetail) ? 'More Detail' : 'Close Detail'}
                    </button> */} 
            </div>
        )
    }
}

export default MatchInfo;