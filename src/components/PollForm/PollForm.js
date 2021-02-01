import React from 'react';
import HereApiService from '../../services/here-api-service';
import PollsApiService from '../../services/polls-api-service';
import ItemsApiService from '../../services/items-api-service';
import RestaurantListPage from '../RestaurantListPage/RestaurantListPage';
import TokenService from '../../services/token-service';

class PollForm extends React.Component {
  state = {
    lat: null,
    long: null,
    radius: 1,
    restaurants: [],
    items: [],
    error: null,
    locError: null,
  }

  async componentDidUpdate() {
    if (this.props.poll && this.state.items.length === 0) {
      try {
        const items = await ItemsApiService.getItems(this.props.poll.id);
        this.setState({ items });
      }
      catch (res) {
        this.setState({ error: res.error });
      }
    }
  }

  handleSubmitLocation = async (e) => {
    e.preventDefault();
    this.setState({ locError: null });
    const { location } = e.target;
    try {
      const data = await HereApiService.geoSearch(location.value);
      this.setState({
        lat: data.items[0].position.lat,
        long: data.items[0].position.lng
      }, this.restaurantSearch);
    }
    catch (res) {
      this.setState({ locError: res.error });
    }
  }

  handleCurrentLocation = e => {
    this.setState({ locError: null });
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(`current location ${pos.coords.latitude}, ${pos.coords.longitude}`)
      this.setState({
        lat: pos.coords.latitude,
        long: pos.coords.longitude
      }, this.restaurantSearch);
    }, this.logError, { timeout: 5000 });
  }

  restaurantSearch = async () => {
    try {
      const response = await HereApiService.restaurantSearch(this.state.lat, this.state.long, this.state.radius);
      console.log(response);
      this.setState({
        restaurants: response.items
      });
    } catch (res) {
      return this.setState({ error: res.error });
    }
  }

  createPollItems = indices => {
    const items = [];
    indices.forEach(index => {
      const rest = this.state.restaurants[index];
      const type = (rest.foodTypes) ? rest.foodTypes.find(type => type.primary) : null;
      const item_cuisine = (type) ? type.name : 'Unknown';
      const item = {
        item_name: rest.title,
        item_address: `${rest.address.houseNumber} ${rest.address.street}, ${rest.address.city}, ${rest.address.stateCode}`,
        item_cuisine,
        item_link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(rest.address.label)}`
      };
      items.push(item);
    });
    this.setState({
      items: [
        ...this.state.items,
        ...items
      ]
    });
  }

  updateRadius = radius => {
    this.setState({ radius }, this.restaurantSearch);
  }

  logError = (err) => {
    this.setState({ locError: err.message });
  }

  renderPollNameField() {
    return (
      <section>
        <label htmlFor="pollName">Poll Name: </label>
        <input
          type="text"
          name="pollName"
          id="pollName"
          onChange={this.handleChangePollName}
          defaultValue={(this.props.poll) ? this.props.poll.poll_name : ''}
        />
      </section>
    );
  }

  handleChangePollName = e => {
    this.setState({ pollName: e.target.value });
  }

  handleSubmitItem = e => {
    e.preventDefault();
    const { item_name, item_address, item_cuisine, item_link } = e.target;
    const newItem = {
      item_name: item_name.value,
      item_address: item_address.value,
      item_cuisine: item_cuisine.value,
      item_link: item_link.value,
    };
    this.setState({
      items: [
        ...this.state.items,
        newItem,
      ]
    });
    item_name.value = '';
    item_address.value = '';
    item_cuisine.value = '';
    item_link.value = '';
  }

  handleClickDelete = async (idx) => {
    const itemId = (this.state.items[idx].id) ? this.state.items[idx].id : null;
    const newPollItems = this.state.items.filter((_, index) => index !== idx);
    this.setState({ items: newPollItems });
    if (itemId) {
      try {
        await ItemsApiService.deleteItem(itemId);
      }
      catch (res) {
        this.setState({ error: res.error });
      }
    }
  }

  handleClickPublish = async () => {
    if (this.state.items.length === 0) {
      return this.setState({ error: 'Please add some items to your poll' });
    }
    const newPoll = {
      poll_name: (this.state.pollName) ? this.state.pollName : '',
      end_time: (this.state.endTime) ? this.state.endTime : new Date(Date.now() + (60 * 60 * 1000)),
    }
    try {
      const poll = await PollsApiService.postPoll(newPoll);
      await ItemsApiService.postItems(poll.id, this.state.items);
      this.props.history.push(`/poll/${poll.id}`);
    }
    catch (res) {
      this.setState({ error: res.error });
    }
  }

  handleClickUpdate = async () => {
    if (this.state.items.length === 0) {
      return this.setState({ error: 'Please add some items to your poll' });
    }
    const updateFields = {
      poll_name: (this.state.pollName) ? this.state.pollName : '',
      end_time: (this.state.endTime) ? this.state.endTime : new Date(Date.now() + (60 * 60 * 1000)),
    }
    const newItems = this.state.items.filter(item => !item.id);
    try {
      await PollsApiService.patchPoll(this.props.poll.id, updateFields);
      await ItemsApiService.resetVotes(this.props.poll.id);
      if (newItems.length > 0) {
        await ItemsApiService.postItems(this.props.poll.id, newItems);
      }
      this.props.history.push(`/poll/${this.props.poll.id}`);
    }
    catch (res) {
      this.setState({ error: res.error });
    }
  }

  handleUpdateTime = e => {
    e.preventDefault();
    const { hours, minutes } = e.target;
    const actualHours = Number(hours.value) + (Number(minutes.value) / 60);
    this.setState({ endTime: new Date(Date.now() + (actualHours * 60 * 60 * 1000)) });
  }

  render() {
    const { error, locError } = this.state;
    const endTime = (this.state.endTime) ? this.state.endTime : new Date(Date.now() + (60 * 60 * 1000));
    const pollItems = this.state.items.map((item, idx) => {
      const linkText = (item.item_link.toLowerCase().includes('google.com/maps')) ? 'Google Maps' : 'Link';
      return (
        <li key={idx}>
          {item.item_name} <br />
          {item.item_address} <br />
          {item.item_cuisine} <br />
          (<a href={item.item_link} target="_blank" rel="noreferrer">{linkText}</a>) <br />
          <button type="button" onClick={e => this.handleClickDelete(idx)}>Delete</button>
          <br />
          <br />
        </li>
      );
    });

    return (
      <>
        {error && <p className="error">{error}</p>}
        {TokenService.hasUnexpiredAuthToken()
          ? this.renderPollNameField()
          : null
        }

        <section>
          {locError && <p className="error">{locError}</p>}
          <form onSubmit={this.handleSubmitLocation}>
            <fieldset className="location">
              <legend>Restaurant Search</legend>
              <label htmlFor="location">Location: </label>
              <input type="text" name="location" id="location" /> {' '}
              <button type="submit">Search</button> {' '}
              <button type="button" onClick={this.handleCurrentLocation}>Use Current Location</button>
            </fieldset>
          </form>
        </section>

        {
          !!this.state.restaurants.length &&
          <RestaurantListPage
            restaurants={this.state.restaurants}
            currentRadius={this.state.radius}
            updateRadius={this.updateRadius}
            createPollItems={this.createPollItems}
          />
        }

        <section>
          <form onSubmit={this.handleSubmitItem}>
            <fieldset className="add-item">
              <legend>Add Item to Poll</legend>
              <label htmlFor="item_name">Name: </label>
              <input type="text" name="item_name" id="item_name" placeholder="Mos Eisley Cantina" required /> <br />
              <label htmlFor="item_address">Address: </label>
              <input type="text" name="item_address" id="item_address" placeholder="100 Mos Eisley Ave, Mos Eisley, Tatooine" /> <br />
              <label htmlFor="item_cuisine">Cuisine: </label>
              <input type="text" name="item_cuisine" id="item_cuisine" placeholder="Bar Food" /> <br />
              <label htmlFor="item_link">Link: </label>
              <input type="url" name="item_link" id="item_link" placeholder="http://www.moseisleycantina.com" /> <br />
            </fieldset>
            <button type="submit">Add</button>
          </form>
        </section>

        <section>
          <form onSubmit={this.handleUpdateTime}>
            <fieldset className="duration">
              <legend>Poll Duration</legend>
              <label htmlFor="hours">Hours: </label>
              <input type="number" name="hours" id="hours" min="0" defaultValue="1" /> {' '}
              <label htmlFor="minutes">Minutes: </label>
              <input type="number" name="minutes" id="minutes" min="0" max="55" step="5" defaultValue="0" /> {' '}
              <button type="submit">Update</button>
            </fieldset>
            <p>Expires {endTime.toLocaleString(
              [],
              {
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              }
            )}</p>
          </form>
        </section>

        <section>
          <h2>Poll Preview</h2>
          <ul>
            {pollItems}
          </ul>
        </section>
        
        <section>
          {error && <p className="error">{error}</p>}
          {(this.props.poll)
            ? <button type="button" onClick={this.handleClickUpdate}>Update Poll</button>
            : <button type="button" onClick={this.handleClickPublish}>Publish Poll</button>
          } {' '}
          <button type="button" onClick={e => this.props.history.goBack()}>Cancel</button>
        </section>
      </>
    );
  }
}

export default PollForm;
