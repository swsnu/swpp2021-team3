import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import './ReportAuth.css';

class ReportAuth extends Component {

    state = {
        summonerList: [],
        report_summoner: '',
        authenticated: false,
        clickNext: false,
    }

    onClickNextButton = () => {
        this.setState({ clickNext: true });
    }

    onClickAuthenticateButton = () => {
        this.postAuthData()
    }

    // Post auth by /api/reports/auth/ call.
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
                "summoner_name": this.state.report_summoner
            })


            if (response.data.authenticated === false) alert("Please check the summoner name. This summoner is not one of player whom you played with in recent five games")
            this.setState({ authenticated: response.data.authenticated })
        }
        else {
            alert('User should log in')
        }
    }

    render() {
        let redirect = null
        if (this.state.clickNext === true) {
            redirect = <Redirect to={`/ReportAction/${this.state.report_summoner}`} />
        }

        return (
            <div className='ReportAuth'>
                {redirect}
                <text className='titleTextStyle'>Report</text>
                <div className='boxStyle' />
                <text className='subtitleTextStyle'>Select A Troll</text>
                <input className='reportSummoner'
                    type='text'
                    placeholder='Pick SummonerID want to report'
                    data-testid='summoner-input'
                    onChange={(event) => this.setState({ report_summoner: event.target.value })}
                />
                {(!this.state.authenticated) && <button className="buttonAuthStyle" onClick={() => this.onClickAuthenticateButton()}>Authenticate</button>}
                {(this.state.authenticated) && <button className="authStyle">Authenticated</button>}
                {(this.state.authenticated) && <button className="buttonStyle" onClick={() => this.onClickNextButton()}>Next</button>}
                {(!this.state.authenticated) && <button className="buttonStyle" onClick={() => alert("Not authenticated")}>Next</button>}
            </div>
        )
    }
}

export default ReportAuth;