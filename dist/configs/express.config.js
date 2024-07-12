"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path = require('path');
const cookieParser = require('cookie-parser');
const api_error_handler_middleware_1 = require("../middlewares/api-error-handler.middleware");
const joi_error_handler_middleware_1 = __importDefault(require("../middlewares/joi-error-handler.middleware"));
const authenticate_middleware_1 = __importDefault(require("../middlewares/authenticate.middleware"));
const index_route_1 = __importDefault(require("../routes/index.route"));
const constants_1 = __importDefault(require("../constants"));
const swagger_config_1 = __importDefault(require("./swagger.config"));
const app = (0, express_1.default)();
(0, swagger_config_1.default)(app);
app.use((req, res, next) => {
    const origin = req.get('origin');
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma, Access-Control-Request-Method, Access-Control-Allow-Headers, Access-Control-Request-Headers');
    if (req.method === 'OPTIONS') {
        res.sendStatus(204);
    }
    else {
        next();
    }
});
const corsOption = {
    origin: [process.env.FRONTEND_BASE_URL],
    methods: 'GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE',
    credentials: true,
};
app.use((0, cors_1.default)(corsOption));
app.use(cookieParser());
app.use(bodyParser.json());
app.use((0, morgan_1.default)('dev'));
app.use(authenticate_middleware_1.default);
// Router
app.use(constants_1.default.APPLICATION.url.basePath, index_route_1.default);
// Joi Error Handler
app.use(joi_error_handler_middleware_1.default);
// Error Handler
app.use(api_error_handler_middleware_1.notFoundErrorHandler);
app.use(api_error_handler_middleware_1.errorHandler);
// static
app.use(express_1.default.static(path.join(__dirname, 'public')));
exports.default = app;
