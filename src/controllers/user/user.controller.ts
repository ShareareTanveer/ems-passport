import httpStatusCodes from 'http-status-codes';

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
import { changePasswordDTO, sendEmailOtpDTO, verifyEmailOtpDTO } from '../../services/dto/auth/auth.dto';

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

    const result = await userService.sendEmailOtp(params);

    if (result) {
      return ApiResponse.result(res, { message: 'OTP sent successfully to your email' }, httpStatusCodes.OK);
    }
  } catch (e) {
    console.error(e);
    return ApiResponse.error(res,500, e.message);
  }
};

export const verifyEmailOtp: IController = async (req, res) => {
  try {
    const params: verifyEmailOtpDTO = {
      email: req.body.email,
      otp: req.body.otp,
    };

    const result = await userService.verifyEmailOtp(params);

    if (result) {
      return ApiResponse.result(res, { message: 'OTP verified successfully' }, httpStatusCodes.OK);
    }
  } catch (e) {
    console.error(e);
    return ApiResponse.error(res,500, e.message);
  }
};

export const changePassword: IController = async (req, res) => {
  try {
    const params: changePasswordDTO = {
      email: req.body.email,
      otp: req.body.otp,
      newPassword: req.body.newPassword,
    };

    const result = await userService.changePassword(params);

    if (result) {
      return ApiResponse.result(res, { message: 'Password changed successfully' }, httpStatusCodes.OK);
    }
  } catch (e) {
    console.error(e);
    return ApiResponse.error(res, e.message);
  }
};

const logout: IController = async (req, res) => {
  try {
    res.clearCookie(constants.COOKIE.COOKIE_USER);
    return ApiResponse.result(res, {}, httpStatusCodes.OK, {
      key: constants.COOKIE.COOKIE_USER,
      value: '',
    });
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
  changePassword
};
