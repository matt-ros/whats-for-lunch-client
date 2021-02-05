import React from 'react';
import { Link } from 'react-router-dom';
import PollsApiService from '../../services/polls-api-service';
import UsersApiService from '../../services/users-api-service';

class UserHomepage extends React.Component {
  state = {
    user: {},
    polls: [],
    error: null,
  }

  async componentDidMount() {
    try {
      const user = await UsersApiService.getUser();
      const polls = await PollsApiService.getPolls();
      this.setState({
        user,
        polls,
      });
    } catch (res) {
      this.setState({ error: res.error });
    }
  }

  handleClickDelete = async (id) => {
    this.setState({ error: null });
    try {
      await PollsApiService.deletePoll(id);
      const newPolls = this.state.polls.filter(poll => poll.id !== id);
      this.setState({ polls: newPolls });
    } catch (res) {
      this.setState({ error: res.error });
    }
  }

  handleClickEdit = id => {
    const poll = this.state.polls.find(poll => poll.id === id);
    this.props.history.push({ pathname: `/edit/${poll.id}`, state: { poll } });
  }

  render() {
    const { error } = this.state;
    const savedPolls = this.state.polls.map((poll, idx) => {
      const pollName = (poll.poll_name) ? poll.poll_name : `Unnamed Poll ${poll.id}`;
      return (
        <li key={idx}>
          <Link to={`/poll/${poll.id}`}>{pollName}</Link>
          {' '}
          <span className="buttons">
            <button type="button" onClick={e => this.handleClickEdit(poll.id)}>Edit</button>
            {' '}
            <button type="button" onClick={e => this.handleClickDelete(poll.id)}>Delete</button>
          </span>
        </li>
      );
    });
    
    return (
      <>
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
