import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import Header from '../Container/Header/Header';
import Searchbar from '../Component/Searchbar/Searchbar';
import Statistic from '../Component/Statistic/Statistic';

import './SearchPage.css';

// TODO: PageName이 의미하는 바가 무엇인지 물어보기

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
                <div className = 'Logo'>Gaejosim</div>
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