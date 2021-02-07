import React from 'react';
import ReactDOM from 'react-dom';
import PollForm from '../PollForm/PollForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <PollForm />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
