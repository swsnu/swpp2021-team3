import React from "react";

import Result from './Result';
import './Result.css';

const ResultView = (props) => {
    return (
        <div className='resultView'>
            {/* W이나 L에 따라 색상 다르게 처리 */}
            {(props.win_lose === "W") &&
                <Result result={props.recent_result} win_lose={props.win_lose} />
            }
            {(props.win_lose === "L") &&
                <Result result={props.recent_result} win_lose={props.win_lose} />
            }
        </div>
    )
}

export default ResultView;