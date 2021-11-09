import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
// import ReportAuth from '../ReportAuth/ReportAuth';
import Select from 'react-select';

//todo: axios post

// input : https://velopert.com/3634
// React input to django post https://velog.io/@95ybya/프로젝트-8일차-React-Django-POST-구현

//todo: reportAuth에서 summonerName 가지고 와서 reported_summoner에 넣어주기
//todo: tag multi-select 기능 구현하기

// https://www.freakyjolly.com/react-select-single-or-multiple-select-box-using-react-select-tutorial-with-examples/
const options = [
    {value: '#tag1_1', label: 'tag1_1'},
    {value: '#tag1_2', label: 'tag1_2'},
    {value: '#tag2_1', label: 'tag2_1'},
    {value: '#tag2_2', label: 'tag2_2'},
    {value: '#tag3_1', label: 'tag3_1'},
    {value: '#tag3_2', label: 'tag3_2'},
    {value: '#tag4_1', label: 'tag4_1'},
    {value: '#tag4_2', label: 'tag4_2'},
    {value: '#tag5_1', label: 'tag5_1'},
    {value: '#tag5_2', label: 'tag5_2'},
];

class ReportAction extends React.Component {

    state = {
        id: '',
        tag: '',
        comment: '',
        reported_summoner: '',
        evaluation: '',
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleClick = (e) => {
        alert('id:'+this.state.id+', tag:'+this.state.tag+', comment:'+this.state.comment+', reported_summoner:'+this.state.reported_summoner+', evaluation:'+this.state.evaluation);
        this.setState({
            id: '',
            tag: '',
            comment: '',
            reported_summoner: '',
            evaluation: '',
        });
        if(this.state.tag === undefined){
            alert("tag를 선택해주세요");
        }
        if(this.state.evaluation === undefined){
            alert("매너 포인트를 선택해주세요");
        }
    }

    state = {
        clickCancel : false
    }

    onClickCancelButton = () => {
        this.setState({ clickCancel: true });
    }

    state = {
        selectedOption: null,
    }

    handleTagChange = selectedOption => {
        this.setState({selectedOption});
    }

    render() {

        let redirect = null;
        if (this.state.clickCancel) {
            redirect = <Redirect to = {`/`} />
        }

        const {selectedOption} = this.state;

        return (
            <div className='ReportAction'>
                {redirect} 
                <div>
                    <h3>2. Manner Point</h3>
                    {/* <textarea> Manner Point Graph Image</textarea> */}
                    <form>
                        <text>Select a number between 1 to 10</text>
                        <input 
                            type="number"
                            max = '10'
                            min='1'
                            placeholder="enter your manner point number"
                            value={this.state.evaluation}
                            onChange={this.handleChange}
                            name="evaluation"
                        />
                        {/* <div>{this.state.evaluation}</div> */}
                    </form>
                </div>
                <div>
                    <h3>3.Tags</h3>
                    {/* <form>
                        <select 
                            value={this.state.tag} 
                            onChange={this.handleChange} 
                            name="tag"
                        >
                            <option value="none">Select a Tag</option>
                            <option value="tag1_1">#tag1_1</option>
                            <option value="tag1_2">#tag1_2</option>
                            <option value="tag2_1">#tag2_1</option>
                            <option value="tag2_2">#tag2_2</option>
                            <option value="tag3_1">#tag3_1</option>
                            <option value="tag3_2">#tag3_2</option>
                            <option value="tag4_1">#tag4_1</option>
                            <option value="tag4_2">#tag4_2</option>
                            <option value="tag5_1">#tag5_1</option>
                            <option value="tag5_2">#tag5_2</option>
                        </select>
                    </form> */}
                    <Select 
                        isMulti={true}
                        value = {selectedOption}
                        onChange={this.handleTagChange}
                        options={options}
                    />
                </div>
                <div>
                    <h3>4. Comment(Optional)</h3>
                    <form>
                        <input
                            placeholder="enter your text contents"
                            value={this.state.comment}
                            onChange={this.handleChange}
                            name="comment"
                        />
                        {/* <div>{this.state.comment}</div> */} 
                    </form>
                </div>
                <div>
                    <h3> </h3>
                    <button onClick = {this.handleClick}>Submit</button>
                    <div><button onClick={() => {this.onClickCancelButton()}}>Cancel</button></div>
                </div>
            </div>
        )
    }
    
}

export default ReportAction;