import React from 'react';

class SignupPage extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const { full_name, user_name, password } = e.target;
    full_name.value = '';
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
          <h2>Sign Up!</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="full_name">Full Name: </label>
            <input type="text" name="full_name" id="full_name" /> <br />
            <label htmlFor="user_name">Username: </label>
            <input type="text" name="user_name" id="user_name" /> <br />
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" /> <br />
            <button type="submit">Sign Up!</button>
          </form>
        </section>
      </>
    )
  }
}

export default SignupPage;
