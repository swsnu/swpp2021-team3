import React, { Component } from "react";

const ResultView = (props) => {
    return (
        <div className='tagView'>            
            <div className = 'tagDiagrm'>
                <img className = 'tag-diagram-img' alt = 'tag-diagram-img' src = '../../../public/images/imagename' />
            </div>
            <div className = 'tags'>
                <text className = 'tag1'>{props.taglist}</text>
                <text className = 'tag2'>{props.taglist}</text> 
                <text className = 'tag3'>{props.taglist}</text>
                <text className = 'tag4'>{props.taglist}</text> 
                <text className = 'tag5'>{props.taglist}</text> 
            </div>
        </div>
    )
}

export default ResultView;