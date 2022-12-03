import { DataSource, DataSourceOptions } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
export const dataSourceOptions: DataSourceOptions = {
  name: 'default',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Shuri3546#',
  database: 'shop2',
  synchronize: true,
  dropSchema: false,
  migrationsRun: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/**/*{.ts,.js}'],
  subscribers: [__dirname + '/db/subscribers/**/*{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);
dataSource.initialize();
export default dataSource;
