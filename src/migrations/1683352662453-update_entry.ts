import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateEntry1683352662453 implements MigrationInterface {
  name = 'UpdateEntry1683352662453';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME COLUMN "name" TO "input"`,
    );

    await queryRunner.query(
      `ALTER TABLE "entry" ADD "original_answer" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" ADD "requested_times" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entry" DROP COLUMN "requested_times"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" DROP COLUMN "original_answer"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" RENAME COLUMN "input" TO "name"`,
    );
  }
}
