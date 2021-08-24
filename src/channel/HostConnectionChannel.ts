import { ModbusTcpService } from "./../services/modbus-service";
import { IpcRequest } from "../ipc/ipcRequest";
import { IpcChannel } from "../ipc/ipcChannel";

export interface HostConnectChannelArg extends IpcRequest {
  ip: string;
  port?: number;
}

export class HostConnectionChannel
  implements IpcChannel<HostConnectChannelArg>
{
  private service: ModbusTcpService;

  constructor(service: ModbusTcpService) {
    this.service = service;
  }
  getName(): string {
    return "host-connect";
  }

  async handle(
    event: Electron.IpcMainEvent,
    request: HostConnectChannelArg
  ): Promise<void> {
    const { ip, port } = request;

    const connected = await this.service.connect({ ip, port });

    event.sender.send(request.responseChannel, {
      success: connected,
    });
  }
}
