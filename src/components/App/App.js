import React from 'react';
import { Link, Route } from 'react-router-dom';
import CreatePoll from '../CreatePoll/CreatePoll';
import EditPoll from '../EditPoll/EditPoll';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import PollPage from '../PollPage/PollPage';
import PollResultsPage from '../PollResultsPage/PollResultsPage';
import RestaurantListPage from '../RestaurantListPage/RestaurantListPage';
import SignupPage from '../SignupPage/SignupPage';
import UserHomepage from '../UserHomepage/UserHomepage';

function App() {
  return (
    <main className="App">
      <nav>
        <Link to="/">Home</Link>
      </nav>

      <Route exact path="/" component={LandingPage} />
      <Route path="/create" component={CreatePoll} />
      <Route path="/poll/:id" component={PollPage} />
      <Route path="/results/:id" component={PollResultsPage} />
      <Route path="/restaurants" component={RestaurantListPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/homepage" component={UserHomepage} />
      <Route path="/edit/:id" component={EditPoll} />
    </main>
  );
}

export default App;
