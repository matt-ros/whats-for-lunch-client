import React from 'react';
import PollForm from '../PollForm/PollForm';

class EditPoll extends React.Component {
  render() {
    return (
      <>
        <header role="banner">
          <h1>What's For Lunch?</h1>
        </header>

        <section>
          <h2>Edit Poll</h2>
        </section>

        <PollForm history={this.props.history} />
      </>
    );
  }
}

export default EditPoll;
