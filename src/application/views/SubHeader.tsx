import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
  height: 100%;
  background-color: #bb4e4e;
`;

const MenuItem = styled.div`
  width: 100%;
  height: 32px;
  background-color: #ffffff;
  color: black;
`;

const SubHeader: React.FC = () => {
  return (
    <Container>
      <MenuItem>Menu1</MenuItem>
      <MenuItem>Menu2</MenuItem>
      <MenuItem>Menu3</MenuItem>
    </Container>
  );
};

export default SubHeader;
