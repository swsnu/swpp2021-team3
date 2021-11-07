import React, { Component } from "react";

import MatchMate from "./MatchMate/MatchMate";

class MatchMateList extends Component {
    state = {
        matchMateList : this.props.list
    }
    
    render() {
        const matchPlayers = this.state.matchMateList.map((player) => {   
            return (
                <MatchMate key={player.id} champion={player.champion} summonerID={player.summonerID} />
            )
        })
        return (
            <div className='matchMateList'>
                {matchPlayers}
            </div>
        )
    }
}

export default MatchMateList;