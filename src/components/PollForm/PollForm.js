import React from 'react';
import HereApiService from '../../services/here-api-service';
import ItemsApiService from '../../services/items-api-service';
import PollsApiService from '../../services/polls-api-service';
import AddItemForm from '../AddItemForm/AddItemForm';
import DurationForm from '../DurationForm/DurationForm';
import LocationForm from '../LocationForm/LocationForm';
import PollNameForm from '../PollNameForm/PollNameForm';
import Preview from '../Preview/Preview';
import RestaurantListPage from '../RestaurantListPage/RestaurantListPage';

class PollForm extends React.Component {
  state = {
    step: 1,
    pollName: '',
    endTime: null,
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
      } catch (res) {
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
      this.nextStep();
    } catch (res) {
      this.setState({ locError: res.error });
    }
  }

  handleCurrentLocation = e => {
    this.setState({ locError: null });
    navigator.geolocation.getCurrentPosition((pos) => {
      this.setState({
        lat: pos.coords.latitude,
        long: pos.coords.longitude
      }, this.restaurantSearch);
    }, this.logError, { timeout: 5000 });
    this.nextStep();
  }

  restaurantSearch = async () => {
    try {
      const response = await HereApiService.restaurantSearch(
        this.state.lat,
        this.state.long,
        this.state.radius
      );

      this.setState({ restaurants: response.items });
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
        ...items,
      ],
    });
  }

  updateRadius = radius => {
    this.setState({ radius }, this.restaurantSearch);
  }

  logError = (err) => {
    this.setState({ locError: err.message });
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
      ],
    });

    item_name.value = '';
    item_address.value = '';
    item_cuisine.value = '';
    item_link.value = '';
  }

  handleClickDelete = async (idx) => {
    const itemId = this.state.items[idx].id;
    const newPollItems = this.state.items.filter((_, index) => index !== idx);
    this.setState({ items: newPollItems });
    if (itemId) {
      try {
        await ItemsApiService.deleteItem(itemId);
      } catch (res) {
        this.setState({ error: res.error });
      }
    }
  }

  handleClickPublish = async () => {
    if (this.state.items.length === 0) {
      return this.setState({ error: 'Please add some items to your poll' });
    }

    this.setState({ working: true });
    const newPoll = {
      poll_name: (this.state.pollName) ? this.state.pollName : '',
      end_time: this.state.endTime || new Date(Date.now() + (60 * 60 * 1000)),
    };

    try {
      const poll = await PollsApiService.postPoll(newPoll);
      await ItemsApiService.postItems(poll.id, this.state.items);
      this.props.history.push({
        pathname: '/success',
        state: {
          pollId: poll.id
        }
      });
    } catch (res) {
      this.setState({ error: res.error });
    }
  }

  handleClickUpdate = async () => {
    if (this.state.items.length === 0) {
      return this.setState({ error: 'Please add some items to your poll' });
    }

    this.setState({ working: true });
    const updateFields = {
      poll_name: (this.state.pollName) ? this.state.pollName : this.props.poll.poll_name,
      end_time: this.state.endTime || new Date(Date.now() + (60 * 60 * 1000)),
    };

    const newItems = this.state.items.filter(item => !item.id);
    try {
      await PollsApiService.patchPoll(this.props.poll.id, updateFields);
      await ItemsApiService.resetVotes(this.props.poll.id);
      if (newItems.length > 0) {
        await ItemsApiService.postItems(this.props.poll.id, newItems);
      }

      this.props.history.push({
        pathname: '/success',
        state: {
          pollId: this.props.poll.id,
        },
      });
    } catch (res) {
      this.setState({ error: res.error });
    }
    
  }

  handleUpdateTime = e => {
    e.preventDefault();
    const { hours, minutes } = e.target;
    const actualHours = Number(hours.value) + (Number(minutes.value) / 60);
    this.setState({ endTime: new Date(Date.now() + (actualHours * 60 * 60 * 1000)) });
  }

  nextStep = () => {
    this.setState({
      error: null, 
      locError: null,
    });

    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  }

  prevStep = () => {
    this.setState({
      error: null,
      locError: null,
    });

    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  }

  restListStep = () => {
    this.setState({
      error: null,
      locError: null,
    });

    const { step } = this.state;
    this.setState({
      step: 3,
    });
  }

  durationStep = () => {
    this.setState({
      error: null,
      locError: null,
    });

    const { step } = this.state;
    this.setState({
      step: 4,
    });
  }

  addItemStep = () => {
    this.setState({
      error: null,
      locError: null,
    });

    const { step } = this.state;
    this.setState({
      step: 42,
    });
  }

  render() {
    const { error, locError } = this.state;
    const { step } = this.state;
    const { working } = this.state;
    const { pollName, endTime, radius, restaurants, items } = this.state;
    const { poll } = this.props;
    const values = { pollName, endTime, radius, restaurants, items };
    if (!pollName && poll) {
      values.pollName = poll.poll_name;
    }

    switch (step) {
      case 1:
        return (
          <PollNameForm
            nextStep={this.nextStep}
            handleChangePollName={this.handleChangePollName}
            error={error}
            values={values}
          />
        );
    
      case 2:
        return (
          <LocationForm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleSubmitLocation={this.handleSubmitLocation}
            handleCurrentLocation={this.handleCurrentLocation}
            locError={locError}
            error={error}
          />
        );
    
      case 3:
        return (
          <RestaurantListPage
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            addItemStep={this.addItemStep}
            updateRadius={this.updateRadius}
            createPollItems={this.createPollItems}
            locError={locError}
            error={error}
            values={values}
          />
        );
    
      case 4:
        return (
          <DurationForm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleUpdateTime={this.handleUpdateTime}
            error={error}
            values={values}
          />
        );
    
      case 5:
        return (
          <Preview
            prevStep={this.prevStep}
            handleClickDelete={this.handleClickDelete}
            handleClickUpdate={this.handleClickUpdate}
            handleClickPublish={this.handleClickPublish}
            poll={poll}
            working={working}
            error={error}
            values={values}
          />
        );
            
      case 42:
        return (
          <AddItemForm
            restListStep={this.restListStep}
            durationStep={this.durationStep}
            handleSubmitItem={this.handleSubmitItem}
            error={error}
          />
        );
    
      default:
        return <button type="button" onClick={e => this.setState({ step: 1 })}>Restart</button>;
    }
  }
}

export default PollForm;
