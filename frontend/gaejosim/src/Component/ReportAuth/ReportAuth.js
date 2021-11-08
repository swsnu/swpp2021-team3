import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios";

class ReportAuth extends Component {
    state = {
        summonerName: '',
        clickNext: false,
        authType: 'true',
    }

    //todo: axios get -> authentified -> change authType true
    //todo: axios post
    
    onClickNextButton = () => {
        this.setState({ clickNext: true });
    }

    onClickCheckAuthButton = () => {
        // if(this.state.authType === 'true') {
        //     this.setState({ searchType : 'false'});
        // }
        // else {
        //     this.setState({ searchType : 'false'});
        // }
        this.setState({searchType: 'false'});
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
                        <input type='text' placeholder='SummonerID' 
                            value={this.state.summonerName}
                            onChange={(event) => this.setState({ summonerName: event.target.value })} />
                    
                </div>
                <div className="Next">
                {(this.state.authType==='true')&&
                    <div>
                        <button>OK</button>
                        <text>Authentified</text>
                        <div><button onClick={() => {this.onClickNextButton()}}>Next</button></div>
                    </div>}
                {(this.state.authType==='false')&&
                    <div>
                        <button>NO</button>
                        <text>Not Authentified</text>
                        <div><button>Next</button></div>
                    </div>}
                </div>
            </>
         
        )
    }
}

export default ReportAuth;