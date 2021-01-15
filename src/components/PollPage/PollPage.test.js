import React from 'react';
import ReactDOM from 'react-dom';
import PollPage from './PollPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <PollPage />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
