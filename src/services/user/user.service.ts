// Entities
import { Role } from '../../entities/user/role.entity';
import { User } from '../../entities/user/user.entity';

// Utilities
import ApiUtility from '../../utilities/api.utility';
import DateTimeUtility from '../../utilities/date-time.utility';
import Encryption from '../../utilities/encryption.utility';

// Interfaces
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
import dataSource from '../../configs/orm.config';
import { StringError } from '../../errors/string.error';

import transporter from '../../configs/sendMail.config';
import { RegisterUserDTO } from '../dto/user/user.dto';
import { UserDetail } from '../../entities/user/userDetails.entity';
import { loginDTO } from '../dto/auth/auth.dto';
import { generateOTP } from '../../utilities/otp.utility';


const where = { isDeleted: false };

const create = async (params: RegisterUserDTO) => {
  const roleRepository = dataSource.getRepository(Role);
  const role = await roleRepository.findOne({
    where: { id: params.role },
  });

  if (!role) {
    throw new Error(`Role with ID ${params.role} not found`);
  }

  const userDetail = new UserDetail();
  userDetail.phone = params.phone;
  userDetail.address = params.address;
  userDetail.gender = params.gender;

  const user = new User();
  user.email = params.email;
  user.password = await Encryption.generateHash(params.password, 10);
  user.firstName = params.firstName;
  user.lastName = params.lastName;
  user.role = role;

  user.details = userDetail;

  const userData = await dataSource.getRepository(User).save(user);
  return ApiUtility.sanitizeUser(userData);
};


const login = async (params: loginDTO) => {
  const user = await dataSource
    .getRepository(User)
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
    throw new StringError('Your email has not been registered');
  }

  if (await Encryption.verifyHash(params.password, user.password)) {
    return ApiUtility.sanitizeUser(user);
  }

  throw new StringError('Your password is not correct');
};


export const sendEmailOtp = async (params: { email: string }) => {
  const userRepository = dataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { email: params.email } });

  if (!user) {
    throw new StringError('Your email has not been registered');
  }

  const otp = await generateOTP(params.email)
  console.log(otp)
  try {
    // await transporter.sendMail({
    //   from: process.env.DEFAULT_MAIL,
    //   to: [user.email],
    //   subject: 'OTP for Password Reset',
    //   text: `Your OTP for password reset: ${otp}`,
    // });
    return otp;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send OTP. Please try again later.');
  }
};

export const verifyEmailOtp = async (params: { email: string; otp: number }) => {
  return true;
};

export const resetPassword = async (email: string, hashedPassword: string ) => {
  const userRepository = dataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }
  user.password = hashedPassword;
  await userRepository.save(user);
  return true;
};

const getById = async (params: IDetailById) => {
  try {
    const data = await dataSource
      .getRepository(User)
      .findOne({ where: { id: params.id }, relations: ['role'] });
    return ApiUtility.sanitizeUser(data);
  } catch (e) {
    return null;
  }
};

const detail = async (params: IDetailById) => {
  const query = {
    where: { ...where, id: params.id },
  };

  const user = await dataSource.getRepository(User).findOne(query);
  if (!user) {
    throw new StringError('User is not existed');
  }

  return ApiUtility.sanitizeUser(user);
};

const update = async (params: IUpdateUser) => {
  const query = { ...where, id: params.id };

  const user = await dataSource
    .getRepository(User)
    .findOne({ where: { id: params.id } });
  if (!user) {
    throw new StringError('User is not existed');
  }

  return await dataSource.getRepository(User).update(query, {
    firstName: params.firstName,
    lastName: params.lastName,
    updatedAt: DateTimeUtility.getCurrentTimeStamp(),
  });
};

const list = async (params: IUserQueryParams) => {
  let userRepo = dataSource
    .getRepository(User)
    .createQueryBuilder('user');
  userRepo = userRepo.where('user.isDeleted = :isDeleted', {
    isDeleted: false,
  });

  if (params.keyword) {
    userRepo = userRepo.andWhere(
      '(LOWER(user.firstName) LIKE LOWER(:keyword) OR LOWER(user.lastName) LIKE LOWER(:keyword))',
      { keyword: `%${params.keyword}%` },
    );
  }

  // Pagination
  const paginationRepo = userRepo;
  const total = await paginationRepo.getMany();
  const pagRes = ApiUtility.getPagination(
    total.length,
    params.limit,
    params.page,
  );

  userRepo = userRepo
    .limit(params.limit)
    .offset(ApiUtility.getOffset(params.limit, params.page));
  const users = await userRepo.getMany();

  const response = [];
  if (users && users.length) {
    for (const item of users) {
      response.push(ApiUtility.sanitizeUser(item));
    }
  }
  return { response, pagination: pagRes.pagination };
};

const remove = async (params: IDeleteById) => {
  const query = { ...where, id: params.id };

  const user = await dataSource
    .getRepository(User)
    .findOne({ where: { id: params.id } });
  if (!user) {
    throw new StringError('User is not existed');
  }

  return await dataSource.getRepository(User).update(query, {
    isDeleted: true,
    updatedAt: DateTimeUtility.getCurrentTimeStamp(),
  });
};

export default {
  create,
  login,
  getById,
  detail,
  update,
  list,
  remove,
  sendEmailOtp,
  verifyEmailOtp,
  resetPassword,
};
