import React, { Component } from 'react'

import Header from '../Container/Header/Header'
import ReportAuth from '../Component/ReportAuth/ReportAuth'

class ReportAuthPage extends Component {
  render() {
    return (
      <div className='ReportAuthPage'>
        <Header />
        <ReportAuth />
      </div>
    );
  }
}

export default ReportAuthPage
