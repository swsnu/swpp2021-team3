import React, { Component } from "react";

import User from './User';

import './ReportedUserList.css';

class ReportedUserList extends Component {
    state = {
        isLoading : true,
        reportedUserList : [
            { id: 1, summonerID: 'TrollUsesr1'},
            { id: 2, summonerID: 'TrollUsesr2'},
            { id: 3, summonerID: 'TrollUsesr3'},
        ]
    }
    
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