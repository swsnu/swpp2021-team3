import React, { Component } from "react";
import CommonSearch from "./CommonSearch/CommonSearch";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class MultiSearch extends Component {

    state = {
        summoners : ''
    }

    getMatchers = () => {
        // Get data from API
        this.state.summoners = this.props.summoners
        const url = `http://localhost:3000/api/search/`
        
        // Check axios
        axios.get(url, {
            params : {
                type : 'multi',
                summoners : this.state.summoners
            }
        })
        .then(
            (response) => {
                // Check response.body
                console.log('response get from /api/search: ' + JSON.stringify(response))
                
            }
        )
        .catch( error => console.log(error))
    }

    render() {
        this.getMatchers()

        return (
            <div className='MultiSearch'>
            </div>
        )
    }
}

export default MultiSearch;