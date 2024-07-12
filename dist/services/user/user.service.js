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
exports.resetPassword = exports.verifyEmailOtp = exports.sendEmailOtp = void 0;
// Entities
const role_entity_1 = require("../../entities/user/role.entity");
const user_entity_1 = require("../../entities/user/user.entity");
// Utilities
const api_utility_1 = __importDefault(require("../../utilities/api.utility"));
const date_time_utility_1 = __importDefault(require("../../utilities/date-time.utility"));
const encryption_utility_1 = __importDefault(require("../../utilities/encryption.utility"));
// Errors
const orm_config_1 = __importDefault(require("../../configs/orm.config"));
const string_error_1 = require("../../errors/string.error");
const userDetails_entity_1 = require("../../entities/user/userDetails.entity");
const where = { isDeleted: false };
const create = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const roleRepository = orm_config_1.default.getRepository(role_entity_1.Role);
    const role = yield roleRepository.findOne({
        where: { id: params.role },
    });
    if (!role) {
        throw new Error(`Role with ID ${params.role} not found`);
    }
    const userDetail = new userDetails_entity_1.UserDetail();
    userDetail.phone = params.phone;
    userDetail.address = params.address;
    userDetail.gender = params.gender;
    const user = new user_entity_1.User();
    user.email = params.email;
    user.password = yield encryption_utility_1.default.generateHash(params.password, 10);
    user.firstName = params.firstName;
    user.lastName = params.lastName;
    user.role = role;
    user.details = userDetail;
    const userData = yield orm_config_1.default.getRepository(user_entity_1.User).save(user);
    return api_utility_1.default.sanitizeUser(userData);
});
const login = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield orm_config_1.default
        .getRepository(user_entity_1.User)
        .createQueryBuilder('user')
        .where('user.email = :email', { email: params.email })
        .select([
        'user.createdAt',
        'user.updatedAt',
        'user.id',
        'user.email',
        'user.password',
        'user.firstName',
        'user.lastName',
        'user.isDeleted',
    ])
        .getOne();
    if (!user) {
        throw new string_error_1.StringError('Your email has not been registered');
    }
    if (yield encryption_utility_1.default.verifyHash(params.password, user.password)) {
        return api_utility_1.default.sanitizeUser(user);
    }
    throw new string_error_1.StringError('Your password is not correct');
});
const otpStore = new Map();
const sendEmailOtp = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = orm_config_1.default.getRepository(user_entity_1.User);
    const user = yield userRepository.findOne({ where: { email: params.email } });
    if (!user) {
        throw new string_error_1.StringError('Your email has not been registered');
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(params.email, otp);
    console.log('Generated OTP:', otp);
    try {
        // await transporter.sendMail({
        //   from: process.env.DEFAULT_MAIL || 'your-email@example.com',
        //   to: [user.email,"mjsuborno117@gmail.com"],
        //   subject: 'OTP for Password Reset',
        //   text: `Your OTP for password reset: ${otp}`,
        // });
        return otp;
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send OTP. Please try again later.');
    }
});
exports.sendEmailOtp = sendEmailOtp;
const verifyEmailOtp = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const storedOtp = otpStore.get(params.email);
    if (!storedOtp || storedOtp !== JSON.stringify(params.otp)) {
        throw new string_error_1.StringError('Invalid OTP');
    }
    return true;
});
exports.verifyEmailOtp = verifyEmailOtp;
const resetPassword = (email, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = orm_config_1.default.getRepository(user_entity_1.User);
    const user = yield userRepository.findOne({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }
    user.password = hashedPassword;
    yield userRepository.save(user);
    return true;
});
exports.resetPassword = resetPassword;
const getById = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield orm_config_1.default
            .getRepository(user_entity_1.User)
            .findOne({ where: { id: params.id }, relations: ['role'] });
        return api_utility_1.default.sanitizeUser(data);
    }
    catch (e) {
        return null;
    }
});
const detail = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        where: Object.assign(Object.assign({}, where), { id: params.id }),
    };
    const user = yield orm_config_1.default.getRepository(user_entity_1.User).findOne(query);
    if (!user) {
        throw new string_error_1.StringError('User is not existed');
    }
    return api_utility_1.default.sanitizeUser(user);
});
const update = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const query = Object.assign(Object.assign({}, where), { id: params.id });
    const user = yield orm_config_1.default
        .getRepository(user_entity_1.User)
        .findOne({ where: { id: params.id } });
    if (!user) {
        throw new string_error_1.StringError('User is not existed');
    }
    return yield orm_config_1.default.getRepository(user_entity_1.User).update(query, {
        firstName: params.firstName,
        lastName: params.lastName,
        updatedAt: date_time_utility_1.default.getCurrentTimeStamp(),
    });
});
const list = (params) => __awaiter(void 0, void 0, void 0, function* () {
    let userRepo = orm_config_1.default
        .getRepository(user_entity_1.User)
        .createQueryBuilder('user');
    userRepo = userRepo.where('user.isDeleted = :isDeleted', {
        isDeleted: false,
    });
    if (params.keyword) {
        userRepo = userRepo.andWhere('(LOWER(user.firstName) LIKE LOWER(:keyword) OR LOWER(user.lastName) LIKE LOWER(:keyword))', { keyword: `%${params.keyword}%` });
    }
    // Pagination
    const paginationRepo = userRepo;
    const total = yield paginationRepo.getMany();
    const pagRes = api_utility_1.default.getPagination(total.length, params.limit, params.page);
    userRepo = userRepo
        .limit(params.limit)
        .offset(api_utility_1.default.getOffset(params.limit, params.page));
    const users = yield userRepo.getMany();
    const response = [];
    if (users && users.length) {
        for (const item of users) {
            response.push(api_utility_1.default.sanitizeUser(item));
        }
    }
    return { response, pagination: pagRes.pagination };
});
const remove = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const query = Object.assign(Object.assign({}, where), { id: params.id });
    const user = yield orm_config_1.default
        .getRepository(user_entity_1.User)
        .findOne({ where: { id: params.id } });
    if (!user) {
        throw new string_error_1.StringError('User is not existed');
    }
    return yield orm_config_1.default.getRepository(user_entity_1.User).update(query, {
        isDeleted: true,
        updatedAt: date_time_utility_1.default.getCurrentTimeStamp(),
    });
});
exports.default = {
    create,
    login,
    getById,
    detail,
    update,
    list,
    remove,
    sendEmailOtp: exports.sendEmailOtp,
    verifyEmailOtp: exports.verifyEmailOtp,
    resetPassword: exports.resetPassword,
};
