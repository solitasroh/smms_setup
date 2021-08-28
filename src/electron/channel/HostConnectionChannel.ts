import { ModbusTcpService } from '../services/modbus-service';
import { IpcRequest } from '../ipc/ipcRequest';
import { IpcChannel } from '../ipc/ipcChannel';

export interface HostConnectChannelArg extends IpcRequest {
  ip: string;
  port?: number;
}

export class HostConnectionChannel implements IpcChannel<HostConnectChannelArg> {
  private service: ModbusTcpService;

  private name: string;

  constructor(service: ModbusTcpService) {
    this.service = service;
    this.name = 'host-connect';
  }

  getName(): string {
    return this.name;
  }

  async handle(event: Electron.IpcMainEvent, request: HostConnectChannelArg): Promise<void> {
    const { ip, port } = request;

    const connected = await this.service.connect({ ip, port });

    event.sender.send(request.responseChannel, {
      success: connected,
    });
  }
}
