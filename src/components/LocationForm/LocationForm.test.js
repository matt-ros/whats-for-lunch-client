import React from 'react';
import ReactDOM from 'react-dom';
import LocationForm from './LocationForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <LocationForm />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
