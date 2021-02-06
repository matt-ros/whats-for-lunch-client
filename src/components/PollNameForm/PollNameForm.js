import React from 'react';

class PollNameForm extends React.Component {
  handleClickNext = e => {
    e.preventDefault();
    this.props.nextStep();
  }

  render() {
    const { error } = this.props;

    return (
      <section>
        {error && <p className="error">{error}</p>}
        <form onSubmit={this.handleClickNext}>
          <label htmlFor="pollName">Poll Name: </label>
          <input
            type="text"
            name="pollName"
            id="pollName"
            onChange={this.props.handleChangePollName}
            defaultValue={this.props.values.pollName}
          />
          <br />
          <button type="submit">Next</button>
        </form>
      </section>
    );
  }
}

PollNameForm.defaultProps = {
  values: {},
}

export default PollNameForm;
