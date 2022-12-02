import { Injectable } from '@nestjs/common';
import Obniz from 'obniz';
import HCSR04 from 'obniz/dist/src/parts/DistanceSensor/HC-SR04';
import { DataService } from './data/data.service';
import { RecordService } from './record/record.service';

@Injectable()
export class AppService {
  constructor(
    private readonly recordService: RecordService,
    private readonly dataService: DataService,
  ) {}

  sensor: Obniz;
  id: string;
  hcsr04: HCSR04;
  timer: NodeJS.Timer;

  connect(id: string) {
    if (
      this.sensor?.connectionState === 'connected' ||
      this.sensor?.connectionState === 'connecting'
    )
      return false;

    const ObnizClass = require('obniz');
    this.sensor = new ObnizClass(id);
    if (!this.sensor) return false;

    this.id = id;
    this.sensor.onconnect = async () => {
      this.hcsr04 = this.sensor.wired('HC-SR04', {
        gnd: 0,
        echo: 1,
        trigger: 2,
        vcc: 3,
      });
    };

    return true;
  }

  async disconnect() {
    if (!this.sensor) return;

    this.sensor.closeWait();
  }

  async getDistance() {
    if (!(this.sensor?.connectionState === 'connected')) return;
    return await this.hcsr04.measureWait();
  }

  async start(name: string): Promise<boolean> {
    if (!(this.sensor?.connectionState === 'connected')) return false;

    const record = await this.recordService.newRecord(name);
    this.timer = setInterval(async () => {
      const distance = await this.getDistance();
      if (!distance) return;
      console.log(distance);
      this.dataService.insert(record.id, distance);
    }, 1000);
    return true;
  }

  stop(): boolean {
    clearInterval(this.timer);
    return true;
  }
}
