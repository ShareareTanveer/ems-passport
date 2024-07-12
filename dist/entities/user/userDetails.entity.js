"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDetail = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const user_enum_1 = require("../enum/user.enum");
let UserDetail = class UserDetail {
};
exports.UserDetail = UserDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], UserDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 15, nullable: true }),
    (0, class_validator_1.IsPhoneNumber)(null, { message: 'Invalid phone number' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserDetail.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserDetail.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserDetail.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserDetail.prototype, "nationality", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: user_enum_1.EGender, nullable: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(user_enum_1.EGender, { message: 'Gender must be Male, Female, or Other' }),
    __metadata("design:type", String)
], UserDetail.prototype, "gender", void 0);
exports.UserDetail = UserDetail = __decorate([
    (0, typeorm_1.Entity)('user_details', { orderBy: { id: 'DESC' } })
], UserDetail);
