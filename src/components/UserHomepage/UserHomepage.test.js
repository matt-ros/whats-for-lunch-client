import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserHomepage from './UserHomepage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <UserHomepage />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
