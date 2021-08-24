import { IpcRequest } from "../ipc/ipcRequest";
import { IpcChannel } from "../ipc/ipcChannel";
import { ModbusService } from "../services/modbus-service";

export interface motorSetup extends IpcRequest {
  id: number; // 1~40
}

export abstract class ModuleSetup implements IpcChannel<motorSetup> {
  private readonly addr_setup_lock: number = 51000;

  protected readonly client: ModbusService;

  constructor(client: ModbusService) {
    this.client = client;
  }
  getName(): string {
    return "";
  }
  handle(event: Electron.IpcMainEvent, request: motorSetup): void {
    return;
  }

  protected async unlock(): Promise<boolean> {
    if (!this.client) {
      console.log(this.client);

      const read = await this.client.read(this.addr_setup_lock, 1);
      if (read[0] == 1) {
        await this.client.write(this.addr_setup_lock, [2300]);
        await this.client.write(this.addr_setup_lock, [0]);
        await this.client.write(this.addr_setup_lock, [700]);
        await this.client.write(this.addr_setup_lock, [1]);
      }

      const result = await this.client.read(this.addr_setup_lock, 1);
      if (result[0] == 0) {
        return true;
      }
      return false;
    }
  }
}
export class ModuleMotorSetup extends ModuleSetup {
  getName(): string {
    return "motor-setup";
  }
  async handle(
    event: Electron.IpcMainEvent,
    request: motorSetup
  ): Promise<void> {
    const { id } = request;
    if (this.unlock()) {
      await this.client.write(51711, [id]);
      // read
      const buffer = await this.client.read(51714, 1);
      const starterFunction = this.getStarterFunction(buffer[0]);
    }
    return;
  }

  private getStarterFunction(buf: number): string {
    return "direct-starter";
  }
}
