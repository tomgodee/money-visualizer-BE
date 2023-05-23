import { firstValueFrom } from 'rxjs';
import { DataSource, Repository } from 'typeorm';

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { QueryEntryDto } from './dto/query-entry.dto';
import { Entry } from './entry.entity';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private entriesRepository: Repository<Entry>,
    private dataSource: DataSource,
    private readonly httpService: HttpService,
  ) {}

  async getAll(query: QueryEntryDto): Promise<Entry[]> {
    if (!query.input) {
      return this.entriesRepository.find({
        // TODO: Define interface for order field
        order: {
          requested_times: 'desc',
          id: 'asc',
        },
        take: query?.limit || 10,
        skip: query?.offset || 0,
      });
    } else {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        const entries = await queryRunner.manager.findBy(Entry, {
          input: query.input,
        });

        if (!entries.length) {
          const entryValues = await this.getEntryValues(query.input);
          const entry = await queryRunner.manager.create(Entry, {
            input: query.input,
            value: entryValues.value,
            original_answer: entryValues.original_answer,
            requested_times: 1,
          });
          entries.push(entry);
          await queryRunner.manager.insert(Entry, entry);
        } else {
          await queryRunner.manager.update(
            Entry,
            { id: entries[0].id },
            {
              requested_times: entries[0].requested_times + 1,
            },
          );
        }

        await queryRunner.commitTransaction();

        return entries;
      } catch (err) {
        // since we have errors lets rollback the changes we made
        await queryRunner.rollbackTransaction();
      } finally {
        // you need to release a queryRunner which was manually instantiated
        await queryRunner.release();
      }
    }
  }

  getEntryValues = async (name: string) => {
    const entryValue = await firstValueFrom(
      this.httpService.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `How much does ${name} cost, answer less than 10 words!`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.CHAT_GPT_SECRET_KEY}`,
          },
        },
      ),
    );

    const original_answer: string = entryValue.data.choices[0].message.content;
    const valueExtractionRegex =
      /(?=\$)*(\d+(?:\.\d{1})*\ (?:billion|million)*|\d{1,3}(?:,\d{3})*)(?=\.)/;
    const extractedAnswer = original_answer.match(valueExtractionRegex);

    return {
      value: extractedAnswer ? this.extractValue(extractedAnswer) : null,
      original_answer,
    };
  };

  async getOne(query: { id: number }): Promise<Entry> {
    return this.entriesRepository.findOneBy({
      id: query.id,
    });
  }

  async count(): Promise<number> {
    return this.entriesRepository.count();
  }

  extractValue(extractedAnswer: RegExpMatchArray) {
    let value: number;
    if (
      extractedAnswer.includes('million') ||
      extractedAnswer.includes('billion')
    ) {
      value = Number(
        extractedAnswer[0]
          .replace(/\,(?:1|2|3|4|5|6|7|8|9)/g, '')
          .replace(/\.(?:1|2|3|4|5|6|7|8|9)/g, '')
          .replace(' billion', '000000000')
          .replace(' million', '000000'),
      );
    } else {
      value = Number(
        extractedAnswer[0]
          .replace(',', '')
          .replace('.', '')
          .replace(' billion', '000000000')
          .replace(' million', '000000'),
      );
    }

    return value;
  }
}
