import React from 'react';

class LocationForm extends React.Component {
  render() {
    const { error, locError } = this.props;

    return (
      <section>
        {error && <p className="error">{error}</p>}
        {locError && <p className="error">{locError}</p>}
        <form className="loc-form" onSubmit={this.props.handleSubmitLocation}>
          <label htmlFor="location">Location: </label>
          <input type="text" name="location" id="location" />
          {' '}
          <button type="submit">Search</button>
          {' '}
          <button type="button" onClick={this.props.handleCurrentLocation}>
            Use Current Location
          </button>
        </form>
        <button type="button" onClick={this.props.prevStep}>Back</button>
        <button type="button" onClick={this.props.nextStep}>Next</button>
      </section>
    );
  }
}

LocationForm.defaultProps = {
  values: {},
};

export default LocationForm;
