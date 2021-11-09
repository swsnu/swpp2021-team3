import React from "react";

import Result from './Result';

const ResultView = (props) => {
    return (
        <div className='resultView'>    
            {/* W이나 L에 따라 색상 다르게 처리 */}
            {(props.win_lose === "W") && 
                <Result result = {props.recent_result}/>
            } 
            {(props.win_lose === "L") && 
                <Result result = {props.recent_result}/>
            } 
        </div>
    )
}

export default ResultView;