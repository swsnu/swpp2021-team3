import React, { Component } from "react";

//todo: axios post


const ReportAction= (props) => {
    return (
        <div className='ReportAction'>            
            <h3>ReportAction Component</h3>
            <div>
                <h3>2. Manner Point</h3>
                <textarea> Manner Point Graph Image</textarea>
                <div><text>text details about manner point</text></div>
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
            </div>
            <div>
                <h3>4. Comment(Optional)</h3>
                <div><text>description about the optional comment</text></div>
                <div><input type="text" placeholder="Type your text contents here" /></div>
            </div>
            {/* <button>Submit</button> */}
            <input type ="submit" value="Submit" />
            {/* <button onClick = {() => navigate(-2)}>Cancel</button> */}
        </div>
    )
}

export default ReportAction;