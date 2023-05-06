"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceConfig = void 0;
const typeorm_1 = require("typeorm");
const entry_entity_1 = require("./entries/entry.entity");
exports.dataSourceConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'zxc321',
    database: 'money-visualizer',
    entities: [entry_entity_1.Entry],
    migrations: ['dist/migrations/*{.ts,.js}'],
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceConfig);
exports.default = dataSource;
//# sourceMappingURL=datasource.js.map