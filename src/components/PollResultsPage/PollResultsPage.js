import React from 'react';
import ItemsApiService from '../../services/items-api-service';
import PollsApiService from '../../services/polls-api-service';
import TokenService from '../../services/token-service';

class PollResultsPage extends React.Component {
  state = {
    poll: {},
    items: [],
  }

  async componentDidMount() {
    try {
      const poll = await PollsApiService.getPoll(this.props.match.params.id);
      const items = await ItemsApiService.getItems(this.props.match.params.id);
      this.setState({
        poll,
        items,
      });
    } catch (res) {
      this.setState({ error: res.error });
    }
  }
  
  render() {
    const { error } = this.state;
    const { end_time } = this.state.poll;
    const alreadyVoted = TokenService.hasVotedInPoll(this.props.match.params.id, end_time);
    const timeExpired = new Date(end_time).getTime() < Date.now();
    const sortedItems = this.state.items.sort((a, b) => b.item_votes - a.item_votes);
    const pollItems = sortedItems.map((item, idx) => {
      return (
        <li key={idx} className="poll-choice">
          {item.item_name}
          <br />
          {item.item_address}
          <br />
          {item.item_cuisine}
          <br />
          {item.item_link && <a href={item.item_link} target="_blank" rel="noreferrer">More Info</a>}
          <br />
          <span className="votes">
            {item.item_votes} {item.item_votes === 1 ? 'Vote' : 'Votes'}
          </span>
          <br />
        </li>
      );
    });

    return (
      <section>
        <h2>{timeExpired ? 'Final Results' : 'Current Results'}</h2>
        {error && <p className="error">{error}</p>}
        <ul className="poll">
          {pollItems}
        </ul>
        <button
          type="button"
          onClick={e => this.props.history.push(`/poll/${this.props.match.params.id}`)}
          disabled={alreadyVoted || timeExpired}
        >
          Vote in this Poll
        </button>
        {alreadyVoted && <p>You have already voted in this poll</p>}
        {(!alreadyVoted && timeExpired) && <p>This poll has ended</p>}
      </section>
    );
  }
}

export default PollResultsPage;
