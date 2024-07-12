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
exports.generatePermissions = void 0;
const permission_entity_1 = require("../entities/user/permission.entity");
const orm_config_1 = __importDefault(require("../configs/orm.config"));
const actions = ['create', 'read', 'update', 'delete'];
const generatePermissions = () => __awaiter(void 0, void 0, void 0, function* () {
    yield orm_config_1.default.initialize();
    const permissionRepository = orm_config_1.default.getRepository(permission_entity_1.Permission);
    // Generate permissions for each entity
    const entities = orm_config_1.default.entityMetadatas;
    const permissionSeed = [];
    for (const entity of entities) {
        const modelName = entity.name.toLowerCase();
        for (const action of actions) {
            const codename = `${action}_${modelName}`;
            const permissionExists = yield permissionRepository.findOne({ where: { codename } });
            if (!permissionExists) {
                const permission = {
                    name: `${action} ${modelName}`,
                    codename,
                    entity_name: modelName,
                };
                permissionSeed.push(permission);
            }
        }
    }
    yield orm_config_1.default.destroy();
    return permissionSeed;
});
exports.generatePermissions = generatePermissions;
