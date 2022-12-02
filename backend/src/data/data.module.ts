import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Data } from 'src/entities/data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Data])],
  exports: [TypeOrmModule],
})
export class DataModule {}
