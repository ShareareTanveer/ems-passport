import { getRepository } from 'typeorm';

// Entities
import { User } from '../../entities/user/user.entity';
import { Permission } from '../../entities/user/permission.entity';

// Interfaces
import {
  ICreateRole,
  IUpdateRole
} from '../../interfaces/role.interface';

// Errors
import { Role } from '../../entities/user/role.entity';
import { StringError } from '../../errors/string.error';

const where = { isDeleted: false };

const create = async (params: ICreateRole): Promise<Role> => {
    const { name, permissions, users } = params;
    const roleRepository = getRepository(Role);
    const permissionRepository = getRepository(Permission);
    const userRepository = getRepository(User);
  
    // Create a new role entity
    const role = new Role();
    role.name = name;
  
    // Fetch permissions based on provided ids
    if (permissions) {
      role.permissions = await Promise.all(permissions.map(async (permissionId) => {
        return await permissionRepository.findOne(permissionId);
      }));
    }
  
    if (users) {
      role.users = await Promise.all(users.map(async (userId) => {
        return await userRepository.findOne(userId);
      }));
    }
  
    return await roleRepository.save(role);
  };



const update = async (id: number,params: IUpdateRole): Promise<Role> => {
    const roleRepository = getRepository(Role);
    const permissionRepository = getRepository(Permission);
    const userRepository = getRepository(User);

    const { name, permissions, users } = params;

    const role = await roleRepository.findOne(id);
    if (!role) {
        throw new Error('Role not found');
    }

    if (name) {
        role.name = name;
    }

    if (permissions) {
        role.permissions = await Promise.all(permissions.map(async (permissionId) => {
            return await permissionRepository.findOne(permissionId);
        }));
    }

    if (users) {
        role.users = await Promise.all(users.map(async (userId) => {
            return await userRepository.findOne(userId);
        }));
    }

    return await roleRepository.save(role);
};


const list = async () => {
    const roleRepository = getRepository(Role);
    return await roleRepository.find({ relations: ['permissions', 'users'] });
    }
  
  
  export default {
    create,
    list,
    update,
  };
