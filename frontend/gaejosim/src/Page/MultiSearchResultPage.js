import React, { Component } from "react";

import Header from "../Container/Header/Header";
import Searchbar from "../Component/Searchbar/Searchbar";
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
        <div className="Searchbar_MultiSearchPage">
          <Searchbar />
        </div>
        <MultiSearch summoners={this.state.summonerList} />
      </div>
    );
  }
}

export default MultiSearchResultPage;
