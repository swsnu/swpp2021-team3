import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';


import FindUserInfoPage from './Page/FindUserInfoPage';
import LoginPage from './Page/LoginPage';
import MultiSearchResultPage from './Page/MultiSearchResultPage';
import MyPage from './Page/MyPage';
import MyReportPage from './Page/MyReportPage';
import ReportAuthPage from './Page/ReportAuthPage';
import ReportActionPage from './Page/ReportActionPage';
import SearchPage from './Page/SearchPage';
import SignupPage from './Page/SignupPage';
import SingleSearchResultPage from './Page/SingleSearchResultPage';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
            <Route path='/' exact component={SearchPage} />
            <Route path='/search' exact component={SearchPage} />
            <Route path='/findUserInfo' exact component={FindUserInfoPage} />
            <Route path='/login' exact component={LoginPage} />
            <Route path='/multiSearchResult/:summonerList' exact component={MultiSearchResultPage} />
            <Route path='/my' exact component={MyPage} />
            <Route path='/myReport' exact component={MyReportPage} />
            <Route path='/reportAuth' exact component={ReportAuthPage} />
            <Route path='/reportAction' exact component={ReportActionPage} />
            <Route path='/signup' exact component={SignupPage} />
            <Route path='/singleSearchResult/:summonerID' exact component={SingleSearchResultPage} />
            <Route render={() => <h1>Not Found</h1>} />
          </Switch>
        </BrowserRouter>
    </div>
  );
}

//git test

export default App;
