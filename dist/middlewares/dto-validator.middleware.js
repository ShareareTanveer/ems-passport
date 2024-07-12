"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDTO = validateDTO;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const api_response_utility_1 = __importDefault(require("../utilities/api-response.utility"));
function validateDTO(dtoClass) {
    return (req, res, next) => {
        const dtoObject = (0, class_transformer_1.plainToInstance)(dtoClass, req.body);
        (0, class_validator_1.validate)(dtoObject).then((errors) => {
            if (errors.length > 0) {
                console.log(errors);
                const firstError = errors[0];
                const firstErrorMessage = Object.values(firstError.constraints || {})[0];
                return api_response_utility_1.default.error(res, 400, firstErrorMessage);
            }
            else {
                req.body = dtoObject;
                next();
            }
        });
    };
}
