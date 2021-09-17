import { ModuleSetup } from './ModuleSetup';
import { motorSetup } from './motorSetup';

export class ModuleMotorSetup extends ModuleSetup {
  static getName(): string {
    return 'motor-setup';
  }

  async handle(event: Electron.IpcMainEvent, request: motorSetup): Promise<void> {
    const { id } = request;
    if (this.unlock()) {
      await this.client.write(51711, [id]);
      // read
      const buffer = await this.client.read(51714, 1);
      const starterFunction = ModuleMotorSetup.getStarterFunction(buffer[0]);
    }
  }

  static getStarterFunction(buf: number): string {
    return 'direct-starter';
  }
}
