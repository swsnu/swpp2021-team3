import axios from "axios";
import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
// import ReportAuth from '../ReportAuth/ReportAuth';
import Select from 'react-select';

//todo: axios post

class ReportAction extends React.Component {
    state = {
        curr_user: '',
        tag: [],
        comment: '',
        reported_summoner: '서울대',
        evaluation: 0,
        clickCancel: false,
        clickSubmit: false,
        clickTag1_1: false,
        clickTag1_2: false,
        clickTag2_1: false,
        clickTag2_2: false,
        clickTag3_1: false,
        clickTag3_2: false,
        clickTag4_1: false,
        clickTag4_2: false,
        clickTag5_1: false,
        clickTag5_2: false,
        clickTags: []
    };


    onClickCancelButton = () => {
        this.setState({ clickCancel: true });
    }

    onClickSubmitButton = () => {
        this.postReportData()
        this.setState({ clickSubmit: true })
    }

    postReportData = () => {

        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';

        let tagList = [this.state.clickTag1_1, this.state.clickTag1_2, this.state.clickTag2_1, this.state.clickTag2_2,
        this.state.clickTag3_1, this.state.clickTag3_2, this.state.clickTag4_1, this.state.clickTag4_2, this.state.clickTag5_1, this.state.clickTag5_2];

        tagList = tagList.filter(tag => { return tag })
        this.state.clickTags = tagList
        console.log(this.state.clickTags)
        console.log(this.state.evaluation)

        let tagListString = tagList.join(',');

        axios.get('/api/token/').then(
            console.log("set token")
        )

        axios.post('/api/signin/', {
            "username": "test1",
            "password": "password"
        })
            .then(
                axios.post('/api/reports/', {
                    "name": this.state.reported_summoner,
                    "evaluation": parseInt(this.state.evaluation),
                    "tag": tagListString,
                    "comment": this.state.comment
                })
                    .then((response) => {
                        console.log('response get from /api/reports/auth: ' + JSON.stringify(response))
                    }
                    )
                    .catch(err => {
                        console.log(err)
                    })
            )
            // "User is not logged in."
            .catch((error) => {
                console.log(error)
                alert(error)
            })

    }

    onClickTag1_1Button = () => {
        if (this.state.clickTag1_1 === false) this.setState({ clickTag1_1: 'tag1_1' })
        else this.setState({ clickTag1_1: false })
    }


    onClickTag1_2Button = () => {
        if (this.state.clickTag1_2 === false) this.setState({ clickTag1_2: 'tag1_2' })
        else this.setState({ clickTag1_2: false })
    }

    onClickTag2_1Button = () => {
        if (this.state.clickTag2_1 === false) this.setState({ clickTag2_1: 'tag2_1' })
        else this.setState({ clickTag2_1: false })
    }

    onClickTag2_2Button = () => {
        if (this.state.clickTag2_2 === false) this.setState({ clickTag2_2: 'tag2_2' })
        else this.setState({ clickTag2_2: false })
    }

    onClickTag3_1Button = () => {
        if (this.state.clickTag3_1 === false) this.setState({ clickTag3_1: 'tag3_1' })
        else this.setState({ clickTag3_1: false })
    }

    onClickTag3_2Button = () => {
        if (this.state.clickTag3_2 === false) this.setState({ clickTag3_2: 'tag3_2' })
        else this.setState({ clickTag3_2: false })
    }

    onClickTag4_1Button = () => {
        if (this.state.clickTag4_1 === false) this.setState({ clickTag4_1: 'tag4_1' })
        else this.setState({ clickTag4_1: false })
    }

    onClickTag4_2Button = () => {
        if (this.state.clickTag4_2 === false) this.setState({ clickTag4_2: 'tag4_2' })
        else this.setState({ clickTag4_2: false })
    }

    onClickTag5_1Button = () => {
        if (this.state.clickTag5_1 === false) this.setState({ clickTag5_1: 'tag5_1' })
        else this.setState({ clickTag5_1: false })
    }

