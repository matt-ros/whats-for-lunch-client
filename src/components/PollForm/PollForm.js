import React from 'react';
import HereApiService from '../../services/here-api-service';
import PollsApiService from '../../services/polls-api-service';
import ItemsApiService from '../../services/items-api-service';
import RestaurantListPage from '../RestaurantListPage/RestaurantListPage';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_red.css';
import TokenService from '../../services/token-service';

class PollForm extends React.Component {
  state = {
    lat: null,
    long: null,
    radius: 1,
    restaurants: [],
    items: [],
    error: null
  }

  async componentDidUpdate() {
    if (this.props.poll && this.state.items.length === 0) {
      try {
        const items = await ItemsApiService.getItems(this.props.poll.id);
        this.setState({ items });
      }
      catch (error) {
        this.logError(error);
      }
    }
  }

  handleSubmitLocation = async (e) => {
    e.preventDefault();
    this.setState({ error: null });
    const { location } = e.target;
    try {
      const data = await HereApiService.geoSearch(location.value);
      this.setState({
        lat: data.items[0].position.lat,
        long: data.items[0].position.lng
      }, this.restaurantSearch);
    }
    catch (error) {
      this.logError(error);
    }
  }

  handleCurrentLocation = e => {
    this.setState({ error: null });
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(`current location ${pos.coords.latitude}, ${pos.coords.longitude}`)
      this.setState({
        lat: pos.coords.latitude,
        long: pos.coords.longitude
      }, this.restaurantSearch);
    }, this.logError, { timeout: 5000 });
  }

  restaurantSearch = () => {
    return HereApiService.restaurantSearch(this.state.lat, this.state.long, this.state.radius)
      .then(res => {
        console.log(res)
        this.setState({
          restaurants: res.items
        });
      })
      .catch(error => this.logError(error));
  }

  createPollItems = indices => {
    const items = [];
    indices.forEach(index => {
      const rest = this.state.restaurants[index];
      const type = (rest.foodTypes) ? rest.foodTypes.find(type => type.primary) : null;
      const item_cuisine = (type) ? type.name : 'Unknown';
      const item = {
        item_name: rest.title,
        item_address: `${rest.address.houseNumber} ${rest.address.street}, ${rest.address.city}, ${rest.address.stateCode} ${rest.address.postalCode}`,
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
    this.setState({ error: err.message});
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
    )
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
      catch (error) {
        this.logError(error);
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
    catch (error) {
      this.logError(error);
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
    catch (error) {
      this.logError(error);
    }
  }

  render() {
    const { error } = this.state;

    const pollItems = this.state.items.map((item, idx) => {
      const linkText = (item.item_link.toLowerCase().includes('google.com/maps')) ? 'Google Maps' : 'Link';
      return (
        <li key={idx}>
          {item.item_name}, {' '}
          {item.item_address}, {' '}
          {item.item_cuisine} {' '}
          (<a href={item.item_link} target="_blank" rel="noreferrer">{linkText}</a>) {' '}
          <button type="button" onClick={e => this.handleClickDelete(idx)}>Delete</button>
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
          <form onSubmit={this.handleSubmitLocation}>
            <label htmlFor="location">Enter Location for Restaurant Search: </label>
            <input type="text" name="location" id="location" /> {' '}
            <button type="submit">Search</button> {' '}
            <button type="button" onClick={this.handleCurrentLocation}>Use Current Location</button>
          </form>
        </section>

        {
          !!this.state.restaurants.length &&
          <RestaurantListPage
            restaurants={this.state.restaurants}
            updateRadius={this.updateRadius}
            createPollItems={this.createPollItems}
          />
        }

        <section>
          <form onSubmit={this.handleSubmitItem}>
            <fieldset>
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
          <label htmlFor="poll-end-time">Poll End Time: </label>
          <Flatpickr
            defaultValue={new Date(Date.now() + 60 * 60 * 1000).toISOString()}
            options={{
              enableTime: true,
              /* noCalendar: true, */
              dateFormat: 'H:i',
              minDate: new Date(),
              onChange: endTime => this.setState({ endTime: endTime[0] }),
            }}
          />
        </section>

        <section>
          <h2>Poll Preview</h2>
          <ul>
            {pollItems}
          </ul>
        </section>
        
        <section>
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
