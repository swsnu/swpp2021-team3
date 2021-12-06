import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import axios from 'axios'

import './ReportAction.css'

// TODO : Check here if you want to how to visualize MUI : https://mui.com/components/slider/

class ReportAction extends Component {
  constructor(props) {
    super(props)
    let reportedSummoner = this.props.match.params.summonerID
    this.state = {
      reported_summoner: reportedSummoner, 
      comment: '',
      evaluation: 50,
      clickTag1_1: false,
      clickTag1_2: false,
      clickTag2_1: false,
      clickTag2_2: false,
      clickTag3_1: false,
      clickTag3_2: false,
      clickTag4_1: false,
      clickTag4_2: false,
      clickTag5_1: false,
      clickTag5_2: false,
      clickTags: [],
      clickCancel: false,
      clickSubmit: false,
    }
  }

  onClickCancelButton = () => {
    this.setState({ clickCancel: true });
  };

  onClickSubmitButton = () => {
    let clickList = [
      this.state.clickTag1_1, this.state.clickTag1_2,
      this.state.clickTag2_1, this.state.clickTag2_2,
      this.state.clickTag3_1, this.state.clickTag3_2,
      this.state.clickTag4_1, this.state.clickTag4_2,
      this.state.clickTag5_1, this.state.clickTag5_2,
    ]

    let tagList = [
      '과격한 언행', '비속어 사용',
      '고의성 던짐', '탈주/닷지',
      '대리 게임', '픽 상황 갑질',
      'cs 스틸', '팀킬',
      '정치', '라인 거부',
    ]

    let clickArr = []
    for (let idx = 0; idx < 10; idx++) {
      if (clickList[idx]) clickArr.push(tagList[idx]);
    }

    console.log(clickArr);
    this.state.clickTags = clickArr.join(',')
    // this.setState({clickTags : clickArr.join(',')})
    console.log(this.state.clickTags)

    if (this.state.clickTags.length === 0) {
      alert('제출을 위해 하나 이상의 태그를 선택하셔야 합니다.')
      this.setState({ clickSubmit: false })
    } else {
      this.postReportData();
      this.setState({ clickSubmit: true })
    }
  };

  postReportData = async () => {
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'

    axios.get('/api/token/').then()

    await axios.post('/api/reports/', {
        name: this.state.reported_summoner,
        evaluation: parseInt(this.state.evaluation),
        tag: this.state.clickTags,
        comment: this.state.comment,
    })
      .then((response) => {
        console.log(JSON.stringify(response.data))
        alert('성공적으로 제출하였습니다.\n검색 페이지로 이동합니다.')
        this.props.history.push('/search')
      })
      .catch((error) => {
        alert(error.response.data.error)
      })
  };

  onClickTagButton = (tag) => {
    switch (tag) {
      case '1_1':
        this.setState({ clickTag1_1: !this.state.clickTag1_1 })
        break
      case '1_2':
        this.setState({ clickTag1_2: !this.state.clickTag1_2 })
        break
      case '2_1':
        this.setState({ clickTag2_1: !this.state.clickTag2_1 })
        break
      case '2_2':
        this.setState({ clickTag2_2: !this.state.clickTag2_2 })
        break
      case '3_1':
        this.setState({ clickTag3_1: !this.state.clickTag3_1 })
        break
      case '3_2':
        this.setState({ clickTag3_2: !this.state.clickTag3_2 })
        break
      case '4_1':
        this.setState({ clickTag4_1: !this.state.clickTag4_1 })
        break
      case '4_2':
        this.setState({ clickTag4_2: !this.state.clickTag4_2 })
        break
      case '5_1':
        this.setState({ clickTag5_1: !this.state.clickTag5_1 })
        break
      case '5_2':
        this.setState({ clickTag5_2: !this.state.clickTag5_2 })
        break
      default:
        return
    }
    return
  }

