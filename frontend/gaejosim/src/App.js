import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SignupPage from "./Page/SignupPage";
import LoginPage from "./Page/LoginPage";
import FindUserInfoPage from "./Page/FindUserInfoPage";
import ChangePasswordPage from "./Page/ChangePasswordPage";

import SearchPage from "./Page/SearchPage";
import MultiSearchResultPage from "./Page/MultiSearchResultPage";

import ReportAuthPage from "./Page/ReportAuthPage";
import ReportActionPage from "./Page/ReportActionPage";

import MyPage from "./Page/MyPage";
import MyReportedLogsPage from "./Page/MyReportedLogsPage";
import MyReportingLogsPage from "./Page/MyReportingLogsPage";
import MyApologyCheckPage from "./Page/MyApologyCheckPage";
import MyApologyWritePage from "./Page/MyApologyWritePage";

// TODO: change url names in lowercase


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SearchPage} />

          <Route path="/signup" exact component={SignupPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/finduserinfo" exact component={FindUserInfoPage} />
          <Route path="/changepassword" exact component={ChangePasswordPage} />

          <Route path="/search" exact component={SearchPage} />
          <Route
            path="/searchresult/:summonerList"
            exact
            component={MultiSearchResultPage}
          />

          <Route path="/reportAuth" exact component={ReportAuthPage} />
          <Route path="/reportAction/:summonerID" exact component={ReportActionPage}/>

          <Route path="/my" exact component={MyPage} />
          <Route path="/myReportedLogs" exact component={MyReportedLogsPage} />
          <Route path="/myReportingLogs" exact component={MyReportingLogsPage} />
          <Route path="/myApologyCheck" exact component={MyApologyCheckPage} />
          <Route path="/myApologyWrite" exact component={MyApologyWritePage} />
          
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
