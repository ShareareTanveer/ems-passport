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
import dataSource from '../../configs/orm.config';


const create = async (params: ICreateRole): Promise<Role> => {
    const { name, permissions, users } = params;
    const roleRepository = dataSource.getRepository(Role);
    const permissionRepository = dataSource.getRepository(Permission);
    const userRepository = dataSource.getRepository(User);
  
    // Create a new role entity
    const role = new Role();
    role.name = name;

    if (permissions) {
      role.permissions = await Promise.all(permissions.map(async (permissionId) => {
        return await permissionRepository.findOneBy(permissionId);
      }));
    }
  
    if (users) {
      role.users = await Promise.all(users.map(async (userId) => {
        return await userRepository.findOneBy(userId);
      }));
    }
  
    return await roleRepository.save(role);
  };



const update = async (id: number,params: IUpdateRole): Promise<Role> => {
    const roleRepository = dataSource.getRepository(Role);
    const permissionRepository = dataSource.getRepository(Permission);
    const userRepository = dataSource.getRepository(User);

    
    console.log("params","params",params)
    
    const { name, permissions, users } = params;
    const role = await roleRepository.findOne({where:{id:id}});
    if (!role) {
        throw new Error('Role not found');
    }

    if (name) {
        role.name = name;
    }

    if (permissions) {
        role.permissions = await Promise.all(permissions.map(async (permissionId) => {
            return await permissionRepository.findOneBy(permissionId);
        }));
    }

    if (users) {
        role.users = await Promise.all(users.map(async (userId) => {
            return await userRepository.findOneBy(userId);
        }));
    }

    return await roleRepository.save(role);
};


const list = async () => {
    const roleRepository = dataSource.getRepository(Role);
    return await roleRepository.find({ relations: ['permissions', 'users'] });
    }
  
  
  export default {
    create,
    list,
    update,
  };
