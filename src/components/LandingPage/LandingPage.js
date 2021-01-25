import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class LandingPage extends React.Component {
  componentDidMount() {
    if (this.props.location.state && this.props.location.state.loggedIn) {
      this.props.onLogin();
    }
  }
  
  render() {
    return (
      <main role="main">
        <header role="banner">
          <h1>What's For Lunch?</h1>
        </header>

        {(this.props.location.state && this.props.location.state.loggedIn)
          ? <Redirect to="/homepage" />
          : null}

        <section>
          Never have trouble deciding where to eat again!
        </section>

        <section>
          Create a poll with a list of local restaurants
        </section>

        <section>
          Send a link to your group
        </section>

        <section>
          After everyone votes, enjoy lunch at the winning spot!
        </section>
        
        <section>
          <Link to="/create">Create a Poll!</Link>
        </section>

        <section>
          Or, <Link to="/signup">Sign Up</Link> to be able to save and reuse polls!
        </section>

        <section>
          Already have an account?  <Link to="/login">Log In!</Link>
        </section>
      </main>
    );
  }
}

export default LandingPage;
