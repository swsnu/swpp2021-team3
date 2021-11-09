import React, {Component} from 'react';

import Header from '../Container/Header/Header';
import Searchbar from '../Component/Searchbar/Searchbar';
import MultiSearch from '../Component/MultiSearch';

class MultiSearchResultPage extends Component {

    render () {
        return (
            <div className='MultiSearchResultPage'>
                <Header />
                <Searchbar />
                <h1>MultiSearchResultPage</h1>
                <MultiSearch />
            </div>
        )
    }
}

export default MultiSearchResultPage;