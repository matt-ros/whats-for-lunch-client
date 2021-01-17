import React from 'react';
import { Link } from 'react-router-dom';

class UserHomepage extends React.Component {
  render() {
    return (
      <>
        <header role="banner">
          <h1>What's For Lunch?</h1>
        </header>

        <section>
          <h2>Welcome, [Username]!</h2>
        </section>

        <section>
          <h3>Saved Polls</h3>
          <Link to="/edit/1">Poll 1</Link> <br />
          <Link to="/edit/2">Poll 2</Link> <br />
          <Link to="/edit/3">Poll 3</Link> <br />
          <Link to="/edit/4">Poll 4</Link> <br />
          <Link to="/edit/5">Poll 5</Link>
        </section>

        <section>
          <Link to="/create">Create New Poll</Link>
        </section>
      </>
    );
  }
}

export default UserHomepage;
