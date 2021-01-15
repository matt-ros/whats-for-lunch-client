import React from 'react';
import { Link, Route } from 'react-router-dom';
import CreatePoll from '../CreatePoll/CreatePoll';
import LandingPage from '../LandingPage/LandingPage';
import PollPage from '../PollPage/PollPage';
import PollResultsPage from '../PollResultsPage/PollResultsPage';
import RestaurantListPage from '../RestaurantListPage/RestaurantListPage';

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
    </main>
  );
}

export default App;
