import { ModbusService } from './ModbusService';

export interface connectionConfig {
  ip: string;
  port?: number;
  timeout?: number;
}

export class ModbusTcpService extends ModbusService {
  closed: boolean;

  connected: boolean;

  async connect({ ip, port = 502, timeout = 5000 }: connectionConfig): Promise<boolean> {
    try {
      if (this.client.isOpen) {
        this.client.close(this.onClose);
      }
      this.client.setTimeout(timeout);
      this.client.connectTCP(
        ip,
        {
          port,
        },
        this.onConnected,
      );

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  disconnect(): void {
    try {
      if (this.client.isOpen) {
        this.client.close(this.onClose);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async read(address: number, len: number): Promise<number[]> {
    const result = await this.client.readHoldingRegisters(address, len);
    return result.data;
  }

  async write(address: number, data: number[]): Promise<void> {
    await this.client.writeRegisters(address, data);
  }

  private onClose() {
    this.closed = true;
  }

  private onConnected() {
    this.connected = true;
  }
}
