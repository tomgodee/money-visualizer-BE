import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntriesModule } from './entries/entries.module';

import { DataSourceOptions } from 'typeorm';
import { Entry } from './entries/entry.entity';
import 'dotenv/config'; // this would make .env file works

// Redefine dataSourceConfig since for some reason deployment doesnt recognize the datasource when reading this file
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
  migrationsRun: true,
};

@Module({
  imports: [
    EntriesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...dataSourceConfig,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
