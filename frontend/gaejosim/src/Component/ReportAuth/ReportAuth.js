import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios";

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
        
        if(response_signin.status === 200) {
            const response = await axios.post('/api/reports/auth/', {
                "summoner_name": this.state.report_summoner
            })
            
            if(response.data.authenticated === false) alert("Please check the summoner name. This summoner is not one of player whom you played with in recent five games")
            this.setState({ authenticated : response.data.authenticated})
        }
        else {
            alert('User should log in')
        }
    }



    render() {
       let redirect = null
       if(this.state.clickNext === true) {
        redirect = <Redirect to={`/ReportAction/${this.state.report_summoner}`} />
       }
       const buttonStyle = {
            position: 'absolute', width: '120px', height: '38.4px', background: '#5F2EEA', borderRadius: '40px', color: 'white', bottom: '60px', left: '660px'
       }
       const authStyle = {
            position: 'absolute',
            background: '#EFF0F7',
            color: 'black',
            fontWeight: 800,
            fontSize: '30px',
            bottom: '230px',
            right: '25%', 
            border: 0,
            outline: 0,
        }
        return (
            <div className='ReportAuth'>
                {redirect}
                <text
                    style={{
                        position: 'absolute',
                        top: '100px',
                        left: '610px', 
                        fontWeight: 800,
                        fontSize: '64px',
                        lineHeight: '66px',
                    }}>Report</text>
                <div
                style={{
                    width: '840px',
                    height: '360px',
                    background: '#F8F8F8',
                    borderRadius: '32px',
                    position: 'absolute',
                    left: '20.83%', right: '20.83%',
                    top: '200px', 
                    filter: 'drop-shadow(0px 8px 16px rgba(17, 17, 17, 0.04))',
                }} />
                <text
                    style={{
                        // display: 'flex',
                        position: 'absolute',
                        top: '280px',
                        left: '25.97%', 
                        fontWeight: 800,
                        fontSize: '40px',
                        lineHeight: '66px',
                    }}>Select A Troll</text>
                <input className='reportSummoner'
                    type='text'
                    style={{
                        width: '691px',
                        height: '64px',
                        position: 'absolute',
                        left: '25.97%', 
                        right: '26.04%', 
                        top: '350px', 
                        // bottom: '38.89%', 
                        background: '#EFF0F7', 
                        borderRadius: '16px'
                    }}
                    placeholder='Pick SummonerID want to report'
                    onChange={(event) => this.setState({ report_summoner : event.target.value })}
                />
                {(!this.state.authenticated) && <button style={authStyle} onClick={() => this.onClickAuthenticateButton()}>Authenticate</button>}
                {(this.state.authenticated) && <div style={authStyle}>Authenticated</div>}
                {(this.state.authenticated) && <button style={buttonStyle} onClick={() => this.onClickNextButton()}>Next</button>}
                {(!this.state.authenticated) && <button style={buttonStyle} onClick={() => alert("Not authenticated")}>Next</button>}
            </div>
        )
    }
}

export default ReportAuth;