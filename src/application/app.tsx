import * as React from 'react';
import GlobalStyles from './views/globalStyles';
import Router from './views/Router';
import FileWatcher from './views/Watcher';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <FileWatcher />
      <GlobalStyles></GlobalStyles>
    </React.Fragment>
  );
};

export default App;
