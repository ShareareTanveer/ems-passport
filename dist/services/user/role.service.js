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
// Entities
const user_entity_1 = require("../../entities/user/user.entity");
const permission_entity_1 = require("../../entities/user/permission.entity");
// Errors
const role_entity_1 = require("../../entities/user/role.entity");
const orm_config_1 = __importDefault(require("../../configs/orm.config"));
const create = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, permissions, users } = params;
    const roleRepository = orm_config_1.default.getRepository(role_entity_1.Role);
    const permissionRepository = orm_config_1.default.getRepository(permission_entity_1.Permission);
    const userRepository = orm_config_1.default.getRepository(user_entity_1.User);
    const role = new role_entity_1.Role();
    role.name = name;
    if (permissions) {
        const permissionEntities = yield permissionRepository.findByIds(permissions);
        role.permissions = permissionEntities;
    }
    if (users) {
        const userEntities = yield userRepository.findByIds(users);
        role.users = userEntities;
    }
    yield roleRepository.save(role);
    return yield roleRepository.save(role);
});
const update = (id, params) => __awaiter(void 0, void 0, void 0, function* () {
    const roleRepository = orm_config_1.default.getRepository(role_entity_1.Role);
    const permissionRepository = orm_config_1.default.getRepository(permission_entity_1.Permission);
    const userRepository = orm_config_1.default.getRepository(user_entity_1.User);
    console.log("params", params);
    const { name, permissions, users } = params;
    const role = yield roleRepository.findOne({ where: { id: id }, relations: ['permissions', 'users'] });
    if (!role) {
        throw new Error('Role not found');
    }
    if (name) {
        role.name = name;
    }
    if (permissions) {
        const permissionEntities = yield permissionRepository.findByIds(permissions);
        role.permissions = permissionEntities;
    }
    if (users) {
        const userEntities = yield userRepository.findByIds(users);
        role.users = userEntities;
    }
    yield roleRepository.save(role);
    return role;
});
const list = () => __awaiter(void 0, void 0, void 0, function* () {
    const roleRepository = orm_config_1.default.getRepository(role_entity_1.Role);
    return yield roleRepository.find({ relations: ['permissions', 'users'] });
});
exports.default = {
    create,
    list,
    update,
};
