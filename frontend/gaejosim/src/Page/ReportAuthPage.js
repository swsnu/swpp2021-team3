import React, { Component } from "react";

import Header from "../Container/Header/Header";
// import Progressbar from '../Component/Progressbar/Progressbar';
import ReportAuth from "../Component/ReportAuth/ReportAuth";

class ReportAuthPage extends Component {
  render() {
    return (
      <div className="ReportAuthPage">
        <Header />
        {/* <Progressbar process="1"/> */}
        <ReportAuth />
      </div>
    );
  }
}

export default ReportAuthPage;
