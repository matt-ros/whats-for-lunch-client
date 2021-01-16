import React from 'react';

class RestaurantListPage extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.history.goBack();
  }
  render() {
    return (
      <>
        <header role="banner">
          <h1>What's For Lunch?</h1>
        </header>

        <section>
          <h2>Choose Restaurants</h2>
          <label htmlFor="cuisine">Filter by Cuisine: </label>
          <input type="text" name="cuisine" id="cuisine" /> <br />
          <label htmlFor="radius">Search Radius (miles): </label>
          <input type="number" min="0.1" step="0.1" defaultValue="2" />{' '}
          <button type="button">Change</button>
        </section>

        <section>
          <form onSubmit={this.handleSubmit}>
            <input type="checkbox" name="choice-1" id="choice-1" />
            <label htmlFor="choice-1">Restaurant 1, 123 Main St, Italian (<a href="#LinkToRestaurant1">Link</a>)</label> <br />
            <input type="checkbox" name="choice-2" id="choice-2" />
            <label htmlFor="choice-2">Restaurant 2, 456 Main St, Sushi (<a href="#LinkToRestaurant2">Link</a>)</label> <br />
            <input type="checkbox" name="choice-3" id="choice-3" />
            <label htmlFor="choice-3">Restaurant 3, 789 Main St, Sandwiches (<a href="#LinkToRestaurant3">Link</a>)</label> <br />
            <input type="checkbox" name="choice-4" id="choice-4" />
            <label htmlFor="choice-4">Restaurant 4, 321 Main St, Pizza (<a href="#LinkToRestaurant4">Link</a>)</label> <br />
            <input type="checkbox" name="choice-5" id="choice-5" />
            <label htmlFor="choice-5">Restaurant 5, 654 Main St, Burgers (<a href="#LinkToRestaurant5">Link</a>)</label>  <br />
            <button type="button">Get more restaurants</button>
            <button type="submit">Add restaurants to poll</button>
          </form>
        </section>
      </>
    );
  }
}

export default RestaurantListPage;
