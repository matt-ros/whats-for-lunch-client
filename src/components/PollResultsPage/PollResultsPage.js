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
    const poll = await PollsApiService.getPoll(this.props.match.params.id);
    const items = await ItemsApiService.getItems(this.props.match.params.id);
    this.setState({
      poll,
      items,
    });
  }
  
  render() {
    const { end_time } = this.state.poll;
    const sortedItems = this.state.items.sort((a, b) => b.item_votes - a.item_votes);
    const pollItems = sortedItems.map((item, idx) => {
      const linkText = (item.item_link.toLowerCase().includes('google')) ? 'Google Maps' : 'Link';
      return (
        <li key={idx}>
          {item.item_name}, {' '}
          {item.item_address}, {' '}
          {item.item_cuisine} {' '}
          (<a href={item.item_link} target="_blank" rel="noreferrer">{linkText}</a>): {' '}
          {item.item_votes} {item.item_votes === 1 ? 'Vote' : 'Votes'}
        </li>
      );
    });

    return (
      <>
        <header role="banner">
          <h1>What's For Lunch?</h1>
        </header>

        <section>
          <h2>Poll Results</h2>
          <ul>
            {pollItems}
          </ul>
          <button
            type="button"
            onClick={e => this.props.history.push(`/poll/${this.props.match.params.id}`)}
            disabled={TokenService.hasVotedInPoll(this.props.match.params.id, end_time) ||
              !(new Date(end_time).getTime() > Date.now())
            }
          >
            {
              TokenService.hasVotedInPoll(this.props.match.params.id, end_time)
                ? 'You have already voted in this poll'
                : (new Date(end_time).getTime() > Date.now())
                  ? 'Vote in this Poll'
                  : 'This Poll has Ended'}
          </button>
        </section>
      </>
    );
  }
}

export default PollResultsPage;
