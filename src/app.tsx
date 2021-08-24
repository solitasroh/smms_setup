import * as React from "react";
import { IpcService } from "./services/ipc-service";

const App: React.FC = () => {
  const onClick = async () => {
    const service = new IpcService();
    const t = await service.send<{ result: boolean }>("host-connect");
    console.log(t);
  };
  return (
    <div>
      <button onClick={onClick}>server connect</button>
    </div>
  );
};

export default App;
