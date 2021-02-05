import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class Success extends React.Component {
  state = {
    copied: false,
  }

  handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/poll/${this.props.location.state.pollId}`);
      this.setState({ copied: true });
    } catch (res) {
      console.log(res);
    }
  }

  render() {
    const pollId = (this.props.location.state) ? this.props.location.state.pollId : null;
    return (
      <section>
        {!pollId && <Redirect to="/homepage" />}
        <h2>Success!!</h2>
        <p>Your poll is located <Link to={`/poll/${pollId}`}>here</Link></p>
        <button type="button" onClick={this.handleShare}>Share This Poll!</button>
        {this.state.copied && <p>Copied to Clipboard!</p>}
      </section>
    );
  }
}

Success.defaultProps = {
  location: {},
}

export default Success;
