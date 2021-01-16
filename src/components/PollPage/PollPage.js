import React from 'react';

class PollPage extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    e.target.choice.value = null;
    this.props.history.push(`/results/${this.props.match.params.id}`);
  }

  render() {
    return (
      <>
        <header role="banner">
          <h1>What's For Lunch?</h1>
        </header>

        <section>
          <h2>Where do you want to eat?</h2>
          <form onSubmit={this.handleSubmit}>
            <input type="radio" name="choice" id="choice-1" required />
            <label htmlFor="choice-1">Restaurant 1, 123 Main St, Italian (<a href="#LinkToRestaurant1">Link</a>)</label> <br />
            <input type="radio" name="choice" id="choice-2" required />
            <label htmlFor="choice-2">Restaurant 2, 456 Main St, Sushi (<a href="#LinkToRestaurant2">Link</a>)</label> <br />
            <input type="radio" name="choice" id="choice-3" required />
            <label htmlFor="choice-3">Restaurant 3, 789 Main St, Sandwiches (<a href="#LinkToRestaurant3">Link</a>)</label> <br />
            <input type="radio" name="choice" id="choice-4" required />
            <label htmlFor="choice-4">Restaurant 4, 321 Main St, Pizza (<a href="#LinkToRestaurant4">Link</a>)</label> <br />
            <input type="radio" name="choice" id="choice-5" required />
            <label htmlFor="choice-5">Restaurant 5, 654 Main St, Burgers (<a href="#LinkToRestaurant5">Link</a>)</label> <br />
            <button type="submit">Vote!</button>
            <button type="button" onClick={e => this.props.history.push(`/results/${this.props.match.params.id}`)}>View Results</button>
          </form>
        </section>
      </>
    );
  }
}

export default PollPage;
