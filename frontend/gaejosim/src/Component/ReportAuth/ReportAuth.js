import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios";

class ReportAuth extends Component {
    
    state = {
        curr_user: '',
        summonerList: [],
        summoner_name: '',
        authenticated: false,
        clickNext: false,
    }



    //todo: axios get -> authentified -> change authType true
    // 일단은 no 버튼을 눌러서 authentified -> button을 ok로
    //todo: axios post

    // getSummoners = async() => {
    //     // get data from api
    //     axios.get('http://localhost:3000//api/report/auth')
    //     .then(
    //         (response, {data}) => {
    //             const summonerList = response.data;
    //             this.setState({summonerList: data.recent_players});
    //             console.log('response get from /api/report/auth: ' + response)
    //             // const reportNum = response.data.accumulated_reports;
    //             // const preventNum = response.data.today_reports;
    //             //     this.state.numReports = reportNum;
    //             //     this.state.numPrevents = preventNum; 
    //         }
    //     )
    //     .catch( error => console.log(error))
    // }

    // componentDidMount() {
    //     console.log('In componentDidMount');
    //     this.getSummoners();
    // }
    
    onClickNextButton = () => {
        this.setState({ clickNext: true });
    }

    getUserData = () => {
        this.state.curr_user = 'test1'        
    }

    onClickAuthenticateButton = () => {

    }

    getAuthData = () => {

        // // TODO : 주석처리 해제
        // axios.get('/api/token/').then()


        // let responseBody = ''
        // axios.get('/api/signin/', {
        //     "username" : "test1",
        //     "password" : "password"
        //     })
        //     .then (
        //         axios.get('/api/reports/auth/')
        //         .then((response) => {
        //             console.log('response get from /api/reports/auth: ' + JSON.stringify(response))
        //             responseBody = response.body
        //         }
        //     )
        //     // "User is not logged in."
        //     .catch((error) => {
        //         console.log(error)
        //         alert(error)
        //     })
        // )

        let recentPlayerArr =  [
            "player_name1",
            "player_name2",
            "player_name3",
            "player_name4",
            "player_name5"
        ]

        this.state.summonerList = recentPlayerArr;
    }

    postAuthData = () => {
        // axios.get('/api/token/').then()

        // axios.get('/api/signin/', {
        //     "username" : "test1",
        //     "password" : "password"
        // })
        // .then (
        //     axios.post('/api/reports/auth/', {
        //         "summoner_name" : this.state.summoner_name
        //     })
        //     .then((response) => {
        //         console.log('response get from /api/reports/auth: ' + JSON.stringify(response))
        //         // this.setState({ authenticated : response.body.authenticated })
        //         }
        //     )
        // )
        // // "User is not logged in."
        // .catch((error) => {
        //     console.log(error)
        //     alert(error)
        // })

        this.state.authenticated = true
    }

    // changeAuthType = () => {
    //     this.setState({authType: true});
    // }

    render() {
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';  
    
        this.getAuthData()
        this.getUserData()

        let buttonName = '';
        if(this.state.summoner_name != '') this.postAuthData()
        if(this.state.authenticated === true) {
            buttonName = 'Authenticated'
        }
        else {
            buttonName = 'Authenticate'
        }
        let redirect = null;
        if (this.state.clickNext) {
            redirect = <Redirect to = {`/ReportAction/${this.state.summoner_name}`} />
        }
        return (
            <div className = 'ReportAuth'>
                {redirect}                    
                <input className = 'reportSummoner'
                        type = 'text'
                        placeholder = 'Pick SummonerID want to report' 
                        value = {this.state.summoner_name}
                        onChange = {(event) => this.setState({ summoner_name: event.target.value })}
                />
                <button onClick={() => this.onClickAuthenticateButton()}>{buttonName}</button>
                {(this.state.authenticated) && <button onClick={() => this.onClickNextButton()}>Next</button>}
        </div>
        )
        
    }
}

export default ReportAuth;