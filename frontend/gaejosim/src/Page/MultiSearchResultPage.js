import React, { Component } from "react";

import Header from "../Container/Header/Header";
import Searchbar from "../Component/Searchbar/Searchbar";
import MultiSearch from "../Component/MultiSearch";

import "./MultiSearchResultPage.css";

class MultiSearchResultPage extends Component {

  render() {
    let summonerArr = this.props.match.params.summonerList.split("-")
    let summonerList = summonerArr.join(",")
    console.log("on new page")
    return (
      <div className="MultiSearchResultPageMulti">
        <Header />
        <Searchbar />
        <MultiSearch summoners={summonerList}/>
      </div>
    );
  }
}

export default MultiSearchResultPage;
