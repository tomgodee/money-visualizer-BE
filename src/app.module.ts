import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceConfig } from './datasource';
import { EntriesModule } from './entries/entries.module';

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
