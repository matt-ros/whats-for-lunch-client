import React from 'react';
import ReactDOM from 'react-dom';
import CreatePoll from './CreatePoll';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <CreatePoll />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
