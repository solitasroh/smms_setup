import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: #056674;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
`;

const Label = styled.label`
  margin-right: 5px;
  color: #e0ece4;
  font-size: 12px;
  font-weight: 600;
`;
const IPLabel = styled.div`
  margin: 10px;
  width: 160px;
  background-color: #ff4b5c;
  color: white;
  border: 0px;
  font-weight: 600;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;

  text-align: center;
`;

const Text = styled.input.attrs({ type: 'text' })`
  width: 160px;
  font-size: 14px;
  padding: 10px;
  margin: 10px;
  border: 0px;
  text-align: center;
`;

const Header: React.FC = () => {
  const [ipAddress, setIpAddress] = React.useState('10.10.10.100');
  const [connectString, setConnectString] = React.useState('연결하기');
  const [isConnected, setIsConnected] = React.useState(false);

  const onClick = () => {
    if (!isConnected) {
      setIsConnected(true);
      setConnectString('연결해제');
    } else {
      setIsConnected(false);
      setConnectString('연결하기');
    }
  };
  const onKeyPressed = (e: any) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };
  const changeIpAddress = (e: any) => {
    setIpAddress(e.target.value);
  };
  const onDoubleClicked = () => {
    if (isConnected) {
      // disconnect
      setIsConnected(false);
      setConnectString('연결하기');
    }
  };

  return (
    <Container>
      <Label>A2700M IP Address</Label>
      {isConnected ? (
        <IPLabel onDoubleClick={onDoubleClicked}>{ipAddress}</IPLabel>
      ) : (
        <Text
          onChange={changeIpAddress}
          readOnly={isConnected}
          disabled={isConnected}
          onKeyPress={onKeyPressed}
          value={ipAddress}
        />
      )}
    </Container>
  );
};

export default Header;
