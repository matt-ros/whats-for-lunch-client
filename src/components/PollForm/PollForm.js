import React from 'react';
import HereApiService from '../../services/here-api-service';
import RestaurantListPage from '../RestaurantListPage/RestaurantListPage';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_red.css';

class PollForm extends React.Component {
  state = {
    lat: null,
    long: null,
    radius: 1,
    restaurants: []
  }

  handleSubmitLocation = async (e) => {
    e.preventDefault();
    const { location } = e.target;
    const data = await HereApiService.geoSearch(location.value);
    this.setState({
      lat: data.items[0].position.lat,
      long: data.items[0].position.lng
    }, this.restaurantSearch)
  }

  handleCurrentLocation = e => {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(`current location ${pos.coords.latitude}, ${pos.coords.longitude}`)
      this.setState({
        lat: pos.coords.latitude,
        long: pos.coords.longitude
      }, this.restaurantSearch);
    }, this.logError, { timeout: 5000 });
  }

  restaurantSearch = (radius = 1) => {
    return HereApiService.restaurantSearch(this.state.lat, this.state.long, radius)
      .then(res => {
        console.log(res)
        this.setState({
          restaurants: res.items
        })
      })
  }

  logError = (err) => {
    return console.log(`Error ${err.message}`);
  }

  handleSubmitItem = e => {
    e.preventDefault();
    const { item_name, item_address, item_cuisine, item_link } = e.target;
    item_name.value = '';
    item_address.value = '';
    item_cuisine.value = '';
    item_link.value = '';
  }

  handleClickPublish = () => {
    const pollId = Math.ceil(Math.random() * 10);
    this.props.history.push(`/poll/${pollId}`);
  }

  render() {
    return (
      <>
        <section>
          <form onSubmit={this.handleSubmitLocation}>
            <label htmlFor="location">Enter Location for Restaurant Search: </label>
            <input type="text" name="location" id="location" />
            <button type="submit">Search</button>
            <button type="button" onClick={this.handleCurrentLocation}>Use Current Location</button>
          </form>
        </section>

        {!!this.state.restaurants.length && <RestaurantListPage restaurants={this.state.restaurants} restaurantSearch={this.restaurantSearch} />}

        <section>
          <form onSubmit={this.handleSubmitItem}>
            <fieldset>
              <legend>Add Item to Poll</legend>
              <label htmlFor="item_name">Name: </label>
              <input type="text" name="item_name" id="item_name" /> <br />
              <label htmlFor="item_address">Address: </label>
              <input type="text" name="item_address" id="item_address" /> <br />
              <label htmlFor="item_cuisine">Cuisine: </label>
              <input type="text" name="item_cuisine" id="item_cuisine" /> <br />
              <label htmlFor="item_link">Link: </label>
              <input type="text" name="item_link" id="item_link" /> <br />
            </fieldset>
            <button type="submit">Add</button>
          </form>
        </section>

        <section>
          <label htmlFor="poll-end-time">Poll End Time: </label>
          <Flatpickr
            defaultValue={new Date(Date.now() + 60 * 60 * 1000).toTimeString()}
            options={{
              enableTime: true,
              noCalendar: true,
              dateFormat: 'H:i',
            }}
          />
        </section>

        <section>
          <h2>Poll Preview</h2>
          <ul>
            <li>Restaurant 1, 123 Main St, Italian (<a href="#LinkToRestaurant1">Link</a>) <button type="button">Delete</button></li>
            <li>Restaurant 2, 456 Main St, Sushi (<a href="#LinkToRestaurant2">Link</a>) <button type="button">Delete</button></li>
            <li>Restaurant 3, 789 Main St, Sandwiches (<a href="#LinkToRestaurant3">Link</a>) <button type="button">Delete</button></li>
            <li>Restaurant 4, 321 Main St, Pizza (<a href="#LinkToRestaurant4">Link</a>) <button type="button">Delete</button></li>
            <li>Restaurant 5, 654 Main St, Burgers (<a href="#LinkToRestaurant5">Link</a>) <button type="button">Delete</button></li>
          </ul>
        </section>
        
        <section>
          <button type="button" onClick={this.handleClickPublish}>Publish Poll</button>
        </section>
      </>
    );
  }
}

export default PollForm;
