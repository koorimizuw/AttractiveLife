import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Data {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  record_id: number;

  @Column('timestamp')
  time: Date;

  @Column('int')
  distance: number;
}
