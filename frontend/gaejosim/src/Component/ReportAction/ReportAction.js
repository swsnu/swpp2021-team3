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
        evaluation: ''};

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleClick = (e) => {
        alert(this.state.tag+':'+this.state.comment+':'+this.state.evaluation);
        this.setState({
            tag: '',
            comment: '',
            evaluation: ''
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
                <h3>ReportAction Component</h3>
                <div>
                    <h3>2. Manner Point</h3>
                    <textarea> Manner Point Graph Image</textarea>
                    <div><text>text details about manner point</text></div>
                    <form>
                        <input
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
                    <button>#tag1</button>
                    <button>#tag1</button>
                    <button>#tag1</button>
                    <button>#tag1</button>
                    <button>#tag1</button>
                    <button>#tag1</button>
                    <button>#tag1</button>
                    <button>#tag1</button>
                    <form>
                        <input
                            placeholder="type your tags"
                            value={this.state.tag}
                            onChange={this.handleChange}
                            name="tag"
                        />
                        <div>{this.state.tag}</div>
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
                {/* <button>Submit</button> */}
                <input type ="submit" value="Submit" />
                {/* <button onClick = {() => navigate(-2)}>Cancel</button> */}
                <button onClick = {this.handleClick}>check</button>
                <div><button onClick={() => {this.onClickCancelButton()}}>Cancel</button></div>

            </div>
        )
    }
    
}

export default ReportAction;