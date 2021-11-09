import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios";

class ReportAuth extends Component {
    state = {
        summonerId: '',
        // summonerId: summonerName,
        clickNext: false,
        authType: false,
        summonerList: [],
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

    // changeAuthType = () => {
    //     this.setState({authType: true});
    // }

    changeAuthType = () => {
        this.setState({authType: true});
    }

    render() {
        let redirect = null;
        if (this.state.clickNext) {
            redirect = <Redirect to = {`/ReportAction`} />
        }
        return (
            <>
                <div className='ReportAuth'>
                    {redirect}                    
                        <input 
                            type='text'
                            placeholder='SummonerID' 
                            value={this.state.summonerId}
                            onChange={(event) => this.setState({ summonerId: event.target.value })}
                        />
                        {/* <div>{this.state.summonerId}</div> */}
                    
                </div>
                <div className="Next">
                {(this.state.authType===true)&&
                    <div>
                        <button>OK</button>
                        <text>Authentified</text>
                        <div onClick={() => alert('summonerId is '+this.state.summonerId)}><button onClick={() => {this.onClickNextButton()}}>Next</button></div>
                    </div>}
                {(this.state.authType===false)&&
                    <div>
                        <button onClick={() => {this.changeAuthType()}}>NO</button>
                        <text>Not Authentified</text>
                        <div><button onClick={() => alert('not authentified')}>Next</button></div>
                    </div>}
                </div>
            </>
        )
    }
}

export default ReportAuth;