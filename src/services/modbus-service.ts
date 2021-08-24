import ModbusRTU from "modbus-serial";

export interface connectionConfig {
  ip: string;
  port?: number;
  timeout?: number;
}

export abstract class ModbusService {
  readonly client: ModbusRTU;

  constructor() {
    this.client = new ModbusRTU();
  }
  abstract read(address: number, len: number): number[];
  abstract write(address: number, data: number[]): void;
}

export class ModbusTcpService extends ModbusService {
  constructor() {
    super();
  }

  async connect({
    ip,
    port = 502,
    timeout = 5000,
  }: connectionConfig): Promise<boolean> {
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
        this.onConnected
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

  read(address: number, len: number): number[] | null {
    console.log(` address: ${address} length: ${len}`);

    return null;
  }

  write(address: number, data: number[]): void {
    throw new Error("Method not implemented.");
  }

  private onClose() {
    console.log("server closed");
  }

  private onConnected() {
    console.log("connected");
  }
}
