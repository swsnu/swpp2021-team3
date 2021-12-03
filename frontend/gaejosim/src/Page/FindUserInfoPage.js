import React, {Component} from 'react';

import Header from '../Container/Header/Header';
import FindUserInfo from '../Component/FindUserInfo/FindUserInfo';

class FindUserInfoPage extends Component {

    render () {
        return (
            <div className='FindUserInfoPage'>
                <Header />
                <FindUserInfo />
            </div>
        )
    }
}

export default FindUserInfoPage;