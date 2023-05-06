import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEntry1683188444736 implements MigrationInterface {
  name = 'CreateEntry1683188444736';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "entry" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_a58c675c4c129a8e0f63d3676d6" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "entry"`);
  }
}
