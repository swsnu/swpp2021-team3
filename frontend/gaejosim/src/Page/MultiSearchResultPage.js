import React, { Component } from "react";

import Header from "../Container/Header/Header";
import SearchbarForMulti from "../Component/SearchbarForMulti/SearchbarForMulti";
import MultiSearch from "../Component/MultiSearch";

import "./MultiSearchResultPage.css";

class MultiSearchResultPage extends Component {
  state = {
    summonerList: "",
  };

  constructor(props) {
    super(props);
    let summonerArr = this.props.match.params.summonerList.split("-");
    this.state.summonerList = summonerArr.join(",");
  }

  render() {
    return (
      <div className="MultiSearchResultPageMulti">
        <Header />
        <SearchbarForMulti />
        <MultiSearch summoners={this.state.summonerList} />
      </div>
    );
  }
}

export default MultiSearchResultPage;
