import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PollsApiService from '../../services/polls-api-service';

class WinnerPage extends React.Component {
  state = {
    poll: {},
    winner: {},
  }

  async componentDidMount() {
    try {
      const { poll, items } = await PollsApiService.getPoll(this.props.match.params.id);
      const sortedItems = items.sort((a, b) => b.item_votes - a.item_votes);
      this.setState({
        poll,
        winner: sortedItems[0],
      });
    } catch (res) {
      this.setState({ error: res.error });
    }
  }

  renderWinner() {
    return (
      <>
        <h2>The winner is...</h2>
        <h3>
          <a href={this.state.winner.item_link} target="_blank" rel="noreferrer">
            {this.state.winner.item_name}!!
          </a>
        </h3>
        <Link to={`/results/${this.props.match.params.id}`}>Full Results</Link>
      </>
    );
  }

  renderError(error) {
    return (
      <section>
        <p className="error">{error}</p>
      </section>
    );
  }

  render() {
    const { error } = this.state;
    const winnerBoolean = Boolean(Object.keys(this.state.winner).length);
    return (
      <>
        {(new Date(this.state.poll.end_time).getTime() > Date.now()) && (
          <Redirect to={`/poll/${this.props.match.params.id}`} />
        )}
        <section>
          {error && <p className="error">{error}</p>}
          {winnerBoolean && this.renderWinner()}
        </section>
      </>
    );
  }
}

export default WinnerPage;
