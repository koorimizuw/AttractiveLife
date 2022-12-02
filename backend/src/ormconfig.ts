import { DataSource } from 'typeorm';
import { Data } from './entities/data.entity';
import { Record } from './entities/record.entity';

const source = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'docker',
  database: 'develop',
  entities: [Record, Data],
  migrations: ['src/migration/**/*.ts'],
  synchronize: true,
});

export default source;
