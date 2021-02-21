import React from 'react';

class Preview extends React.Component {
  render() {
    const { error, working, existingItems } = this.props;
    const endTime = this.props.values.endTime || new Date(Date.now() + (60 * 60 * 1000));
    const existingPollItems = this.props.existingItems.map((item, idx) => (
      <li key={`existing${item.id}`} className="poll-choice">
        {item.item_name}
        <br />
        {item.item_address}
        <br />
        {item.item_cuisine}
        <br />
        {item.item_link && <a href={item.item_link} target="_blank" rel="noreferrer">More Info</a>}
        <br />
        <button type="button" onClick={(e) => this.props.handleDeleteExistingItem(idx)}>Delete</button>
        <br />
      </li>
    ));

    const newPollItems = this.props.values.items.map((item, idx) => (
      <li key={`new${idx}`} className="poll-choice">
        {item.item_name}
        <br />
        {item.item_address}
        <br />
        {item.item_cuisine}
        <br />
        {item.item_link && <a href={item.item_link} target="_blank" rel="noreferrer">More Info</a>}
        <br />
        <button type="button" onClick={(e) => this.props.handleClickDelete(idx)}>Delete</button>
        <br />
      </li>
    ));

    const pollItems = existingPollItems.concat(newPollItems);

    return (
      <section>
        <h2>Poll Preview</h2>
        {error && <p className="error">{error}</p>}
        <ul className="poll">
          {pollItems}
        </ul>
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
        {working && <p>{working}</p>}
        <button type="button" onClick={this.props.prevStep}>Back</button>
        {' '}
        {(this.props.poll)
          ? <button type="button" onClick={this.props.handleClickUpdate}>Update Poll</button>
          : <button type="button" onClick={this.props.handleClickPublish}>Publish Poll</button>}
      </section>
    );
  }
}

Preview.defaultProps = {
  existingItems: [],
  values: {
    items: [],
  },
};

export default Preview;