    onClickTag5_2Button = () => {
        if (this.state.clickTag5_2 === false) this.setState({ clickTag5_2: 'tag5_2' })
        else this.setState({ clickTag5_2: false })
    }

    render() {
        let redirect = null;

        if (this.state.clickCancel) {
            redirect = <Redirect to={`/`} />
        }
        if (this.state.clickSubmit) {
            redirect = <Redirect to={`/`} />
        }

        return (
            <div className='ReportAction'>

                <div className='Process'>
                    <h3>1. Choose Manner Point of reporting player.</h3>
                    <text>Select a number between 1 to 10</text>
                    <input
                        type='number'
                        placeholder="Evaluate Manner Point of reporting player"
                        max='10'
                        min='1'
                        value={this.state.evaluation}
                        onChange={(event) => this.setState({ evaluation: event.target.value })} />
                </div>
                <div className='Process'>
                    <h3>2.Choose all Tags appropriate to describe behavior of reporting player if you want.</h3>
                    <div className='tags'>
                        <button onClick={() => this.onClickTag1_1Button()}>
                            {(this.state.clickTag1_1 !== false) ? '언행 : [과격한 언행] V' : '언행 : [과격한 언행]'}
                        </button>
                        <button onClick={() => this.onClickTag1_2Button()}>
                            {(this.state.clickTag1_2 !== false) ? '언행 : [비속어 사용] V' : '언행 : [비속어 사용]'}
                        </button>
                        <button onClick={() => this.onClickTag2_1Button()}>
                            {(this.state.clickTag2_1 !== false) ? '게임 폭파 : [고의성 게임 던짐] V' : '게임 폭파 : [고의성 게임 던짐]'}
                        </button>
                        <button onClick={() => this.onClickTag2_2Button()}>
                            {(this.state.clickTag2_2 !== false) ? '게임 폭파 : [탈주/닷지] V' : '게임 폭파 : [탈주/닷지]'}
                        </button>
                        <button onClick={() => this.onClickTag3_1Button()}>
                            {(this.state.clickTag3_1 !== false) ? '게임 시작 전 : [대리 게임] V' : '게임 시작 전 : [대리 게임]'}
                        </button>
                        <button onClick={() => this.onClickTag3_2Button()}>
                            {(this.state.clickTag3_2 !== false) ? '게임 시작 전 : [픽 상황 갑질] V' : '게임 시작 전 : [픽 상황 갑질]'}
                        </button>
                        <button onClick={() => this.onClickTag4_1Button()}>
                            {(this.state.clickTag4_1 !== false) ? '게임 중 : [cs 스틸] V' : '게임 중 : [cs 스틸]'}
                        </button>
                        <button onClick={() => this.onClickTag4_2Button()}>
                            {(this.state.clickTag4_2 !== false) ? '게임 중 : [정치] V' : '게임 중 : [정치]'}
                        </button>
                        <button onClick={() => this.onClickTag5_1Button()}>
                            {(this.state.clickTag5_1 !== false) ? '게임 중 : [방관] V' : '게임 중 : [방관]'}
                        </button>
                        <button onClick={() => this.onClickTag5_2Button()}>
                            {(this.state.clickTag5_2 !== false) ? '라인 거부 : [라인 스왑] V' : '라인 거부 : [라인 스왑]'}
                        </button>
                        
                    </div>
                </div>
                <div className='Process'>
                    <h3>4. Write down Comment if you want</h3>
                    <input
                        placeholder="Enter Comments on reported player if you want"
                        value={this.state.comment}
                        onChange={(event) => this.setState({ comment: event.target.value })} />
                </div>
                <button onClick={() => this.onClickSubmitButton()}>Submit</button>
                <button onClick={() => this.onClickCancelButton()}>Cancel</button>
            </div>
        )
    }

}

export default ReportAction;