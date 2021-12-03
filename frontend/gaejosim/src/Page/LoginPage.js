import React, {Component} from 'react';
import Header from '../Container/Header/Header';
import Login from '../Container/Login/Login';

class LoginPage extends Component {
    render () {
        return (
            <div className='FindUserInfoPage'>
                <Login />
            </div>
        )
    }
}

export default LoginPage;