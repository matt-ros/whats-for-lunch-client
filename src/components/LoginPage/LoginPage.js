import React from 'react';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';

class LoginPage extends React.Component {
  state = {
    error: null,
  }

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = e.target;
    const loginUser = {
      user_name: user_name.value,
      password: password.value
    };
    try {
      const res = await AuthApiService.postLogin(loginUser);
      user_name.value = '';
      password.value = '';
      TokenService.saveAuthToken(res.authToken);
      this.props.history.push('/homepage');
    } catch (res) {
      this.setState({ error: res.error });
    }
  }

  render() {
    const { error } = this.state;

    return (
      <section>
        <h2>Log In</h2>
        {(error)
          ? <div className="error">{error}</div>
          : null }
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="user_name">Username: </label>
          <input type="text" name="user_name" id="user_name" /> <br />
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" id="password" /> <br />
          <button type="submit">Log In</button>
        </form>
        <p>Demo account credentials:</p>
        <p>Username: demo</p>
        <p>Password: Password1!</p>
      </section>
    );
  }
}

export default LoginPage;
