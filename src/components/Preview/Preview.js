import React from 'react';

class Preview extends React.Component {
  render() {
    const { error } = this.props;
    const endTime = (this.props.values.endTime) ? this.props.values.endTime : new Date(Date.now() + (60 * 60 * 1000));
    const pollItems = this.props.values.items.map((item, idx) => {
      const linkText = (item.item_link.toLowerCase().includes('google.com/maps')) ? 'Google Maps' : 'Link';
      return (
        <li key={idx}>
          {item.item_name} <br />
          {item.item_address} <br />
          {item.item_cuisine} <br />
          (<a href={item.item_link} target="_blank" rel="noreferrer">{linkText}</a>) <br />
          <button type="button" onClick={e => this.props.handleClickDelete(idx)}>Delete</button>
          <br />
          <br />
        </li>
      );
    });
    return (
      <section>
        <h2>Poll Preview</h2>
        {error && <p className="error">{error}</p>}
        <ul>
          {pollItems}
        </ul>
        <p>Expires {endTime.toLocaleString(
            [],
            {
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric'
            }
          )}</p>
        <button type="button" onClick={this.props.prevStep}>Back</button>
        {(this.props.poll)
          ? <button type="button" onClick={this.props.handleClickUpdate}>Update Poll</button>
          : <button type="button" onClick={this.props.handleClickPublish}>Publish Poll</button>
        } {' '}
      </section>
    );
  }
}

Preview.defaultProps = {
  values: {
    items: []
  }
}

export default Preview;
