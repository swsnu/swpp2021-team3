import React, { Component } from "react";

class TagView extends Component {
    state = {
        tags : ["tag1", "tag2", "tag3", "tag4", "tag5"],
        tag_values : []
    }

    static getDerivedStateFromProps = (props, state) => {
        state.tag_values = props.tag_values
    }

    render () {

        return (
            <div className='tagView'>            
                <div className = 'tagDiagrm'>
                    <img className = 'tag_diagram_img' alt = 'tag_diagram_img' src = '../../../public/images/imagename' />
                </div>
                <div className = 'tags'>
                    <text className = 'tag1'>tag1: {this.state.tag_values[0]}</text>
                    <text className = 'tag2'>tag2: {this.state.tag_values[1]}</text> 
                    <text className = 'tag3'>tag3: {this.state.tag_values[2]}</text>
                    <text className = 'tag4'>tag4: {this.state.tag_values[3]}</text> 
                    <text className = 'tag5'>tag5: {this.state.tag_values[4]}</text>  
                </div>
            </div>
        )


    }    

}

export default TagView;