"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRoles = void 0;
// src/utils/generatePermissions.ts
const typeorm_1 = require("typeorm");
const role_entity_1 = require("../entities/user/role.entity");
const orm_config_1 = __importDefault(require("../configs/orm.config"));
const roles = ['admin', 'user', 'employees'];
const generateRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = (0, typeorm_1.getConnection)();
    const roleRepository = orm_config_1.default.getRepository(role_entity_1.Role);
    const schemaBuilder = connection.options.type === "mysql" ? connection.driver.database : connection.name;
    const doesTableExist = yield connection.query(`
        SELECT *
        FROM information_schema.tables
        WHERE table_schema = '${schemaBuilder}'
        AND table_name = 'role'
    `);
    if (!doesTableExist.length) {
        yield connection.query(`
            CREATE TABLE role (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
            )
        `);
    }
    for (const role of roles) {
        const roleExists = yield roleRepository.findOne({ where: { name: role } });
        if (!roleExists) {
            const roleCreate = roleRepository.create({
                name: `role`
            });
            yield roleRepository.save(roleCreate);
        }
    }
});
exports.generateRoles = generateRoles;
