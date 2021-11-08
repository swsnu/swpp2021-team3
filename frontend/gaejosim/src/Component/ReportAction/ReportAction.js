import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

//todo: axios post

// input : https://velopert.com/3634
// React input to django post https://velog.io/@95ybya/프로젝트-8일차-React-Django-POST-구현

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
    }

    state = {
        clickCancel : false
    }

    onClickCancelButton = () => {
        this.setState({ clickCancel: true });
    }

    render() {

        let redirect = null;
        if (this.state.clickCancel) {
            redirect = <Redirect to = {`/`} />
        }

        return (
            <div className='ReportAction'>
                {redirect} 
                <div>
                    <h3>2. Manner Point</h3>
                    {/* <textarea> Manner Point Graph Image</textarea> */}
                    <div><text>Select a number between 1 to 10</text></div>
                    <form>
                        <input 
                            type="number"
                            max = '10'
                            min='1'
                            placeholder="enter your manner point number"
                            value={this.state.evaluation}
                            onChange={this.handleChange}
                            name="evaluation"
                        />
                        <div>{this.state.evaluation}</div>
                    </form>
                </div>
                <div>
                    <h3>3.Tags</h3>
                    <form>
                        <select 
                            value={this.state.tag} 
                            onChange={this.handleChange} 
                            name="tag"
                        >
                            <option value="none">Select a Tag</option>
                            {/* multi select 구현은 나중에 하겠습니다 ㅜㅜ */}
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
                    </form>
                </div>
                <div>
                    <h3>4. Comment(Optional)</h3>
                    <div><text>description about the optional comment</text></div>
                    <form>
                        <input
                            placeholder="enter your text contents"
                            value={this.state.comment}
                            onChange={this.handleChange}
                            name="comment"
                        />
                        <div>{this.state.comment}</div>
                    </form>
                </div>

                <button onClick = {this.handleClick}>Submit</button>
                <div><button onClick={() => {this.onClickCancelButton()}}>Cancel</button></div>
            </div>
        )
    }
    
}

export default ReportAction;