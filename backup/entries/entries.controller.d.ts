import { EntriesService } from './entries.service';
import { Entry } from './interfaces/entry.interface';
export declare class EntriesController {
    private entriesService;
    constructor(entriesService: EntriesService);
    findAll(): Promise<Entry[]>;
}
