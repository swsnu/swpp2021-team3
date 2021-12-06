import React, { Component } from "react";
import My from "../Component/My/My";
import Header from '../Container/Header/Header';

class MyPage extends Component {
  render() {
    return (
      <div className="MyPage">        
        <Header />
        <My />
      </div>
    );
  }
}

export default MyPage;
