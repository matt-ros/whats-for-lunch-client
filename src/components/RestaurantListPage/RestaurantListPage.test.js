import React from 'react';
import ReactDOM from 'react-dom';
import RestaurantListPage from './RestaurantListPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <RestaurantListPage />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
