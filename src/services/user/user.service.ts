
// Entities
import { User } from '../../entities/user/user.entity';

// Utilities
import Encryption from '../../utilities/encryption.utility';
import ApiUtility from '../../utilities/api.utility';
import DateTimeUtility from '../../utilities/date-time.utility';

// Interfaces
import {
  ICreateUser,
  ILoginUser,
  IUpdateUser,
  IUserQueryParams,
} from '../../interfaces/user.interface';
import { IDeleteById, IDetailById } from '../../interfaces/common.interface';

// Errors
import { StringError } from '../../errors/string.error';
import { Role } from '../../entities/user/role.entity';
import dataSource from '../../configs/orm.config';

const where = { isDeleted: false };

const create = async (params: ICreateUser) => {
  const roleRepository = dataSource.getRepository(Role);
  const role = await roleRepository.findOne({where:{id:params.roleId}});

  if (!role) {
    throw new Error(`Role with ID ${params.roleId} not found`);
  }
  const item = new User();
  item.email = params.email;
  item.password = await Encryption.generateHash(params.password, 10);
  item.firstName = params.firstName;
  item.lastName = params.lastName;
  item.role = role;
  const userData = await dataSource.getRepository(User).save(item);
  return ApiUtility.sanitizeUser(userData);
};

const login = async (params: ILoginUser) => {
  const user = await dataSource.getRepository(User)
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

const getById = async (params: IDetailById) => {
  try {
    const data = await dataSource.getRepository(User).findOne({where:{id:params.id},relations:["role"]});
    return ApiUtility.sanitizeUser(data);
  } catch (e) {
    return null;
  }
};

const detail = async (params: IDetailById) => {
  const query = {
    where: { ...where, id: params.id },
  }

  const user = await dataSource.getRepository(User).findOne(query);
  if (!user) {
    throw new StringError('User is not existed');
  }

  return ApiUtility.sanitizeUser(user);
}

const update = async (params: IUpdateUser) => {
  const query = { ...where, id: params.id };

  const user = await dataSource.getRepository(User).findOne({where:{id:params.id}});
  if (!user) {
    throw new StringError('User is not existed');
  }

  return await dataSource.getRepository(User).update(query, {
    firstName: params.firstName,
    lastName: params.lastName,
    updatedAt: DateTimeUtility.getCurrentTimeStamp(),
  });
}

const list = async (params: IUserQueryParams) => {
  let userRepo = dataSource.getRepository(User).createQueryBuilder('user');
  userRepo = userRepo.where('user.isDeleted = :isDeleted', { isDeleted: false });

  if (params.keyword) {
    userRepo = userRepo.andWhere(
      '(LOWER(user.firstName) LIKE LOWER(:keyword) OR LOWER(user.lastName) LIKE LOWER(:keyword))',
      { keyword: `%${params.keyword}%` },
    );
  }

  // Pagination
  const paginationRepo = userRepo;
  const total = await paginationRepo.getMany();
  const pagRes = ApiUtility.getPagination(total.length, params.limit, params.page);

  userRepo = userRepo.limit(params.limit).offset(ApiUtility.getOffset(params.limit, params.page));
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

  const user = await dataSource.getRepository(User).findOne({where:{id:params.id}});
  if (!user) {
    throw new StringError('User is not existed');
  }

  return await dataSource.getRepository(User).update(query, {
    isDeleted: true,
    updatedAt: DateTimeUtility.getCurrentTimeStamp(),
  });
}

export default {
  create,
  login,
  getById,
  detail,
  update,
  list,
  remove,
}
