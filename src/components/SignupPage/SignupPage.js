import React from 'react';
import UsersApiService from '../../services/users-api-service';

class SignupPage extends React.Component {
  state = {
    error: null,
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ error: null });
    const { full_name, user_name, password } = e.target;
    const newUser = {
      full_name: full_name.value,
      user_name: user_name.value,
      password: password.value
    };

    try {
      await UsersApiService.postUser(newUser);
      full_name.value = '';
      user_name.value = '';
      password.value = '';
      this.props.history.push('/login');
    } catch (res) {
      this.setState({ error: res.error });
    }
  }

  render() {
    const { error } = this.state;

    return (
      <section>
        <h2>Sign Up!</h2>
        {error && <p className="error">{error}</p>}
        <p>Creating an account allows you to edit and reuse your polls</p>
        <form className="signup" id="signup" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="full_name">Full Name: </label>
            <input type="text" name="full_name" id="full_name" required />
          </div>
          <div>
            <label htmlFor="user_name">Username: </label>
            <input type="text" name="user_name" id="user_name" required />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" required />
          </div>
        </form>
        <button type="submit" form="signup">Sign Up!</button>
      </section>
    );
  }
}

export default SignupPage;
