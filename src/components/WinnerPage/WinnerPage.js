import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import ItemsApiService from '../../services/items-api-service';
import PollsApiService from '../../services/polls-api-service';

class WinnerPage extends React.Component {
  state = {
    poll: {},
    winner: {},
  }

  async componentDidMount() {
    try {
      const poll = await PollsApiService.getPoll(this.props.match.params.id);
      const items = await ItemsApiService.getItems(this.props.match.params.id);
      const sortedItems = items.sort((a, b) => b.item_votes - a.item_votes);
      this.setState({
        poll,
        winner: sortedItems[0]
      });
    }
    catch (res) {
      this.setState({ error: res.error });
    }
  }

  render() {
    return (
      <>
        {(new Date(this.state.poll.end_time).getTime() > Date.now()) &&
        <Redirect to={`/poll/${this.props.match.params.id}`} />
        }
        <header role="banner">
          <h1>What's For Lunch?</h1>
        </header>

        <section>
          <h2>The winner is...</h2>
          <h3>{this.state.winner.item_name}!!</h3>
          <Link to={`/results/${this.props.match.params.id}`}>Full Results</Link>
        </section>
      </>
    );
  }
}

export default WinnerPage;