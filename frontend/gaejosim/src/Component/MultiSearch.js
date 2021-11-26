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

  // Get five matchers information by /api/search/ call.
  getMatchers = async () => {
    console.log("call of getMatchers");
    console.log("state of getResult", this.state.getResult);

    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";

    axios.get("/api/token/").then();

    const url = `http://localhost:3000/api/search/`;
    console.log("call get request");
    const response = await axios.get(url, {
      params: {
        type: "multi",
        summoners: this.state.summoners,
      },
    });

    this.setState({
      matchers: response.data.matchers,
      getResult: true,
    });
  };

  render() {
    let matcherInfos;
    if (this.state.getResult === false) {
      console.log("call getMatchers");
      this.getMatchers();
    } else {
      let idx = 0;
      console.log("finished");
      matcherInfos = this.state.matchers.map((matcher) => {
        idx = idx + 1;
        let classIdx = "class" + idx;
        return (
          <div className={classIdx}>
            <CommonSearch
              summoner_name={matcher.summoner_name}
              tier={matcher.tier}
              rank={matcher.rank}
              manner_point={matcher.manner_point}
              tag_values={matcher.tag_values}
              win_lose={matcher.win_lose}
              recent_result={matcher.recent_result}
              num={idx}
            />
          </div>
        );
      });
    }
    return (
      <div className="MultiSearch">
        {!this.state.getResult && <div className="loading">loading...</div>}
        {this.state.getResult && (
          <div className="matchInfos">{matcherInfos}</div>
        )}
      </div>
    );
  }
}

export default MultiSearch;
