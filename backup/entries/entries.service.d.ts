import { DataSource, Repository } from 'typeorm';
import { Entry } from './entry.entity';
export declare class EntriesService {
    private entriesRepository;
    private dataSource;
    constructor(entriesRepository: Repository<Entry>, dataSource: DataSource);
    findAll(): Promise<Entry[]>;
    findOne(id: number): Promise<Entry | null>;
    createOne(entry: Entry): Promise<void>;
    remove(id: number): Promise<void>;
}
