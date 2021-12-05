import React, { Component } from "react";

// import TagView from "./TagView/TagView";
import Result from "./Result/Result";
import tagdiagram_1 from "./tagDiagrams/diagram_1.png";
import tagdiagram_2 from "./tagDiagrams/diagram_2.png";
import tagdiagram_3 from "./tagDiagrams/diagram_3.png";
import tagdiagram_4 from "./tagDiagrams/diagram_4.png";
import tagdiagram_5 from "./tagDiagrams/diagram_5.png";

import "./CommonSearch.css";

// TODO: tag diagram 형성하기

class CommonSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summonerName: props.summonerName,
      tier: props.tier,
      rank: props.rank,
      mannerPoint: props.mannerPoint,
      tagValues: props.tagValues,
      recentResults: props.recentResults,
      winLose: props.winLose,
      num: props.num,
    };
  }

  render() {
    const winLoseArr = this.state.winLose;
    let idx = -1;
    const resultViews = this.state.recentResults.map((result) => {
      idx = idx + 1;
      return <Result key={idx} result={result} winLose={winLoseArr[idx]} />;
    });
    console.log(this.state.num);

    return (
      <div className="boxStyle1">
        {/* tagdiagrm tagview로 바꾸기 */}
        {/* <div className = 'tag_values'>
                    <TagView tag_values={this.state.tag_values}/>
                </div> */}
        {this.state.num === 1 && (
          <img className="diagram_1" src={tagdiagram_1} alt="tagdiagram_1" />
        )}
        {this.state.num === 2 && (
          <img className="diagram_2" src={tagdiagram_2} alt="tagdiagram_2" />
        )}
        {this.state.num === 3 && (
          <img className="diagram_3" src={tagdiagram_3} alt="tagdiagram_3" />
        )}
        {this.state.num === 4 && (
          <img className="diagram_4" src={tagdiagram_4} alt="tagdiagram_4" />
        )}
        {this.state.num === 5 && (
          <img className="diagram_5" src={tagdiagram_5} alt="tagdiagram_5" />
        )}

        <div className="SummonerInfo">
          <p className="Summoner">
            <b className="nameStyle1">{this.state.summonerName}</b>
            <img
              className="tierImg"
              alt="tier_img"
              src={
                process.env.PUBLIC_URL +
                `/images/tiers/tier_${this.state.tier}.png`
              }
            />
            {/* <b className="tier">{this.state.tier}</b>
            <b className="rank">{this.state.rank}</b>
            <div className="manner_point_text">
              MP: {this.state.mannerPoint}
            </div> */}
            <div className="tier">
              {this.state.tier}, {this.state.rank}, MP:{this.state.mannerPoint}
            </div>
            {/* <div className="recent_results">{resultViews}</div> */}
          </p>
          <div className="recent_results">{resultViews}</div>
        </div>
      </div>
    );
  }
}

export default CommonSearch;
