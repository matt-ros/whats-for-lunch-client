import React from 'react';

class PollNameForm extends React.Component {
  render() {
    const { error } = this.props;
    return (
      <section>
        {error && <p className="error">{error}</p>}
        <label htmlFor="pollName">Poll Name: </label>
        <input
          type="text"
          name="pollName"
          id="pollName"
          onChange={this.props.handleChangePollName}
          defaultValue={this.props.values.pollName}
        />
        <button type="button" onClick={this.props.nextStep}>Next</button>
      </section>
    );
  }
}

PollNameForm.defaultProps = {
  values: {}
}

export default PollNameForm;
