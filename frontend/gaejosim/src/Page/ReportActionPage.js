import React, {Component} from 'react';

import Header from '../Container/Header/Header';
import ReportAction from '../Component/ReportAction/ReportAction';

class ReportActionPage extends Component {

    render () {
        return (
            <div className='ReportActionPage'>
                <Header />
                <h1>ReportActionPage</h1>
                <ReportAction />
            </div>
        )
    }
}

export default ReportActionPage;