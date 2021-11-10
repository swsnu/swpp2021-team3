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
                SearchPage
                <Searchbar />
                <button 
                    style={{
                        position: 'absolute',
                        left: '68.19%',
                        right: '23.47%',
                        top: '5.78%',
                        bottom: '89.96%',
                        background: '#5F2EEA',
                        borderRadius: '40px',
                        color: 'white',
                    }}
                    onClick={() => this.onClickReportButton()}>
                    Go to Report
                </button>
                <Statistic />
                <ReportedUserList />
            </div>
        )
    }
}

export default SearchPage;