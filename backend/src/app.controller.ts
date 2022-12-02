import { Controller, Post, Body, Get, Delete, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { DataService } from './data/data.service';
import { RecordService } from './record/record.service';

interface LinkResponse {
  error: number;
  connectionState: string;
  id?: string;
  firmware_ver?: string;
  hw?: string;
}

@Controller('link')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  connect(@Body('id') id: string): LinkResponse {
    const res = this.appService.connect(id);
    return {
      error: res ? 0 : 1,
      connectionState: this.appService.sensor?.connectionState,
    };
  }

  @Get()
  status(): LinkResponse {
    return {
      error: 0,
      connectionState: this.appService.sensor?.connectionState ?? 'closed',
      id: this.appService.sensor?.id,
      firmware_ver: this.appService.sensor?.firmware_ver,
      hw: this.appService.sensor?.hw,
    };
  }

  @Delete()
  async disconnect(): Promise<LinkResponse> {
    await this.appService.disconnect();
    return {
      error: 0,
      connectionState: this.appService.sensor?.connectionState ?? 'closed',
    };
  }
}

@Controller('record')
export class RecordController {
  constructor(
    private readonly appService: AppService,
    private readonly recordService: RecordService,
  ) {}

  @Get('list')
  async list() {
    return this.recordService.findAll();
  }

  @Get('start?')
  async start(@Query('name') name: string) {
    const res = await this.appService.start(name);
    if (!res) return { error: 1 };
    return {
      error: 0,
    };
  }

  @Get('stop')
  stop() {
    this.appService.stop();
    return {
      error: 0,
    };
  }
}

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get()
  async list(@Query('record_id') record_id: number) {
    if (!record_id) return [];
    return this.dataService.findByRecordId(record_id);
  }

  @Get('last')
  async statistics() {
    const res = await this.dataService.findAll();
    return res[res.length - 1];
  }
}
