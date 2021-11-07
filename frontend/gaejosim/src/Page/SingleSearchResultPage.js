import React, {Component} from 'react';

import Header from '../Container/Header/Header';
import Searchbar from '../Component/Searchbar/Searchbar';
import TagView from '../Component/CommonSearch/TagView/TagView';

class SingleSearchResultPage extends Component {
    
    render () {
        return (
            <div className='SingleSearchResultPage'>
                <Header />
                 SingleSearchResultPage
                <Searchbar />
            </div>
        )
    }
}

export default SingleSearchResultPage;