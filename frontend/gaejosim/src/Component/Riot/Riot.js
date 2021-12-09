import React, { Component } from 'react'
import axios from 'axios'


class Riot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyChain: '',
      getResult: false,
    }
  }

  getKeyData = async () => {

    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'

    axios.get('/api/token/').then()

    // TODO: change this to underline
    // await axios.get('/api/riot.txt/', {})
    await axios.get('/riot.txt/', {})
      .then((res) => {
        console.log(res.data)
        this.setState({ keyChain: res.data, getResult: true })
      })
  }

  
  render() {
    if(this.state.getResult === false) {
      this.getKeyData()
    }
    return (
      <div className='Riot'>
        {!this.state.getResult && <div className='loading'>Loading…</div>}
        {this.state.getResult && (<div className='keyChain'>{this.state.keyChain}</div>)}
      </div>
    )
  }
}

export default Riot