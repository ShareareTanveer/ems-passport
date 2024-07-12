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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedPermissionsAndRoles1620677033811 = void 0;
const user_seed_1 = require("../seeds/user.seed");
const role_seed_1 = require("../seeds/role.seed");
const permission_entity_1 = require("../entities/user/permission.entity");
const generatePermission_utility_1 = require("../utilities/generatePermission.utility");
class SeedPermissionsAndRoles1620677033811 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Use the queryRunner to get the repository
            const roleRepository = queryRunner.manager.getRepository('role');
            const userRepository = queryRunner.manager.getRepository('user');
            const permissionRepository = queryRunner.manager.getRepository(permission_entity_1.Permission);
            // roleSeed
            yield roleRepository.save(role_seed_1.roleSeed);
            // userSeed
            yield userRepository.save(user_seed_1.userSeed);
            // permissionsSeed
            const permissionSeed = yield (0, generatePermission_utility_1.generatePermissions)();
            for (const permission of permissionSeed) {
                const permissionExists = yield permissionRepository.findOne({
                    where: { codename: permission.codename },
                });
                if (!permissionExists) {
                    const newPermission = permissionRepository.create(permission);
                    yield permissionRepository.save(newPermission);
                }
            }
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Use the queryRunner to get the repository
            const permissionRepository = queryRunner.manager.getRepository(permission_entity_1.Permission);
            const permissionSeed = yield (0, generatePermission_utility_1.generatePermissions)();
            for (const permission of permissionSeed) {
                yield permissionRepository.delete({ codename: permission.codename });
            }
        });
    }
}
exports.SeedPermissionsAndRoles1620677033811 = SeedPermissionsAndRoles1620677033811;
