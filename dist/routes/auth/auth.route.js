"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../../controllers/user/user.controller"));
const dto_validator_middleware_1 = require("../../middlewares/dto-validator.middleware");
const user_dto_1 = require("../../services/dto/user/user.dto");
const auth_dto_1 = require("../../services/dto/auth/auth.dto");
const router = express_1.default.Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "StrongPassword123!"
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               address:
 *                 type: string
 *                 example: "123 Main St, Anytown, USA"
 *               gender:
 *                 type: string
 *                 enum: [Male, Female, Other]
 *                 example: "Male"
 *               role:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 email: "user@example.com"
 *                 firstName: "John"
 *                 lastName: "Doe"
 *                 phone: "+1234567890"
 *                 address: "123 Main St, Anytown, USA"
 *                 gender: "Male"
 *                 role: 1
 *       409:
 *         description: Error Response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Email already exists."
 */
router.post('/register', (0, dto_validator_middleware_1.validateDTO)(user_dto_1.RegisterUserDTO), user_controller_1.default.create);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login here
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "StrongPassword123!"
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 email: "user@example.com"
 *                 firstName: "John"
 *                 lastName: "Doe"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Invalid email or password"
 */
router.post('/login', (0, dto_validator_middleware_1.validateDTO)(auth_dto_1.loginDTO), user_controller_1.default.login);
/**
 * @swagger
 * /send-email-otp:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Send an OTP to the user's email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 message: "OTP sent successfully to your email"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Internal Server Error"
 */
router.post('/send-email-otp', (0, dto_validator_middleware_1.validateDTO)(auth_dto_1.sendEmailOtpDTO), user_controller_1.default.sendEmailOtp);
/**
 * @swagger
 * /verify-email-otp:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Verify the OTP sent to the user's email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               otp:
 *                 type: integer
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Verified successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 message: "OTP verified successfully"
 *       400:
 *         description: Invalid OTP or email
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Invalid OTP or email"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Internal Server Error"
 */
router.post('/verify-email-otp', (0, dto_validator_middleware_1.validateDTO)(auth_dto_1.verifyEmailOtpDTO), user_controller_1.default.verifyEmailOtp);
/**
 * @swagger
 * /change-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Change the user's password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: "NewStrongPassword123!"
 *               confirmNewPassword:
 *                 type: string
 *                 format: password
 *                 example: "NewStrongPassword123!"
 *     responses:
 *       200:
 *         description: Changed password successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 message: "Password reset successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Password does not match"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Invalid or expired token"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Internal Server Error"
 */
router.post('/change-password', (0, dto_validator_middleware_1.validateDTO)(auth_dto_1.resetPasswordDTO), user_controller_1.default.resetPassword);
/**
 * @swagger
 * /logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout the user
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Logged out successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 message: "Logged out"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Internal Server Error"
 */
router.post('/logout', user_controller_1.default.logout);
exports.default = router;
