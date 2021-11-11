import React, { Component } from 'react';

import Header from '../Container/Header/Header';
import ReportAction from '../Component/ReportAction/ReportAction';
import './ReportActionPage.css';

class ReportActionPage extends Component {

    render() {
        const path = this.props.location.pathname;
        const splitResult = path.split('/');
        const reported_summoner = splitResult[2];
        console.log("reported summoner", reported_summoner)

        return (
            <div className='ReportActionPage'>
                <Header />
                <p id="ReportPageName">Report</p>
                <ReportAction reported_summoner={reported_summoner} />
            </div>
        )
    }
}

export default ReportActionPage;