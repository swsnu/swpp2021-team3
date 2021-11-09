import React, {Component} from 'react';
// import { Redirect } from 'react-router-dom';

import Header from '../Container/Header/Header';
import ReportAuth from '../Component/ReportAuth/ReportAuth';

class ReportAuthPage extends Component {


    render () {

        return (
            <div className='ReportAuthPage'>

                <Header />
                <h1>ReportAuthPage</h1>
                <ReportAuth />

            </div>
        )
    }
}

export default ReportAuthPage;