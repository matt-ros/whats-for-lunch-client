import React from 'react';
import PollForm from '../PollForm/PollForm';

class CreatePoll extends React.Component {
  render() {
    return (
      <>
        <section>
          <h2>Create Poll</h2>
        </section>

        <PollForm history={this.props.history} />
      </>
    );
  }
}

export default CreatePoll;
