import { DataSource, DataSourceOptions } from 'typeorm';
import { Entry } from './entries/entry.entity';
import 'dotenv/config'; // this would make .env file works

export const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Entry],
  // entities: ['../**/*.entity.{ts,js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceConfig);

export default dataSource;
