import React from 'react';
import ReactDOM from 'react-dom';
import PollNameForm from './PollNameForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <PollNameForm />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
