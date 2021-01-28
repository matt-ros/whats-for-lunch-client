import React from 'react';

class RestaurantListPage extends React.Component {
  state = {
    numChoices: 5,
    filter: '',
    radius: null,
    choices: []
  }

  handleGetMore = () => {
    this.setState({ numChoices: this.state.numChoices + 5 });
  }

  handleChangeFilter = e => {
    this.setState({ filter: e.target.value })
  }

  handleChangeRadius = e => {
    this.setState({ radius: e.target.value });
  }

  handleClickChange = () => {
    this.props.updateRadius(this.state.radius);
  }

  handleCheckbox = e => {
    const choiceIndex = Number(e.target.value);
    const newChoices = this.state.choices.filter(choice => choice !== choiceIndex);
    if (newChoices.length === this.state.choices.length) {
      this.setState({
        choices: [
          ...this.state.choices,
          choiceIndex
        ]
      });
    }
    else {
      this.setState({ choices: newChoices });
    }
  }

  handleDeselectAll = () => {
    const checkedItems = this.state.choices;
    checkedItems.forEach(index => {
      const element = document.getElementById(`choice_${index}`);
      element.checked = false;
    });
    this.setState({ choices: [] });
  }

  handleSelectAll = () => {
    const newChoices = [];
    for (let i = 0; i < this.state.numChoices; i++) {
      const element = document.getElementById(`choice_${i}`);
      if (element) {
        element.checked = true;
        newChoices.push(i);
      }
    }
    this.setState({ choices: newChoices });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.createPollItems(this.state.choices);
    this.handleDeselectAll();
  }

  render() {
    const restaurants = this.props.restaurants.map(rest => {
      const type = (rest.foodTypes) ? rest.foodTypes.find(type => type.primary) : null;
      const item_cuisine = (type) ? type.name : 'Unknown';
      return {
        item_name: rest.title,
        item_address: `${rest.address.houseNumber} ${rest.address.street}, ${rest.address.city}, ${rest.address.stateCode} ${rest.address.postalCode}`,
        item_cuisine,
        item_link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(rest.address.label)}`
      }
    });
    const filteredChoices = restaurants.filter(rest => rest.item_cuisine.toLowerCase().includes(this.state.filter.toLowerCase()));
    const restChoices = filteredChoices.slice(0, this.state.numChoices);
    const choices = restChoices.map((choice, idx) => {
      return (
        <div key={idx}>
          <input type="checkbox" name={`choice_${idx}`} id={`choice_${idx}`} value={idx} onChange={this.handleCheckbox} />
          <label htmlFor={`choice_${idx}`}>{choice.item_name}, {choice.item_address}, {choice.item_cuisine} (<a href={choice.item_link} target="_blank" rel="noreferrer">Google Maps</a>)</label>
          <br />
        </div>
      );
    });

    return (
      <>
        <section>
          <h2>Choose Restaurants</h2>
          <label htmlFor="cuisine">Filter by Cuisine: </label>
          <input type="text" name="cuisine" id="cuisine" onChange={this.handleChangeFilter} /> <br />
          <label htmlFor="radius">Search Radius (miles): </label>
          <input type="number" min="0.1" step="0.1" defaultValue="1" onChange={this.handleChangeRadius} />{' '}
          <button type="button" onClick={this.handleClickChange}>Change</button>
        </section>

        <section>
          <form onSubmit={this.handleSubmit}>
            {choices}
            <button type="button" onClick={this.handleSelectAll}>Select All</button> {' '}
            <button type="button" onClick={this.handleDeselectAll}>Deselect All</button> {' '}
            <button type="button" onClick={this.handleGetMore}>Get more restaurants</button> {' '}
            <button type="submit">Add restaurants to poll</button>
          </form>
        </section>
      </>
    );
  }
}

RestaurantListPage.defaultProps = {
  restaurants: []
}

export default RestaurantListPage;
