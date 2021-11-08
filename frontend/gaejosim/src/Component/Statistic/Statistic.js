import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// TODO: /api/statistics/ 만들어 져야 완성 가능

class Statistic extends Component {
    state = {
        isLoading : true,
        numReports : 100,
        numPrevents : 5,
        // numReports : reportNum,
        // numPrevents : preventNum,
    }

    // getStatisticData = async() => {
    //     // Get data from API
    //     axios.get('http://localhost:3000//api/statistics/')
    //     .then(
    //         (response) => {
    //             console.log('response get from /api/statistics: ' + JSON.stringify(response))
    //             const reportNum = response.data.accumulated_reports;
    //             const preventNum = response.data.today_reports;
                //    this.state.numReports = reportNum;
                //    this.state.numPrevents = preventNum; 
    //         }
    //     )
    //     .catch( error => console.log(error))
    // }

    componentDidMount() {
        console.log('In componentDidMount')
        // this.getStatisticData();
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