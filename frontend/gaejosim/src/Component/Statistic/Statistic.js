import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// TODO: /api/statistics/ 만들어 져야 완성 가능

class Statistic extends Component {
    state = {
        isLoading : true,
        numReports : 100,
        numPrevents : 5,
    }

    render() {
        return (
            <div className='Statistic'>
                <div className='NumReports'>All Reports: {this.state.numReports}</div>
                <div className='NumPrevents'>All Prevents: {this.state.numPrevents}</div>
            </div>
        )
    }
}

export default Statistic;