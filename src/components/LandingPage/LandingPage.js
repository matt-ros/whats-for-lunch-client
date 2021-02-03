import React from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends React.Component {
  render() {
    return (
      <>
        <header role="banner">
          <h1>What's For Lunch?</h1>
        </header>
        
        <section>
          Create a poll with a list of local restaurants
          <br />
          <br />
          Send a link to your group
          <br />
          <br />
          After everyone votes, enjoy lunch at the winning spot!
          <br />
          <br />
          Never have trouble deciding where to eat again!
          
          <h2><Link to="/create" className="landing">Get Started!</Link></h2>
        </section>
      </>
    );
  }
}

export default LandingPage;
