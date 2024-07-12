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
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// Services
const role_service_1 = __importDefault(require("../../services/user/role.service"));
// Utilities
const api_response_utility_1 = __importDefault(require("../../utilities/api-response.utility"));
// Constants
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            name: req.body.name,
            permissions: req.body.permissions,
            users: req.body.permissions,
        };
        const role = yield role_service_1.default.create(params);
        return api_response_utility_1.default.result(res, role, http_status_codes_1.default.CREATED);
    }
    catch (e) {
        console.error('Error creating role:', e);
        return api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const params = {
            name: req.body.name,
            permissions: req.body.permissions,
            users: req.body.users,
        };
        const role = yield role_service_1.default.update(id, params);
        return api_response_utility_1.default.result(res, role, http_status_codes_1.default.OK);
    }
    catch (e) {
        console.error('Error updating role:', e);
        return api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST);
    }
});
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield role_service_1.default.list();
        return api_response_utility_1.default.result(res, data, http_status_codes_1.default.OK, null);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
});
exports.default = {
    create,
    list,
    update
};
