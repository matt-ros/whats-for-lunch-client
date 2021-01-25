import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
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

class App extends React.Component {
  state = {
    loggedIn: false,
  }

  componentDidMount() {
    this.setState({ loggedIn: TokenService.hasUnexpiredAuthToken() });
  }

  onLogout = () => {
    TokenService.clearAuthToken();
    this.setState({ loggedIn: false });
  }

  onLogin = () => {
    this.setState({ loggedIn: true });
  }

  renderLoggedIn() {
    return (
      <nav>
        <Link to="/homepage">Home</Link> | <button type="button" onClick={this.onLogout}>Log Out</button>
      </nav>
    );
  }

  renderLoggedOut() {
    return (
      <nav>
        <Link to="/">Home</Link>
      </nav>
    );
  }

  render() {
    return (
      <main className="App">
        {(this.state.loggedIn)
          ? this.renderLoggedIn()
          : this.renderLoggedOut()
        }
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
