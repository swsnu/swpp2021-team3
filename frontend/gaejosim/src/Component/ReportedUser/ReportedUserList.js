import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import User from './User';

class ReportedUserList extends Component {
    state = {
        isLoading : true,
        reportedUserList : [
            { id: 1, summonerID: 'TrollUsesr1'},
            { id: 2, summonerID: 'TrollUsesr2'},
            { id: 3, summonerID: 'TrollUsesr3'},
        ]
    }
    
    // TODO: axios get해서 reportedUserList 뽑아옴.
    // getNumbers = async() => {
    //     const {
    //         data : {
    //             data: {numReports}, 
    //             data: {numPrevents}, 
    //         } 
    //     } = awiat axios.get(url)
    //     console.log(numReports)
    //     console.log(numPrevents)
    //     this.setState({numReports, numPrevents, isLoading = false})
    // }

    // componentDidMount() {
    //     this.getNumbers();
    // }

    render() {
        const reportedUsers = this.state.reportedUserList.map((user) => {   
            return (
                <User key={user.id} summonerID={user.summonerID} />
            )
        })
        return (
            <div className='ReportedUserList'>
                {reportedUsers}
            </div>
        )
    }
}

export default ReportedUserList;