import React from 'react';
import ReactDOM from 'react-dom';
import PollResultsPage from './PollResultsPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <PollResultsPage match={{ params: { id: 1 } }} />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
