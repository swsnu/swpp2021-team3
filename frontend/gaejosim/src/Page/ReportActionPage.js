import React, { Component } from 'react';

import Header from '../Container/Header/Header';
import ReportAction from '../Component/ReportAction/ReportAction';
import './ReportActionPage.css';

class ReportActionPage extends Component {

    render() {
        const reportedSummoner = this.props.match.params.summonerID
        console.log("name", reportedSummoner)

        return (
            <div className='ReportActionPage'>
                <Header />
                <p id="ReportPageName">Report</p>
                <ReportAction reported_summoner={reportedSummoner} />
            </div>
        )
    }
}

export default ReportActionPage