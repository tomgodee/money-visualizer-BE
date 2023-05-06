import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Entry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  input: string;

  @Column({ nullable: true, type: 'float' })
  value: number;

  @Column({ nullable: true })
  original_answer: string;

  @Column({ default: 0 })
  requested_times: number;
}
