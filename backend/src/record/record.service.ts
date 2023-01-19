import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Record } from 'src/entities/record.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private recordRepository: Repository<Record>,
  ) {}

  findAll(): Promise<Record[]> {
    return this.recordRepository.find({ order: { id: 'desc' } });
  }

  async newRecord(name: string): Promise<Record> {
    const record = this.recordRepository.create({ name });
    return await this.recordRepository.save(record);
  }
}
