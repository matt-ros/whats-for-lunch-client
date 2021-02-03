import React from 'react';
import ItemsApiService from '../../services/items-api-service';
import PollsApiService from '../../services/polls-api-service';
import TokenService from '../../services/token-service';

class PollResultsPage extends React.Component {
  state = {
    poll: {},
    items: []
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
    const totalVotes = this.state.items.reduce(((acc, item) => acc + item.item_votes), 0);
    console.log(totalVotes)
    const sortedItems = this.state.items.sort((a, b) => b.item_votes - a.item_votes);
    const pollItems = sortedItems.map((item, idx) => {
      return (
        <li key={idx} className="poll-choice">
          {item.item_name} <br />
          {item.item_address} <br />
          {item.item_cuisine} <br />
          <a href={item.item_link} target="_blank" rel="noreferrer">More Info</a> <br />
          {item.item_votes} {item.item_votes === 1 ? 'Vote' : 'Votes'}
          <br />
          {/* <br /> */}
        </li>
      );
    });

    return (
      <section>
        <h2>{(new Date(end_time) > Date.now()) ? 'Current Results' : 'Final Results'}</h2>
        {error && <p className="error">{error}</p>}
        <ul className="poll">
          {pollItems}
        </ul>
        <button
          type="button"
          onClick={e => this.props.history.push(`/poll/${this.props.match.params.id}`)}
          disabled={TokenService.hasVotedInPoll(this.props.match.params.id, end_time) ||
            !(new Date(end_time).getTime() > Date.now())
          }
        >
          Vote in this Poll
        </button>
        {TokenService.hasVotedInPoll(this.props.match.params.id, end_time)
          ? 'You have already voted in this poll'
          : (new Date(end_time).getTime() > Date.now())
            ? null
            : 'This poll has ended'
        }
      </section>
    );
  }
}

export default PollResultsPage;
