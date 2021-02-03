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
        <Link to="/homepage">Home</Link>
        <br />
        <button type="button" className="logout" onClick={this.handleLogout}>Log Out</button>
      </>
    );
  }

  renderLoggedOut() {
    return (
      <>
        <Link to="/">Home</Link>
        <br />
        <Link to="/login">Log In</Link> | <Link to="/signup">Sign Up</Link>
      </>
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
