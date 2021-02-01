import React from 'react';
import ReactDOM from 'react-dom';
import AddItemForm from './AddItemForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <AddItemForm />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
