import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import CreatePoll from '../CreatePoll/CreatePoll';
import EditPoll from '../EditPoll/EditPoll';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import PollPage from '../PollPage/PollPage';
import PollResultsPage from '../PollResultsPage/PollResultsPage';
import SignupPage from '../SignupPage/SignupPage';
import UserHomepage from '../UserHomepage/UserHomepage';
import Nav from '../Nav/Nav';
import WinnerPage from '../WinnerPage/WinnerPage';

class App extends React.Component {
  render() {
    return (
      <main className="App">
        <Route component={Nav} />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/create" component={CreatePoll} />
          <Route path="/poll/:id" component={PollPage} />
          <Route path="/results/:id" component={PollResultsPage} />
          <Route path="/winner/:id" component={WinnerPage} />
          <PublicOnlyRoute path="/login" component={LoginPage} />
          <PublicOnlyRoute path="/signup" component={SignupPage} />
          <PrivateRoute path="/homepage" component={UserHomepage} />
          <PrivateRoute path="/edit/:id" component={EditPoll} />
        </Switch>
      </main>
    );
  }
}

export default App;
