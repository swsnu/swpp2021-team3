import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import Header from '../Container/Header/Header';
import Searchbar from '../Component/Searchbar/Searchbar';
import Statistic from '../Component/Statistic/Statistic';

import './SearchPage.css';

class SearchPage extends Component {
    state = {
        clickReport: false
    }

    onClickReportButton = () => {
        this.setState({ clickReport: true })
        this.props.history.push('/reportAuth')
    }

    render() {
        return (
            <div className = 'SearchPage'>
                <Header />
                <div className = 'Background'></div>
                <p id = 'PageName'>Search</p>
                <Searchbar />
                <button className = 'GoToReport' id = 'button'
                    onClick={() => this.onClickReportButton()}>
                    Report
                </button>
                <Statistic />
            </div>
        )
    }
}

export default withRouter(SearchPage)