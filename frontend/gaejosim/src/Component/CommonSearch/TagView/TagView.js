import React, { Component } from "react";

const TagView= (props) => {
    return (
        <div className='tagView'>            
            <div className = 'tagDiagrm'>
                <img className = 'tag-diagram-img' alt = 'tag-diagram-img' src = '../../../public/images/imagename' />
            </div>
            <div className = 'tags'>
                <text className = 'tag1'>{this.props.tag1}</text>
                <text className = 'tag2'>{this.props.tag2}</text> 
                <text className = 'tag3'>{this.props.tag3}</text>
                <text className = 'tag4'>{this.props.tag4}</text> 
                <text className = 'tag5'>{this.props.tag5}</text> 
            </div>
        </div>
    )
}

export default TagView;