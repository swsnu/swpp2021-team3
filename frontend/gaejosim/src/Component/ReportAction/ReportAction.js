import axios from "axios";
import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
// import ReportAuth from '../ReportAuth/ReportAuth';
import Select from 'react-select';

//todo: axios post


class ReportAction extends React.Component {

    state = {
        curr_user: '',
        tag: [],
        comment: '',
        reported_summoner: '',
        evaluation: 0,
        clickCancel: false,
        clickSubmit: false,
        clickTag1_1: false,
        clickTag1_2: false,
        clickTag2_1: false,
        clickTag2_2: false,
        clickTag3_1: false,
        clickTag3_2: false,
        clickTag4_1: false,
        clickTag4_2: false,
        clickTag5_1: false,
        clickTag5_2: false,
        clickTags : []
    };

    
    onClickCancelButton = () => {
        this.setState({ clickCancel: true });
    }

    onClickSubmitButton = () => {
        this.postReportData()
        this.setState( { clickSubmit : true })
    }

    postReportData = () => {
        let tagList = [this.state.clickTag1_1, this.state.clickTag1_2, this.state.clickTag2_1, this.state.clickTag2_2, 
            this.state.clickTag3_1, this.state.clickTag3_2, this.state.clickTag4_1, this.state.clickTag4_2, this.state.clickTag5_1, this.state.clickTag5_2];
        this.state.clickTags = tagList
        console.log(this.state.clickTags)
        console.log(this.state.evaluation)
        // axios.get('/api/token/').then()

        // axios.get('/api/signin/', {
        //     "username" : "test1",
        //     "password" : "password"
        // })
        // .then (
        //     axios.post('/api/reports/???/', {
        //         "tags" : this.state.clickTags
        //     })
        //     .then((response) => {
        //         console.log('response get from /api/reports/auth: ' + JSON.stringify(response))
        //         // this.setState({ authenticated : response.body.authenticated })
        //         }
        //     )
        // )
        // // "User is not logged in."
        // .catch((error) => {
        //     console.log(error)
        //     alert(error)
        // })

    } 

    onClickTag1_1Button= () => {
        if(this.state.clickTag1_1 === false) this.setState({ clickTag1_1 : true })
        else this.setState( { clickTag1_1 : false })
    }


    onClickTag1_2Button= () => {
        if(this.state.clickTag1_2 === false) this.setState({ clickTag1_2 : true })
        else this.setState( { clickTag1_2 : false })
    }

    onClickTag2_1Button= () => {
        if(this.state.clickTag2_1 === false) this.setState({ clickTag2_1 : true })
        else this.setState( { clickTag2_1 : false })
    }

    onClickTag2_2Button= () => {
        if(this.state.clickTag2_2 === false) this.setState({ clickTag2_2 : true })
        else this.setState( { clickTag2_2 : false })
    }

    onClickTag3_1Button= () => {
        if(this.state.clickTag3_1 === false) this.setState({ clickTag3_1 : true })
        else this.setState( { clickTag3_1 : false })
    }

    onClickTag3_2Button= () => {
        if(this.state.clickTag3_2 === false) this.setState({ clickTag3_2 : true })
        else this.setState( { clickTag3_2 : false })
    }

    onClickTag4_1Button= () => {
        if(this.state.clickTag4_1 === false) this.setState({ clickTag4_1 : true })
        else this.setState( { clickTag4_1 : false })
    }

    onClickTag4_2Button= () => {
        if(this.state.clickTag4_2 === false) this.setState({ clickTag4_2 : true })
        else this.setState( { clickTag4_2 : false })
    }

    onClickTag5_1Button= () => {
        if(this.state.clickTag5_1 === false) this.setState({ clickTag5_1 : true })
        else this.setState( { clickTag5_1 : false })
    }

    onClickTag5_2Button= () => {
        if(this.state.clickTag5_2 === false) this.setState({ clickTag5_2 : true })
        else this.setState( { clickTag5_2 : false })
    }

    render() {
        let redirect = null;

        if (this.state.clickCancel) {
            redirect = <Redirect to = {`/`} />
        }
        if (this.state.clickSubmit) {
            redirect = <Redirect to = {`/`} />
        }

        return (
            <div className='ReportAction'>
                
                <div className='Process'>
                    <h3>1. Choose Manner Point of reporting player.</h3>
                    <text>Select a number between 1 to 10</text>
                    <input 
                        type='number'
                        placeholder="Evaluate Manner Point of reporting player"
                        max = '10'
                        min='1'
                        value={this.state.evaluation}
                        onChange={(event) => this.setState({ evaluation : event.target.value })} />
                </div>
                <div className='Process'>
                    <h3>2.Choose all Tags appropriate to describe behavior of reporting player if you want.</h3>
                    <div className='tags'>
                        <button onClick={() => this.onClickTag1_1Button()}>
                            {(this.state.clickTag1_1 === true) ? 'tag1_1_V' : 'tag1_1'}
                        </button>
                        <button onClick={() => this.onClickTag1_2Button()}>
                            {(this.state.clickTag1_2 === true) ? 'tag1_2_V' : 'tag1_2'}
                        </button>
                        <button onClick={() => this.onClickTag2_1Button()}>
                            {(this.state.clickTag2_1 === true) ? 'tag2_1_V' : 'tag2_1'}
                        </button>
                        <button onClick={() => this.onClickTag2_2Button()}>
                            {(this.state.clickTag2_2 === true) ? 'tag2_2_V' : 'tag2_2'}
                        </button>
                        <button onClick={() => this.onClickTag3_1Button()}>
                            {(this.state.clickTag3_1 === true) ? 'tag3_1_V' : 'tag3_1'}
                        </button>
                        <button onClick={() => this.onClickTag3_2Button()}>
                            {(this.state.clickTag3_2 === true) ? 'tag3_2_V' : 'tag3_3'}
                        </button>
                        <button onClick={() => this.onClickTag4_1Button()}>
                            {(this.state.clickTag4_1 === true) ? 'tag4_1_V' : 'tag4_1'}
                        </button>
                        <button onClick={() => this.onClickTag4_2Button()}>
                            {(this.state.clickTag4_2 === true) ? 'tag4_2_V' : 'tag4_2'}
                        </button>
                        <button onClick={() => this.onClickTag5_1Button()}>
                            {(this.state.clickTag5_1 === true) ? 'tag5_1_V' : 'tag5_1'}
                        </button>
                        <button onClick={() => this.onClickTag5_2Button()}>
                            {(this.state.clickTag5_2 === true) ? 'tag5_2_V' : 'tag5_2'}
                        </button>
                    </div>
                </div>
                <div className='Process'>
                    <h3>4. Write down Comment if you want</h3>
                    <input
                        placeholder="Enter Comments on reported player if you want"
                        value={this.state.comment}
                        onChange={(event) => this.setState({ comment : event.target.value })} />
                </div>
                <button onClick = {() => this.onClickSubmitButton()}>Submit</button>
                <button onClick={() => this.onClickCancelButton()}>Cancel</button>
            </div>
        )
    }
    
}

export default ReportAction;