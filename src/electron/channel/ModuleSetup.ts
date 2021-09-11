import { IpcChannel } from '../ipc/ipcChannel';
import { ModbusService } from '../services/ModbusService';
import { motorSetup } from './motorSetup';

export abstract class ModuleSetup implements IpcChannel<motorSetup> {
  setupName = 'string';

  private readonly addrSetupLock: number = 51000;

  protected readonly client: ModbusService;

  constructor(client: ModbusService) {
    this.client = client;
  }

  getName(): string {
    return this.setupName;
  }

  handle(event: Electron.IpcMainEvent, request: motorSetup): void {
    this.client.read(1000, 10);
  }

  protected async unlock(): Promise<boolean> {
    if (!this.client) {
      const read = await this.client.read(this.addrSetupLock, 1);

      if (read[0] === 1) {
        this.client.write(this.addrSetupLock, [2300]);
        this.client.write(this.addrSetupLock, [0]);
        this.client.write(this.addrSetupLock, [700]);
        this.client.write(this.addrSetupLock, [1]);
      }

      const result = await this.client.read(this.addrSetupLock, 1);
      if (result[0] === 0) {
        return true;
      }
      return false;
    }
    return false;
  }
}
