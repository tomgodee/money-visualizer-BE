import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';
import { Entry } from './entry.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Entry])],
  providers: [EntriesService],
  controllers: [EntriesController],
  exports: [TypeOrmModule],
})
export class EntriesModule {}
