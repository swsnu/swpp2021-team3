import React, {Component} from 'react';

import Header from '../Container/Header/Header';
import Searchbar from '../Component/Searchbar/Searchbar';
import MultiSearch from '../Component/MultiSearch';

class MultiSearchResultPage extends Component {

    state = {
        summoners : ''
    }

    render () {
        // Set summoners 
        const path = this.props.location.pathname; 
        const splitResult = path.split('/');
        const summonerList = splitResult[2].split('-');
        this.state.summoners = summonerList.join(',');
        console.log(this.state.summoners);

        return (
            <div className='MultiSearchResultPage'>
                <Header />
                <Searchbar />
                <h1>MultiSearchResultPage</h1>
                <MultiSearch summoners={this.state.summoners}/>
            </div>
        )
    }
}

export default MultiSearchResultPage;