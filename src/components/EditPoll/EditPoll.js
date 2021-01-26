import React from 'react';
import PollsApiService from '../../services/polls-api-service';
import PollForm from '../PollForm/PollForm';

class EditPoll extends React.Component {
  state = {
    error: null
  }
  async componentDidMount() {
    try {
      const poll = await PollsApiService.getPoll(this.props.match.params.id);
      this.setState({ poll });
    } catch (res) {
      this.setState({ error: res.error });
    }
  }
  render() {
    const { error } = this.state;
    // const poll = (this.state.poll) ? this.state.poll : null
    return (
      <>
        <header role="banner">
          <h1>What's For Lunch?</h1>
        </header>
        {error && <p className="error">{error}</p>}
        <section>
          <h2>Edit Poll</h2>
        </section>

        <PollForm poll={this.state.poll} history={this.props.history} />
      </>
    );
  }
}

export default EditPoll;
