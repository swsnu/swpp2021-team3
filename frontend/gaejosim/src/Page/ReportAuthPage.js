import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

import Header from '../Container/Header/Header';

class ReportAuthPage extends Component {

    state = {
        clickReportAction : false
    }

    onClickReportActionButton = () => {
        this.setState({ clickReportAction: true });
    }

    render () {
        let redirect = null;
        if (this.state.clickReportAction) {
            redirect = <Redirect to = '/reportAction' />
        }
        return (
            <div className='ReportAuthPage'>
                {redirect}
                <Header />
                ReportAuthPage
                <button onClick={() => this.onClickReportActionButton()}>Next</button>
            </div>
        )
    }
}

export default ReportAuthPage;