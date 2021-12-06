import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Header from "../Container/Header/Header";
import Searchbar from "../Component/Searchbar/Searchbar";
import Statistic from "../Component/Statistic/Statistic";

import "./SearchPage.css";
import Logo from "./../Assets/Images/GAEJOSIM.png";

class SearchPage extends Component {
  state = {
    clickReport: false,
  };

  onClickReportButton = () => {
    this.setState({ clickReport: true });
    this.props.history.push("/reportAuth");
  };

  render() {
    return (
      <div className="SearchPage">
        <img className="SearchPageLogo" alt="GAEJOSIM" src={Logo} />
        <Header />
        <div className="Background"></div>
        {/* <div className="Logo">Gaejosim</div> */}
        <div className="Searchbar_SearchPage">
          <Searchbar />
        </div>
        <button
          className="GoToReport"
          id="button"
          onClick={() => this.onClickReportButton()}
        >
          신고하기
        </button>
        <Statistic />
      </div>
    );
  }
}

export default withRouter(SearchPage);
