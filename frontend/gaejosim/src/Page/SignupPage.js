import React, {Component} from 'react';

import Header from '../Container/Header/Header';
import SignUp from '../Component/Signup/Signup';

class SignupPage extends Component {

    render () {
        return (
            <div className='SignupPage'>
                {/* <Header />  */}
                <SignUp />
            </div>
        )
    }
}

export default SignupPage;