  render() {
    let redirect = null
    if (this.state.clickCancel) {
      redirect = <Redirect to={`/`} />;
    }
    if (this.state.clickSubmit) {
      redirect = <Redirect to={`/`} />;
    }


    return (
      <div className = 'ReportAction'>
        {redirect}
        <div className = 'LeftBarStyle2'>
          <div className = 'LeftText2'>step1</div>
        </div>
        <div className = 'RightBarStyle2'>
          <div className = 'RightText2'>step2</div>
        </div>
        {/* <div className='Box1'> */}
        <h3 id = 'MannerPoint'>매너포인트</h3>
        <Box id ='MannerPointInput' sx = {{ width: 700 }}>
          <Slider
            aria-label = 'MannerPoint'
            defaultValue = {50}
            valueLabelDisplay = 'auto'
            step = {10}
            // marks={marks}
            min = {0}
            max = {100}
            color = 'secondary'
            // color='#000000'
            onChange = {(event) => this.setState({ evaluation: event.target.value })}
          />
          {/* <div id='evaluation'>{this.state.evaluation}점</div> */}
          <div id = 'evaluation_0'>0</div>
          <div id = 'evaluation_100'>100</div>
        </Box>
        {/* </div> */}
        {/* <div className='Box2'> */}
        <h3 id = 'Tag'>태그</h3>
        <div className = 'TagsButtonContainer'>
          <button
            className = 'Tag1_1Button'
            id = 'tagbutton'
            onClick = {() => this.onClickTagButton('1_1')}
          >
            {this.state.clickTag1_1 !== false ? '과격한 언행 V' : '과격한 언행'}
          </button>
          <button
            className = 'Tag1_2Button'
            id = 'tagbutton'
            onClick = {() => this.onClickTagButton('1_2')}
          >
            {this.state.clickTag1_2 !== false ? '비속어 사용 V' : '비속어 사용'}
          </button>
          <button
            className = 'Tag2_1Button'
            id = 'tagbutton'
            onClick = {() => this.onClickTagButton('2_1')}
          >
          {this.state.clickTag2_1 !== false ? '고의성 게임 던짐 V' : '고의성 게임 던짐'}
          </button>
          <button
            className = 'Tag2_2Button'
            id = 'tagbutton'
            onClick = {() => this.onClickTagButton('2_1')}
          > 
          {this.state.clickTag2_2 !== false ? '탈주/닷지 V' : '탈주/닷지'}
          </button>
          <button
            className = 'Tag3_1Button'
            id = 'tagbutton'
            onClick = {() => this.onClickTagButton('3_1')}
          > 
          {this.state.clickTag3_1 !== false ? '대리 게임 V' : '대리 게임'}
          </button>
          <button
            className = 'Tag3_2Button'
            id = 'tagbutton'
            onClick = {() => this.onClickTagButton('3_2')}
          >
          {this.state.clickTag3_2 !== false ? '픽 상황 갑질 V': '픽 상황 갑질'}
          </button>
          <button
            className = 'Tag4_1Button'
            id = 'tagbutton'
            onClick = {() => this.onClickTagButton('4_1')}
          >
          {this.state.clickTag4_1 !== false ? 'cs 스틸 V' : 'cs 스틸'}
          </button>
          <button
            className = 'Tag4_2Button'
            id = 'tagbutton'
            onClick = {() => this.onClickTagButton('4_2')}
          >
          {this.state.clickTag4_2 !== false ? '정치 V' : '정치'}
          </button>
          <button
            className = 'Tag5_1Button'
            id = 'tagbutton'
            onClick = {() => this.onClickTagButton('5_1')}
          >
          {this.state.clickTag5_1 !== false ? '방관 V' : '방관'}
          </button>
          <button
            className = 'Tag5_2Button'
            id = 'tagbutton'
            onClick = {() => this.onClickTagButton('5_2')}
          >
          {this.state.clickTag5_2 !== false ? '라인 스왑 V' : '라인 스왑'}
          </button>
        </div>
        <div>
          <h3 id='Comment'>한줄평</h3>
          <input
            id = 'CommentInput'
            placeholder = '게임 내 해당 플레이어가 보였던 행동에 대해 기술하세요.'
            value = {this.state.comment}
            style={{fontSize: '10px'}}
            onChange = {(event) => this.setState({ comment: event.target.value })}
          />
        </div>
        <button
          className = 'submitButton'
          id = 'submit'
          onClick = {() => this.onClickSubmitButton()}
        >
        제출
        </button>
        <button
          className = 'cancelButton'
          id = 'cancel'
          onClick = {() => this.onClickCancelButton()}
        >
        취소
        </button>
      </div>
    );
  }
}

export default withRouter(ReportAction)
