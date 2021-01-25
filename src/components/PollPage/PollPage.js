import React from 'react';
import ItemsApiService from '../../services/items-api-service';
import { Redirect } from 'react-router-dom';
import PollsApiService from '../../services/polls-api-service';
import TokenService from '../../services/token-service';

class PollPage extends React.Component {
  state = {
    poll: {},
    items: []
  }

  async componentDidMount() {
    const poll = await PollsApiService.getPoll(this.props.match.params.id);
    const items = await ItemsApiService.getItems(this.props.match.params.id);
    this.setState({
      poll,
      items,
    });
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { choice } = e.target;
    await ItemsApiService.incrementVote(choice.value);
    TokenService.saveVotedToken(this.props.match.params.id);
    choice.value = null;
    this.props.history.push(`/results/${this.props.match.params.id}`);
  }

  render() {
    const choices = this.state.items.map((item, idx) => {
      return (
        <div key={idx}>
          <input type="radio" name="choice" id={`choice_${idx}`} value={item.id} required />
          <label htmlFor={`choice_${idx}`}>
            {item.item_name}, {' '}
            {item.item_address}, {' '}
            {item.item_cuisine} {' '}
            (<a href={item.item_link} target="_blank" rel="noreferrer">Google Maps</a>)
          </label>
          <br />
        </div>
      )
    })
    return (
      <>
        {
          (TokenService.hasVotedInPoll(this.props.match.params.id) || (this.state.poll && new Date(this.state.poll.end_time).getTime() < Date.now())) &&
          <Redirect to={`/results/${this.props.match.params.id}`} />
        }
        <header role="banner">
          <h1>What's For Lunch?</h1>
        </header>

        <section>
          <h2>Where do you want to eat?</h2>
          <form onSubmit={this.handleSubmit}>
            {choices}
            <button type="submit">Vote!</button>
            <button type="button" onClick={e => this.props.history.push(`/results/${this.props.match.params.id}`)}>View Results</button>
          </form>
        </section>
      </>
    );
  }
}

export default PollPage;
