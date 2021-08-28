import * as React from 'react';
import GlobalStyles from './views/globalStyles';
import Router from './views/Router';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Router />
      <GlobalStyles></GlobalStyles>
    </React.Fragment>
  );
};

export default App;
