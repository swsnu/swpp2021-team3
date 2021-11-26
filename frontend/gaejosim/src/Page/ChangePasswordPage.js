import React, {Component} from 'react';

import Header from '../Container/Header/Header';
import ChangePassword from '../Component/ChangePassword/ChangePassword';

class ChangePasswordPage extends Component {

    render () {
        return (
            <div className = 'ChangePasswordPage'>
                <Header />
                <ChangePassword />
            </div>
        )
    }
}

export default ChangePasswordPage