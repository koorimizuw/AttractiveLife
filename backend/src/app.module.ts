import { Module } from '@nestjs/common';
import {
  AppController,
  DataController,
  RecordController,
} from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Data } from './entities/data.entity';
import { Record } from './entities/record.entity';
import { RecordModule } from './record/record.module';
import { DataModule } from './data/data.module';
import { DataSource } from 'typeorm';
import { DataService } from './data/data.service';
import { RecordService } from './record/record.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'docker',
      database: 'develop',
      entities: [Record, Data],
      synchronize: true,
    }),
    RecordModule,
    DataModule,
  ],
  controllers: [AppController, RecordController, DataController],
  providers: [AppService, DataService, RecordService],
})
export class AppModule {}
