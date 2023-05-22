import { Controller, Get, Param, Query } from '@nestjs/common';

import { QueryEntryDto } from './dto/query-entry.dto';
import { EntriesService } from './entries.service';
import { Entry } from './interfaces/entry.interface';

@Controller('entries')
export class EntriesController {
  constructor(private entriesService: EntriesService) {}

  @Get('/count')
  count(): Promise<number> {
    return this.entriesService.count();
  }

  @Get(':id')
  async getOneById(@Param() params: { id: number }): Promise<Entry> {
    return this.entriesService.getOne(params);
  }

  @Get()
  async getAll(@Query() query: QueryEntryDto): Promise<Entry[]> {
    return this.entriesService.getAll(query);
  }
}
