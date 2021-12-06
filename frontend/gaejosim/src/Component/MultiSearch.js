import React, { Component } from "react";
import CommonSearch from "./CommonSearch/CommonSearch";
import axios from "axios";

import "./MultiSearch.css";

class MultiSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summoners: props.summoners,
      matchers: [],
      getResult: false,
    };
  }

  getMatchers = async () => {
    console.log("call of getMatchers");
    console.log("state of getResult", this.state.getResult);

    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";

    axios.get("/api/token/").then();

    const url = "http://localhost:3000/api/search/";
    console.log("call axios.get request");
    const response = await axios
      .get(url, {
        params: {
          summoners: this.state.summoners,
        },
      })
      .then((res) => {
        console.log("response.data.matchers");
        console.log(res.data.matchers);
        this.setState({ matchers: res.data.matchers, getResult: true });
      });
  };

  // TODO: 한번만 콜하게 바꾸기
  render() {
    let matcherInfos;

    if (this.state.getResult === false) {
      this.getMatchers();
    } else {
      let idx = 0;
      matcherInfos = this.state.matchers.map((matcher) => {
        idx = idx + 1;
        let summonerIdx = "summoner" + idx;
        return (
          // <div className="summonerBox">
          <div className={summonerIdx} key={summonerIdx}>
            <CommonSearch
              summonerName={matcher.summoner_name}
              tier={matcher.tier}
              rank={matcher.rank}
              mannerPoint={matcher.manner_point}
              tagValues={matcher.tag_values}
              winLose={matcher.win_lose}
              recentResults={matcher.recent_result}
              num={idx}
            />
            {/* </div> */}
          </div>
        );
      });
    }
    return (
      <div className="MultiSearch">
        {!this.state.getResult && <div className="loading">Loading...</div>}
        {this.state.getResult && (
          <div className="matchInfos">{matcherInfos}</div>
        )}
      </div>
    );
  }
}

export default MultiSearch;
