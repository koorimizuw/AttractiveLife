import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Data } from 'src/entities/data.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Data)
    private dataRepository: Repository<Data>,
  ) {}

  findAll(): Promise<Data[]> {
    return this.dataRepository.find();
  }

  findOne(id: number): Promise<Data> {
    return this.dataRepository.findOneBy({ id });
  }

  findByRecordId(record_id: number): Promise<Data[]> {
    return this.dataRepository.findBy({ record_id });
  }

  async remove(id: number): Promise<void> {
    await this.dataRepository.delete(id);
  }

  async insert(record_id: number, distance: number): Promise<void> {
    const now = new Date();
    await this.dataRepository.insert({ record_id, distance, time: now });
  }
}
