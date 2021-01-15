import React from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_red.css';

class CreatePoll extends React.Component {
  handleSubmitLocation = e => {
    e.preventDefault();
    e.target.location.value = '';
    this.props.history.push('/restaurants');
  }

  handleSubmitItem = e => {
    e.preventDefault();
    e.target['poll-item'].value = '';
  }

  handleClickPublish = () => {
    const pollId = Math.ceil(Math.random() * 10);
    this.props.history.push(`/poll/${pollId}`);
  }

  render() {
    return (
      <>
        <header role="banner">
          <h1>What's For Lunch?</h1>
        </header>

        <section>
          <h2>Create Poll</h2>
        </section>

        <section>
          <form onSubmit={this.handleSubmitLocation}>
            <label htmlFor="location">Enter Location for Restaurant Search: </label>
            <input type="text" name="location" id="location" />
            <button type="submit">Search</button>
            <button type="button" onClick={e => this.props.history.push('/restaurants')}>Use Current Location</button>
          </form>
        </section>

        <section>
          <form onSubmit={this.handleSubmitItem}>
            <label htmlFor="poll-item">Add Item to Poll: </label>
            <input type="text" name="poll-item" id="poll-item" />
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
            <li>Restaurant 1, 123 Main St, Italian <button type="button">Delete</button></li>
            <li>Restaurant 2, 456 Main St, Sushi <button type="button">Delete</button></li>
            <li>Restaurant 3, 789 Main St, Sandwiches <button type="button">Delete</button></li>
            <li>Restaurant 4, 321 Main St, Pizza <button type="button">Delete</button></li>
            <li>Restaurant 5, 654 Main St, Burgers <button type="button">Delete</button></li>
          </ul>
        </section>
        
        <section>
          <button type="button" onClick={this.handleClickPublish}>Publish Poll</button>
        </section>
      </>
    );
  }
}

export default CreatePoll;
