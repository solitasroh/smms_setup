import { IpcRequest } from '../ipc/ipcRequest';

export interface motorSetup extends IpcRequest {
  id: number; // 1~40
}
