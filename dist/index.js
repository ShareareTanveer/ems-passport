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
require('dotenv').config();
require("reflect-metadata");
const logger_config_1 = __importDefault(require("./configs/logger.config"));
const express_config_1 = __importDefault(require("./configs/express.config"));
const orm_config_1 = __importDefault(require("./configs/orm.config"));
const PORT = process.env.PORT || 5000;
orm_config_1.default
    .initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    logger_config_1.default.info('Connected to database successfully');
    express_config_1.default.listen(PORT, () => {
        logger_config_1.default.info(`Server running at ${PORT}`);
    });
}))
    .catch((error) => logger_config_1.default.error(`The connection to the database failed with error: ${error}`));
