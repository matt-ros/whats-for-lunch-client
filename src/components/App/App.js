import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TokenService from '../../services/token-service';
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
  state = {
    loggedIn: false,
  }

  componentDidMount() {
    this.setState({ loggedIn: TokenService.hasUnexpiredAuthToken() });
  }

  onLogout = () => {
    this.setState({ loggedIn: false });
  }

  onLogin = () => {
    this.setState({ loggedIn: true });
  }

  render() {
    return (
      <main className="App">
        <Route
          render={(routeProps) => 
            <Nav
              history={routeProps.history}
              onLogout={this.onLogout}
            />
          }
        />
        <Switch>
          <Route
            exact path="/"
            render={(routeProps) => 
              <LandingPage
                location={routeProps.location}
                onLogin={this.onLogin}
              /> 
            }
          />
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
