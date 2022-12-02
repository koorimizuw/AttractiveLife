import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from 'src/entities/record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Record])],
  exports: [TypeOrmModule],
})
export class RecordModule {}
