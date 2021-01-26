import React from 'react';
import { Link } from 'react-router-dom';
import PollsApiService from '../../services/polls-api-service';
import UsersApiService from '../../services/users-api-service';

class UserHomepage extends React.Component {
  state = {
    user: {},
    polls: [],
    error: null
  }

  async componentDidMount() {
    try {
      const user = await UsersApiService.getUser();
      const polls = await PollsApiService.getPolls();
      this.setState({
        user,
        polls,
      });
    }
    catch (res) {
      this.setState({ error: res.error });
    }
  }

  render() {
    const { error } = this.state;
    const savedPolls = this.state.polls.map((poll, idx) => {
      const pollName = (poll.poll_name) ? poll.poll_name : `Unnamed Poll ${poll.id}`;
      return (
        <li key={idx}>
          <Link to={{ pathname: `/edit/${poll.id}`, state: { poll } }}>{pollName}</Link>
        </li>
      );
    })
    return (
      <>
        <header role="banner">
          <h1>What's For Lunch?</h1>
        </header>
        {error && <p className="error">{error}</p>}
        <section>
          <h2>Welcome, {this.state.user.user_name}!</h2>
        </section>

        <section>
          <h3>Saved Polls</h3>
          <ul>
            {savedPolls}
          </ul>
        </section>

        <section>
          <Link to="/create">Create New Poll</Link>
        </section>
      </>
    );
  }
}

export default UserHomepage;
