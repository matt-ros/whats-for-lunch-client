import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';

class Nav extends React.Component {
  handleLogout = () => {
    TokenService.clearAuthToken();
    this.props.history.push('/');
  }
  renderLoggedIn() {
    return (
      <>
        <Link to="/homepage">Home</Link> | <button type="button" onClick={this.handleLogout}>Log Out</button>
      </>
    );
  }

  renderLoggedOut() {
    return (
      <Link to="/">Home</Link>
    );
  }

  render() {
    return (
      <nav>
        {(TokenService.hasUnexpiredAuthToken())
          ? this.renderLoggedIn()
          : this.renderLoggedOut()
        }
      </nav>
    );
  }

}

export default Nav;
