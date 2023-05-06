import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateEntry1683217980509 implements MigrationInterface {
  name = 'UpdateEntry1683217980509';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "entry" ADD "value" double precision`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "value"`);
  }
}
