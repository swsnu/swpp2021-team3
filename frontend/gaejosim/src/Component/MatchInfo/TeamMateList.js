import React, { Component } from "react";

import TeamMate from "./TeamMate/TeamMate";

class TeamMateList extends Component {
    state = {
        teamMateList : this.props.list
    }
    
    render() {
        const teamPlayers = this.state.teamMateList.map((player) => {   
            return (
                <TeamMate key={player.id} summonerID={player.summonerID} champion={player.champion} 
                    KDA={player.KDA} tier={player.tier} line={player.line} />
            )
        })
        return (
            <div className='teamMateList'>
                {teamPlayers}
            </div>
        )
    }
}

export default TeamMateList;