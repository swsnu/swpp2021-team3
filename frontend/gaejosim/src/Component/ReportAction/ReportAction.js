import axios from "axios";
import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import './ReportAction.css';

// TODO : Check here if you want to how to visualize MUI : https://mui.com/components/slider/

class ReportAction extends Component {

    constructor(props) {
        super(props)
        this.state = {
            reported_summoner: "2625", // props.reported_summoner,
            comment: '',
            evaluation: 50,
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
            clickTags: [],
            clickCancel: false,
            clickSubmit: false,
        }
    }


    onClickCancelButton = () => {
        this.setState({ clickCancel: true });
    }

    onClickSubmitButton = () => {
        let tagList = [this.state.clickTag1_1, this.state.clickTag1_2, this.state.clickTag2_1, this.state.clickTag2_2,
        this.state.clickTag3_1, this.state.clickTag3_2, this.state.clickTag4_1, this.state.clickTag4_2, this.state.clickTag5_1, this.state.clickTag5_2];
        tagList = tagList.filter(tag => { return tag })
        this.state.clickTags = tagList

        console.log(this.state.clickTags)
        if (this.state.clickTags.length === 0) {
            alert('You should check at least one tag')
            this.setState({ clickSubmit: false })
        }
        else {
            this.postReportData()
            this.setState({ clickSubmit: true })
        }
    }

    // Post auth by /api/reports/auth/ call.
    postReportData = () => {

        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';


        console.log(this.state.evaluation)
        console.log(this.state.reported_summoner)

        let tagListString = this.state.clickTags.join(',');

        axios.get('/api/token/').then(
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


    onClickTagButton = (tag) => {
        switch (tag) {
            case "1_1":
                this.setState({clickTag1_1 : !this.state.clickTag1_1})
                break
            case "1_2":
                this.setState({clickTag1_2 : !this.state.clickTag1_2})
                break
            case "2_1":
                this.setState({clickTag2_1 : !this.state.clickTag2_1})
                break
            case "2_2":
                this.setState({clickTag2_2 : !this.state.clickTag2_2})
                break
            case "3_1":
                this.setState({clickTag3_1 : !this.state.clickTag3_1})
                break
            case "3_2":
                this.setState({clickTag3_2 : !this.state.clickTag3_2})
                break
            case "4_1":
                this.setState({clickTag4_1 : !this.state.clickTag4_1})
                break
            case "4_2":
                this.setState({clickTag4_2 : !this.state.clickTag4_2})
                break
            case "5_1":
                this.setState({clickTag5_1 : !this.state.clickTag5_1})
                break
            case "5_2":
                this.setState({clickTag5_2 : !this.state.clickTag5_2})
                break
            default:
                return
        }
        return
    }


    render() {
        let redirect

        if (this.state.clickCancel) {
            redirect = <Redirect to={`/`} />
        }
        if (this.state.clickSubmit) {
            redirect = <Redirect to={`/`} />
        }

        const marks = [
            {
                value: 0,
                label: '0점',
              },
            {
                value: 100,
                label: '100점',
            },
        ]

        return (
            <div className='ReportAction'>
                {redirect}
                <div className='Box1'>
                    <h3 id="MannerPoint">1. Choose Manner Point of reporting player.</h3>
                    <div id="MannerPointDescription">Select a number between 0 to 100</div>
                    <Box 
                        id="MannerPointInput"
                        sx={{ width: 700 }}>
                        <Slider
                            aria-label="Temperature"
                            defaultValue={50}
                            valueLabelDisplay="auto"
                            step={10}
                            marks={marks}
                            min={0}
                            max={100}
                            color="secondary"
                            onChange = {(event) => this.setState({ evaluation: event.target.value })}
                        />
                        <div className="evaluation">{this.state.evaluation}점</div>
                    </Box>
                </div>
                <div className='Box2'>
                    <h3 id="Tag">2.Choose all Tags appropriate to describe behavior of reporting player if you want.</h3>
                    <div className='tags'>
                        <button className="Tag1_1Button" id="button" onClick={() => this.onClickTagButton("1_1")}>
                            {(this.state.clickTag1_1 !== false) ? '과격한 언행 V' : '과격한 언행'}
                        </button>
                        <button className="Tag1_2Button" id="button" onClick={() => this.onClickTagButton("1_2")}>
                            {(this.state.clickTag1_2 !== false) ? '비속어 사용 V' : '비속어 사용'}
                        </button>
                        <button className="Tag2_1Button" id="button" onClick={() => this.onClickTagButton("2_1")}>
                            {(this.state.clickTag2_1 !== false) ? '고의성 게임 던짐 V' : '고의성 게임 던짐'}
                        </button>
                        <button className="Tag2_2Button" id="button" onClick={() => this.onClickTagButton("2_1")}>
                            {(this.state.clickTag2_2 !== false) ? '탈주/닷지 V' : '탈주/닷지'}
                        </button>
                        <button className="Tag3_1Button" id="button" onClick={() => this.onClickTagButton("3_1")}>
                            {(this.state.clickTag3_1 !== false) ? '대리 게임 V' : '대리 게임'}
                        </button>
                        <button className="Tag3_2Button" id="button" onClick={() => this.onClickTagButton("3_2")}>
                            {(this.state.clickTag3_2 !== false) ? '픽 상황 갑질 V' : '픽 상황 갑질'}
                        </button>
                        <button className="Tag4_1Button" id="button" onClick={() => this.onClickTagButton("4_1")}>
                            {(this.state.clickTag4_1 !== false) ? 'cs 스틸 V' : 'cs 스틸'}
                        </button>
                        <button className="Tag4_2Button" id="button" onClick={() => this.onClickTagButton("4_2")}>
                            {(this.state.clickTag4_2 !== false) ? '정치 V' : '정치'}
                        </button>
                        <button className="Tag5_1Button" id="button" onClick={() => this.onClickTagButton("5_1")}>
                            {(this.state.clickTag5_1 !== false) ? '방관 V' : '방관'}
                        </button>
                        <button className="Tag5_2Button" id="button" onClick={() => this.onClickTagButton("5_2")}>
                            {(this.state.clickTag5_2 !== false) ? '라인 스왑 V' : '라인 스왑'}
                        </button>
                    </div>
                </div>
                <div className='Box3'>
                    <h3 id="Comment">3. Write down Comment if you want</h3>
                    <input id="CommentInput"
                        placeholder="Enter Comments on reported player if you want"
                        value={this.state.comment}
                        onChange={(event) => this.setState({ comment: event.target.value })} />
                </div>
                <button className="submitButton" id="submit" onClick={() => this.onClickSubmitButton()}>Submit</button>
                <button className="cancelButton" id="cancel" onClick={() => this.onClickCancelButton()}>Cancel</button>
            </div>
        )
    }

}

export default ReportAction;