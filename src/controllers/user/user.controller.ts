import httpStatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Interfaces
import IController from '../../interfaces/IController';
import {
  IDeleteById,
  IDetailById,
} from '../../interfaces/common.interface';
import {
  ICreateUser,
  ILoginUser,
  IUpdateUser,
  IUserQueryParams,
} from '../../interfaces/user.interface';

// Errors
import { StringError } from '../../errors/string.error';

// Services
import userService from '../../services/user/user.service';

// Utilities
import ApiResponse from '../../utilities/api-response.utility';
import ApiUtility from '../../utilities/api.utility';
import Encryption from '../../utilities/encryption.utility';

// Constants
import constants from '../../constants';

// DTO
import {
  resetPasswordDTO,
  sendEmailOtpDTO,
  verifyEmailOtpDTO,
} from '../../services/dto/auth/auth.dto';

const create: IController = async (req, res) => {
  try {
    const params: ICreateUser = {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      roleId: req.body.role,
    };
    const user = await userService.create(params);
    return ApiResponse.result(res, user, httpStatusCodes.CREATED);
  } catch (e) {
    if (e.code === constants.ERROR_CODE.DUPLICATED) {
      return ApiResponse.error(
        res,
        httpStatusCodes.CONFLICT,
        'Email already exists.',
      );
    }
    return ApiResponse.error(
      res,
      httpStatusCodes.BAD_REQUEST,
      e?.message,
    );
  }
};

const login: IController = async (req, res) => {
  try {
    const params: ILoginUser = {
      email: req.body.email,
      password: req.body.password,
    };
    const user = await userService.login(params);
    const cookie = await generateUserCookie(user.id);
    return ApiResponse.result(res, user, httpStatusCodes.OK, cookie);
  } catch (e) {
    if (e instanceof StringError) {
      return ApiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        e?.message,
      );
    }
    return ApiResponse.error(
      res,
      httpStatusCodes.BAD_REQUEST,
      'Something went wrong',
      e?.message,
    );
  }
};
export const sendEmailOtp: IController = async (req, res) => {
  try {
    const params: sendEmailOtpDTO = {
      email: req.body.email,
    };

    const otp = await userService.sendEmailOtp(params);

    if (otp) {
      const expiryDate = new Date(Date.now() + 2 * 60 * 1000);
      res.cookie('otpEmail', params.email, {
        expires: expiryDate,
        httpOnly: true,
      });
      res.cookie('otp', otp, { expires: expiryDate, httpOnly: true });
      return ApiResponse.result(
        res,
        { message: 'OTP sent successfully to your email' },
        httpStatusCodes.OK,
      );
    }
  } catch (e) {
    console.error(e);
    return ApiResponse.error(res, 500, e.message);
  }
};

export const verifyEmailOtp: IController = async (req, res) => {
  try {
    const otpEmail = req.cookies.otpEmail;
    const otp = parseInt(req.cookies.otp);

    const params: verifyEmailOtpDTO = {
      email: req.body.email,
      otp: req.body.otp,
    };
    if (params.email !== otpEmail || params.otp !== otp) {
      return ApiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        'Invalid OTP or email',
      );
    }
    const cookie = await generateResetPasswordCookie(params.email)
    ApiResponse.deleteCookie(res, constants.COOKIE.COOKIE_OTP);
    ApiResponse.deleteCookie(res, constants.COOKIE.COOKIE_OTP_EMAIL);
    return ApiResponse.result(res , { message: 'OTP verified successfully'}, httpStatusCodes.OK, cookie);

  } catch (e) {
    console.error(e);
    return ApiResponse.error(res, 500, e.message);
  }
};

export const resetPassword: IController = async (req, res) => {
  try {
    const { confirmNewPassword, newPassword }: resetPasswordDTO = req.body;
    if (confirmNewPassword !== newPassword) {
      return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, 'Password does not match');
    }
    const token = req.cookies.pending_user;
    
    if (!token) {
      return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED, 'Invalid or expired token');
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.data.pending_user) {
      return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED, 'Invalid or expired token');
    }
    const email = decoded.pending_user;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const result = await userService.resetPassword(email, hashedPassword);

    if (result) {
      ApiResponse.deleteCookie(res, constants.COOKIE.COOKIE_RESET_PASSWORD);
      return ApiResponse.result(
        res,
        { message: 'Password reset successfully' },
        httpStatusCodes.OK,
      );
    } else {
      return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, 'Failed to reset password');
    }
  } catch (e) {
    console.error(e);
    return ApiResponse.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR, e.message);
  }
};

const logout: IController = async (req, res) => {
  try {
    ApiResponse.deleteCookie(res,constants.COOKIE.COOKIE_USER);
    return ApiResponse.result(res, { message: 'Logged out' }, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const me: IController = async (req, res) => {
  const cookie = await generateUserCookie(req.user.id);
  return ApiResponse.result(res, req.user, httpStatusCodes.OK, cookie);
};

const detail: IController = async (req, res) => {
  try {
    const params: IDetailById = {
      id: parseInt(req.params.id, 10),
    };
    const data = await userService.detail(params);
    return ApiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const update: IController = async (req, res) => {
  try {
    const params: IUpdateUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      id: parseInt(req.params.id, 10),
    };
    await userService.update(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const updateMe: IController = async (req, res) => {
  try {
    const params: IUpdateUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      id: req.user.id,
    };
    await userService.update(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const list: IController = async (req, res) => {
  try {
    const limit = ApiUtility.getQueryParam(req, 'limit');
    const page = ApiUtility.getQueryParam(req, 'page');
    const keyword = ApiUtility.getQueryParam(req, 'keyword');
    const params: IUserQueryParams = { limit, page, keyword };
    const data = await userService.list(params);
    return ApiResponse.result(
      res,
      data.response,
      httpStatusCodes.OK,
      null,
      data.pagination,
    );
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const remove: IController = async (req, res) => {
  try {
    const params: IDeleteById = {
      id: parseInt(req.params.id, 10),
    };
    await userService.remove(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const generateUserCookie = async (userId: number) => {
  return {
    key: constants.COOKIE.COOKIE_USER,
    value: await Encryption.generateCookie(
      constants.COOKIE.KEY_USER_ID,
      userId.toString(),
    ),
  };
};
const generateResetPasswordCookie = async (email: string) => {
  return {
    key: constants.COOKIE.COOKIE_RESET_PASSWORD,
    value: await Encryption.generateResetPasswordCookie(
      constants.COOKIE.COOKIE_RESET_PASSWORD,
      email,
    ),
  };
};


export default {
  create,
  login,
  me,
  detail,
  update,
  updateMe,
  list,
  remove,
  logout,
  sendEmailOtp,
  verifyEmailOtp,
  resetPassword,
  generateResetPasswordCookie,
};
