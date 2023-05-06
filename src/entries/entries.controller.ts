import { Controller, Get, Query } from '@nestjs/common';

import { QueryEntryDto } from './dto/query-entry.dto';
import { EntriesService } from './entries.service';
import { Entry } from './interfaces/entry.interface';

@Controller('entries')
export class EntriesController {
  constructor(private entriesService: EntriesService) {}

  @Get()
  async getAll(@Query() query: QueryEntryDto): Promise<Entry[]> {
    return this.entriesService.getAll(query);
  }
}
