import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';


class Statistic extends Component {
    state = {
        isLoading : true,
        numReports : 37,
        numPrevents : 5
    }
    
    // TODO: axios get 두 번하여 num Reports와 num Prevent 숫자 뽑아옴.
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
        return (
            <div className='Statistic'>
                <div className='NumReports'>All Reports: {this.state.numReports}</div>
                <div className='NumPrevents'>All Prevents: {this.state.numPrevents}</div>
            </div>
        )
    }
}

export default Statistic;