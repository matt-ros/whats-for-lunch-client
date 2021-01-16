import React from 'react';

class PollResultsPage extends React.Component {
  render() {
    return (
      <>
        <header role="banner">
          <h1>What's For Lunch?</h1>
        </header>

        <section>
          <h2>Poll Results</h2>
          <ul>
            <li>Restaurant 1, 123 Main St, Italian (<a href="#LinkToRestaurant1">Link</a>): 5 Votes</li>
            <li>Restaurant 2, 456 Main St, Sushi (<a href="#LinkToRestaurant2">Link</a>): 2 Votes</li>
            <li>Restaurant 3, 789 Main St, Sandwiches (<a href="#LinkToRestaurant3">Link</a>): 2 Votes</li>
            <li>Restaurant 4, 321 Main St, Pizza (<a href="#LinkToRestaurant4">Link</a>): 0 Votes</li>
            <li>Restaurant 5, 654 Main St, Burgers (<a href="#LinkToRestaurant5">Link</a>): 1 Vote</li>
          </ul>
          <button type="button" onClick={e => this.props.history.push(`/poll/${this.props.match.params.id}`)}>Vote in this Poll</button>
        </section>
      </>
    );
  }
}

export default PollResultsPage;
