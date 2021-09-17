import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import Header from './header';
import SubHeader from './SubHeader';

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export default () => {
  return (
    <BrowserRouter>
      <Container>
        <Header />
        <SubHeader />
      </Container>
    </BrowserRouter>
  );
};
