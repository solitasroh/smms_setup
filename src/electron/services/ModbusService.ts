import ModbusRTU from 'modbus-serial';

export abstract class ModbusService {
  readonly client: ModbusRTU;

  constructor() {
    this.client = new ModbusRTU();
  }

  abstract read(address: number, len: number): Promise<number[]>;

  abstract write(address: number, data: number[]): void;
}
