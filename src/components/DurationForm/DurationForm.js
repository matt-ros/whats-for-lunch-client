import React from 'react';

class DurationForm extends React.Component {
  render() {
    const { error } = this.props;
    const endTime = this.props.values.endTime || new Date(Date.now() + (60 * 60 * 1000));

    return (
      <section>
        {error && <p className="error">{error}</p>}
        <form onSubmit={this.props.handleUpdateTime}>
          <fieldset className="duration">
            <legend>Poll Duration</legend>
            <label htmlFor="hours">Hours: </label>
            <input type="number" name="hours" id="hours" min="0" defaultValue="1" />
            {' '}
            <label htmlFor="minutes">Minutes: </label>
            <input type="number" name="minutes" id="minutes" min="0" max="55" step="5" defaultValue="0" />
            <br />
            <button type="submit">Update</button>
          </fieldset>
          <p>
            Expires{' '}
            {endTime.toLocaleString(
              [],
              {
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              },
            )}
          </p>
        </form>
        <button type="button" onClick={this.props.prevStep}>Back</button>
        <button type="button" onClick={this.props.nextStep}>Next</button>
      </section>
    );
  }
}

DurationForm.defaultProps = {
  values: {},
};

export default DurationForm;
