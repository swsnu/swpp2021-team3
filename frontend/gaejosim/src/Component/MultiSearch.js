import React, { Component } from "react";
import CommonSearch from "./CommonSearch/CommonSearch";

const MultiSearch = (props) => {
    return (
        <div className='multiSearch'>            
            {props.summoners}
        </div>
    )
}

export default MultiSearch;