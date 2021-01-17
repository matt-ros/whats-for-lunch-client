import React from 'react';
import PollForm from '../PollForm/PollForm';

class CreatePoll extends React.Component {
  render() {
    return (
      <>
        <header role="banner">
          <h1>What's For Lunch?</h1>
        </header>

        <section>
          <h2>Create Poll</h2>
        </section>

        <PollForm history={this.props.history} />
      </>
    );
  }
}

export default CreatePoll;
