import React from 'react';

class RestaurantListPage extends React.Component {
  state = {
    numChoices: 5,
    filter: '',
    radius: null,
    choices: [],
  }

  handleGetMore = () => {
    this.setState({ numChoices: this.state.numChoices + 5 });
  }

  handleChangeFilter = e => {
    this.setState({ filter: e.target.value });
  }

  handleChangeRadius = e => {
    this.setState({ radius: e.target.value });
  }

  handleClickChange = e => {
    e.preventDefault();
    this.props.updateRadius(this.state.radius);
  }

  handleCheckbox = e => {
    const choiceIndex = Number(e.target.value);
    const newChoices = this.state.choices.filter(choice => choice !== choiceIndex);
    if (newChoices.length === this.state.choices.length) {
      this.setState({
        choices: [
          ...this.state.choices,
          choiceIndex,
        ],
      });
    } else {
      this.setState({ choices: newChoices });
    } 
  }

  handleDeselectAll = () => {
    for (let i = 0; i < this.state.numChoices; i++) {
      const element = document.getElementById(`choice_${i}`);
      if (element) {
        element.checked = false;
      }
    }

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
    const { error, locError } = this.props;
    const { radius } = this.props.values;
    const restaurants = this.props.values.restaurants.map((rest, idx) => {
      const type = (rest.foodTypes) ? rest.foodTypes.find(type => type.primary) : null;
      const item_cuisine = (type) ? type.name : 'Unknown';
      return {
        origIndex: idx,
        item_name: rest.title,
        item_address: `${rest.address.houseNumber} ${rest.address.street}, ${rest.address.city}, ${rest.address.stateCode}`,
        item_cuisine,
        item_link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(rest.address.label)}`,
      };
    });

    const filteredChoices = restaurants.filter(rest => (
      rest.item_cuisine.toLowerCase().includes(this.state.filter.toLowerCase()))
    );

    const restChoices = filteredChoices.slice(0, this.state.numChoices);
    const choices = restChoices.map((choice, idx) => {
      return (
        <div key={idx}>
          <input
            type="checkbox"
            name={`choice_${idx}`}
            id={`choice_${idx}`}
            value={choice.origIndex}
            onChange={this.handleCheckbox}
          />
          <label htmlFor={`choice_${idx}`}>
            {choice.item_name}
            <br />
            {choice.item_address}
            <br />
            {choice.item_cuisine}
            <br />
            <a href={choice.item_link} target="_blank" rel="noreferrer">More Info</a>
          </label>
        </div>
      );
    });

    return (
      <>
        <section>
          <h3>Choose Restaurants</h3>
          {error && <p className="error">{error}</p>}
          {locError && <p className="error">{locError}</p>}
          <label htmlFor="cuisine">Cuisine Filter: </label>
          <input type="text" name="cuisine" id="cuisine" onChange={this.handleChangeFilter} />
          <br />
          <form id="radius" onSubmit={this.handleClickChange}>
            <label htmlFor="radius">Search Radius (miles): </label>
            <input type="number" min="0.1" step="0.1" defaultValue="1" onChange={this.handleChangeRadius} />
          </form>
          <button type="submit" form="radius">Update Radius</button>
          <br />
          <p>Current radius: {radius} mi</p>
          <p>Showing {choices.length} out of {filteredChoices.length} matching restaurants</p>
          <form className="restaurants" id="restaurants" onSubmit={this.handleSubmit}>
            {choices}
          </form>
          <button type="button" onClick={this.handleSelectAll}>Select All</button>
          {' '}
          <button type="button" onClick={this.handleDeselectAll}>Deselect All</button>
          {' '}
          <button type="button" onClick={this.handleGetMore}>Get More Restaurants</button>
          <br />
          <button type="submit" form="restaurants">Add Selection to Poll</button>
          {' '}
          <button type="button" onClick={this.props.addItemStep}>Add Custom Restaurant</button>
          <br />
          <button type="button" onClick={this.props.prevStep}>Back</button>
          <button type="button" onClick={this.props.nextStep}>Next</button>
        </section>
      </>
    );
  }
}

RestaurantListPage.defaultProps = {
  values: {
    restaurants: [],
  },
}

export default RestaurantListPage;
