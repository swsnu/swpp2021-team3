import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import SignupPage from './Page/SignupPage'
import LoginPage from './Page/LoginPage'
import FindUserInfoPage from './Page/FindUserInfoPage'
import ChangePasswordPage from './Page/ChangePasswordPage'

import SearchPage from './Page/SearchPage'
import MultiSearchResultPage from './Page/MultiSearchResultPage'

import ReportAuthPage from './Page/ReportAuthPage'
import ReportActionPage from './Page/ReportActionPage'

import MyPage from './Page/MyPage'
import MyReportedLogsPage from './Page/MyReportedLogsPage'
import MyReportingLogsPage from './Page/MyReportingLogsPage'
import MyApologyCheckPage from './Page/MyApologyCheckPage'
import MyApologyWritePage from './Page/MyApologyWritePage'

import RiotPage from './Page/RiotPage'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route path = '/' exact component={SearchPage} />

          <Route path = '/signup' exact component = {SignupPage} />
          <Route path = '/login' exact component = {LoginPage} />
          <Route path = '/finduserinfo' exact component = {FindUserInfoPage} />
          <Route path = '/changepassword' exact component = {ChangePasswordPage} />

          <Route path = '/search' exact component = {SearchPage} />
          <Route path = '/searchresult/:summonerlist' exact component = {MultiSearchResultPage}/>

          <Route path = '/reportAuth' exact component = {ReportAuthPage} />
          <Route path = '/reportAction/:summonerid' exact component = {ReportActionPage} />

          <Route path = '/my' exact component = {MyPage} />
          <Route path = '/reportedlogs' exact component = {MyReportedLogsPage} />
          <Route path = '/reportinglogs' exact component = {MyReportingLogsPage} />
          
          <Route path = '/apologycheck/:reportid' exact component = {MyApologyCheckPage} />
          <Route path = '/apologywrite/:reportid' exact component = {MyApologyWritePage} />

          <Route path = '/riot/txt' exact component = {RiotPage} />

            <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
