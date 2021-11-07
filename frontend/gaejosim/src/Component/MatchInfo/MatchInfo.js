import React, { Component } from "react";

import MatchMateList from './MatchMateList';
import TeamMateList from './TeamMateList';

class MatchInfo extends Component {
    state = {
        matchMateList : this.props.matchMatelist,
        teamMateList : this.props.teamMateList,
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


    render() {
        return (
            <div className = 'MatchInfo'>
                <div className='userInfo'>
                    <text className='KDA'>{this.props.KDA}</text>
                    {/* TODO: img 파일 디자인에서 넘어오면 Switch 문으로 Champion value별 이미지 랜딩 필요 */}
                    <img className = 'champion-img' alt = 'champion-img' src = '../../../public/images/imagename' />
                    <text className='killScore'>{this.props.killScore}</text>
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
                    <TeamMateList list={this.teamMateList}/>}
                <MatchMateList list={this.matchMateList}/>
                <button className = 'detail-button' onClick={() => this.onClickDetailButton()}>
                    {(!this.state.clickDetail) ? 'More Detail' : 'Close Detail'}
                    </button>
            </div>
        )
    }
}

export default MatchInfo;