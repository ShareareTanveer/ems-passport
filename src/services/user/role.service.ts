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
  
    const role = new Role();
    role.name = name;

    if (permissions) {
      const permissionEntities = await permissionRepository.findByIds(permissions);
      role.permissions = permissionEntities;
  }

  if (users) {
      const userEntities = await userRepository.findByIds(users);
      role.users = userEntities;
  }

  await roleRepository.save(role);
  
    return await roleRepository.save(role);
  };


  const update = async (id: number, params: IUpdateRole): Promise<Role> => {
    const roleRepository = dataSource.getRepository(Role);
    const permissionRepository = dataSource.getRepository(Permission);
    const userRepository = dataSource.getRepository(User);

    const { name, permissions, users } = params;
    const role = await roleRepository.findOne({ where: { id: id }, relations: ['permissions', 'users'] });
    if (!role) {
        throw new Error('Role not found');
    }

    if (name) {
        role.name = name;
    }

    if (permissions) {
        const permissionEntities = await permissionRepository.findByIds(permissions);
        role.permissions = permissionEntities;
    }
    console.log("users: " + users)
    if (users) {
        const userEntities = await userRepository.findByIds(users);
        console.log("userEntities",userEntities.length,userEntities)
        role.users = userEntities;
    }

    await roleRepository.save(role);

    return role;
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
