import * as React from 'react';
import styled from 'styled-components';
import GlobalStyles from './views/globalStyles';
import Router from './views/Router';

const Container = styled.div`
  display: flex;
`;

const App: React.FC = () => {
  return (
    <Container>
      <Router />
      <GlobalStyles></GlobalStyles>
    </Container>
  );
};

export default App;
