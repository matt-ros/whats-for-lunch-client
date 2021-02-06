import React from 'react';

class AddItemForm extends React.Component {
  render() {
    const { error } = this.props;
    return (
      <section>
        {error && <p className="error">{error}</p>}
        <form onSubmit={this.props.handleSubmitItem}>
          <fieldset className="add-item">
            <legend>Add Custom Restaurant</legend>
            <label htmlFor="item_name">Name: </label>
            <input type="text" name="item_name" id="item_name" placeholder="Mos Eisley Cantina" required />
            <br />
            <label htmlFor="item_address">Address: </label>
            <input type="text" name="item_address" id="item_address" placeholder="100 Mos Eisley Ave, Mos Eisley, Tatooine" />
            <br />
            <label htmlFor="item_cuisine">Cuisine: </label>
            <input type="text" name="item_cuisine" id="item_cuisine" placeholder="Bar Food" />
            <br />
            <label htmlFor="item_link">Link: </label>
            <input type="url" name="item_link" id="item_link" placeholder="http://www.moseisleycantina.com" />
            <br />
          </fieldset>
          <button type="submit">Add</button>
        </form>
        <button type="button" onClick={this.props.prevStep}>Back</button>
        <button type="button" onClick={this.props.nextStep}>Next</button>
      </section>

    );
  }
}

AddItemForm.defaultProps = {
  values: {},
}

export default AddItemForm;
