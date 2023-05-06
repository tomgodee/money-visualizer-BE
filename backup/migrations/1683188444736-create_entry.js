"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEntry1683188444736 = void 0;
class CreateEntry1683188444736 {
    constructor() {
        this.name = 'CreateEntry1683188444736';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "entry" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_a58c675c4c129a8e0f63d3676d6" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "entry"`);
    }
}
exports.CreateEntry1683188444736 = CreateEntry1683188444736;
//# sourceMappingURL=1683188444736-create_entry.js.map