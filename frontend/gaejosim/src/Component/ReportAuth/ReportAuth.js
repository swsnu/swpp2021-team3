import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios";

class ReportAuth extends Component {
    state = {
        summonerName: '',
        clickNext: false,
        authType: false,
    }

    //todo: axios get -> authentified -> change authType true
    // 일단은 no 버튼을 눌러서 authentified -> button을 ok로
    //todo: axios post
    
    onClickNextButton = () => {
        this.setState({ clickNext: true });
    }

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
                            value={this.state.summonerName}
                            onChange={(event) => this.setState({ summonerName: event.target.value })}
                        />
                        {/* <div>{this.state.summonerName}</div> */}
                    
                </div>
                <div className="Next">
                {(this.state.authType===true)&&
                    <div>
                        <button>OK</button>
                        <text>Authentified</text>
                        <div onClick={() => alert('summonerId is '+this.state.summonerName)}><button onClick={() => {this.onClickNextButton()}}>Next</button></div>
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