import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

import Header from '../Container/Header/Header';
import Searchbar from '../Component/Searchbar/Searchbar';
import Statistic from '../Component/Statistic/Statistic';
import ReportedUserList from '../Component/ReportedUser/ReportedUserList';

class SearchPage extends Component {
    state = {
        clickReport : false
    }

    onClickReportButton = () => {
        this.setState({ clickReport: true });
    }

    render () {
        let redirect = null;
        if (this.state.clickReport) {
            redirect = <Redirect to = '/reportAuth' />
        }
        return (
            <div className='SearchPage'>
                {redirect}
                <Header />
                <h1>SearchPage</h1>
                <Searchbar />
                <button onClick={() => this.onClickReportButton()}>Go to Report</button>
                <Statistic />
                <ReportedUserList />
            </div>
        )
    }
}

export default SearchPage;