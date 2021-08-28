import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './header';

export default () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Header></Header>
        <div>body</div>
      </React.Fragment>
    </BrowserRouter>
  );
};
