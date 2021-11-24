import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import FindUserInfoPage from "./Page/FindUserInfoPage";
import LoginPage from "./Page/LoginPage";
import MultiSearchResultPage from "./Page/MultiSearchResultPage";
import MyPage from "./Page/MyPage";
import MyReportedLogsPage from "./Page/MyReportedLogsPage";
import MyReportingLogsPage from "./Page/MyReportingLogsPage";
import MyApologyCheckPage from "./Page/MyApologyCheckPage";
import MyApologyWritePage from "./Page/MyApologyWritePage";
import MyReportPage from "./Page/MyReportPage";
import ReportAuthPage from "./Page/ReportAuthPage";
import ReportActionPage from "./Page/ReportActionPage";
import SearchPage from "./Page/SearchPage";
import SignupPage from "./Page/SignupPage";

// TODO: page 내부에 폴더 만들어 가시성 높이기

function App() {
  return (
    <div className = "App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SearchPage} />
          <Route path="/search" exact component={SearchPage} />
          <Route path="/findUserInfo" exact component={FindUserInfoPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route
            path="/searchresult/:summonerList"
            exact
            component={MultiSearchResultPage}
          />
          <Route path="/my" exact component={MyPage} />
          <Route path="/myReportedLogs" exact component={MyReportedLogsPage} />
          <Route
            path="/myReportingLogs"
            exact
            component={MyReportingLogsPage}
          />
          <Route path="/myApologyCheck" exact component={MyApologyCheckPage} />
          <Route path="/myApologyWrite" exact component={MyApologyWritePage} />
          <Route path="/myReport" exact component={MyReportPage} />
          <Route path="/reportAuth" exact component={ReportAuthPage} />
          <Route
            path="/reportAction/:summonerID"
            exact
            component={ReportActionPage}
          />
          <Route path="/signup" exact component={SignupPage} />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
