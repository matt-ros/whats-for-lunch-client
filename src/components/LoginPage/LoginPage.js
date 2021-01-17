import React from 'react';

class LoginPage extends React.Component {
  handleSubmit = e => {
    const { user_name, password } = e.target;
    user_name.value = '';
    password.value = '';
    this.props.history.push('/homepage');
  }

  render() {
    return (
      <>
        <header role="banner">
          <h1>What's For Lunch?</h1>
        </header>

        <section>
          <h2>Log In</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="user_name">Username: </label>
            <input type="text" name="user_name" id="user_name" /> <br />
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" /> <br />
            <button type="submit">Log In</button>
          </form>
        </section>
      </>
    );
  }
}

export default LoginPage;
