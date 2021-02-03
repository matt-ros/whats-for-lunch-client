import React from 'react';
import ItemsApiService from '../../services/items-api-service';
import { Redirect } from 'react-router-dom';
import PollsApiService from '../../services/polls-api-service';
import TokenService from '../../services/token-service';

class PollPage extends React.Component {
  state = {
    poll: {},
    items: [],
    copied: false
  }

  async componentDidMount() {
    try {
      const poll = await PollsApiService.getPoll(this.props.match.params.id);
      const items = await ItemsApiService.getItems(this.props.match.params.id);
      this.setState({
        poll,
        items,
      });
    }
    catch (res) {
      this.setState({ error: res.error });
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { choice } = e.target;
    try {
      await ItemsApiService.incrementVote(choice.value);
      TokenService.saveVotedToken(this.props.match.params.id, this.state.poll.end_time);
      choice.value = null;
      this.props.history.push(`/results/${this.props.match.params.id}`);
    }
    catch (res) {
      this.setState({ error: res.error });
    }
  }

  handleShare = async () => {
    // this.setState({copied: false });
    try {
      await navigator.clipboard.writeText(window.location.href);
      this.setState({ copied: true });
    }
    catch (res) {
      console.log(res);
    }
  }

  render() {
    const { error } = this.state;
    const choices = this.state.items.map((item, idx) => {
      return (
        <div className="poll-choice" key={idx}>
          <input type="radio" name="choice" id={`choice_${idx}`} value={item.id} required />
          <label htmlFor={`choice_${idx}`}>
            {item.item_name}
            <br />
            {item.item_address}
            <br />
            {item.item_cuisine}
            <br />
            <a href={item.item_link} target="_blank" rel="noreferrer">More Info</a>
          </label>
          <br />
        </div>
      );
    });

    return (
      <>
        {TokenService.hasVotedInPoll(this.props.match.params.id, this.state.poll.end_time) && 
          <Redirect to={`/results/${this.props.match.params.id}`} />
        }
        {(new Date(this.state.poll.end_time).getTime() < Date.now()) &&
          <Redirect to={`/winner/${this.props.match.params.id}`} />
        }
        <section>
          <h2>Where do you want to eat?</h2>
          {error && <p className="error">{error}</p>}
          <form className="poll" id="poll" onSubmit={this.handleSubmit}>
            {choices}
          </form>
          <button type="submit" form="poll">Vote!</button> {' '}
          <button type="button" onClick={e => this.props.history.push(`/results/${this.props.match.params.id}`)}>View Results</button>
          <br />
          <button type="button" onClick={this.handleShare}>Share This Poll!</button>
          {this.state.copied && <p>Copied to Clipboard!</p>}
        </section>
      </>
    );
  }
}

export default PollPage;
