import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';


import './ReportAuth.css';

// TODO: login 기능 구현 후 axios 에러 핸들링 코드 넣기 Warning: The tag <text> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.: getPlayersData, postAuthData
// TODO: postAuthData 코드 삭제

class ReportAuth extends Component {

    state = {
        recentPlayers: [],
        getPlayers : false,
        reportedSummoner: '',
        authenticated: false,
    }
    
    componentDidMount() {
        if(this.state.getPlayers === false) {
            this.getPlayersData()
        }
    }

    getPlayersData = async () => {
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';

        axios.get('/api/token/').then()

        const response_signin = await axios.post('/api/signin/', {
            "username": "test1",
            "password": "password"
        })

        if (response_signin.status === 200) {
            const response = await axios.get('/api/reports/auth/')
            
            this.setState({ recentPlayers : response.data.recent_players, getPlayers : true })
        }
        else {
            alert('로그인 한 유저만 트롤을 리포트 할 수 있습니다.')
        }
    }
    
    // Post auth by /api/reports/auth/ call.
    // TODO: postAuthData 에서는 로그인 여부 체크할 필요 없으므로 해당 코드 삭제 필요.
    postAuthData = async () => {
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';

        axios.get('/api/token/').then()

        const response_signin = await axios.post('/api/signin/', {
            "username": "test1",
            "password": "password"
        })

        if (response_signin.status === 200) {
            const response = await axios.post('/api/reports/auth/', {
                "summoner_name": this.state.reportSummoner
            })


            if (response.data.authenticated === false) alert('소환사명을 체크해주세요. 현재 기입한 소환사는 최근 5판 게임 내에서 함께한 플레이어가 아닙니다.')
            this.setState({ authenticated: response.data.authenticated })
        }
        else {
            alert('로그인 한 유저만 트롤을 리포트 할 수 있습니다.')
        }
    }

    handleReportSummoner = (selected) => {
        this.setState({reportedSummoner: selected.label, authenticated : true})
    }

    onClickAuthenticateButton = () => {
        this.postAuthData()
    }
    
    onClickNextButton = () => {
        this.props.history.push(`/ReportAction/${this.state.reportedSummoner}`)
    }

    setValue = (newValue) => {
        console.log(newValue)
        this.setState({reportedSummoner: newValue})
    }

    render() {
        let options = []

        if(this.state.getPlayers) {
            options = this.state.recentPlayers.map((player, index) => ({label : player, key : index}))
        }

        console.log(options)

        return (
            <div className='ReportAuth'>
                <text className='titleTextStyle'>Report</text>
                <div className='boxStyle' />
                <div className='subtitleTextStyle'>트롤을 골라주세요</div>

                <Select className='reportSummoner'
                    placeholder='리포트 대상 플레이어를 선택하세요.'
                    defaultValue={this.state.reportedSummoner}
                    onChange={(selected) => this.handleReportSummoner(selected)}
                    options={options}
                />
                
    
                {(!this.state.authenticated) && <button className="buttonAuthStyle" onClick={() => this.onClickAuthenticateButton()}>인증하기</button>}
                {(this.state.authenticated) && <button className="authStyle">인증됨</button>}
                {(this.state.authenticated) && <button className="buttonStyle" onClick={() => this.onClickNextButton()}>다음</button>}
                {(!this.state.authenticated) && <button className="buttonStyle" onClick={() => alert("인증해야 다음 단계로 넘어갈 수 있습니다.")}>다음</button>}
            </div>
        )
    }
}

export default withRouter(ReportAuth)