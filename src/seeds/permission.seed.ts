import { DataSource } from 'typeorm';
import { Permission } from '../entities/user/permission.entity';
import dataSource from '../configs/orm.config';

const actions = ['create', 'read', 'update', 'delete'];

export const generatePermissions = async () => {
  await dataSource.initialize();
  const permissionRepository = dataSource.getRepository(Permission);

  // Generate permissions for each entity
  const entities = dataSource.entityMetadatas;
  const permissionSeed = [];

  for (const entity of entities) {
    const modelName = entity.name.toLowerCase();

    for (const action of actions) {
      const codename = `${action}_${modelName}`;
      const permissionExists = await permissionRepository.findOne({ where: { codename } });

      if (!permissionExists) {
        const permission = {
          name: `${action} ${modelName}`,
          codename,
          entity_name: modelName,
        };
        permissionSeed.push(permission);
      }
    }
  }

  await dataSource.destroy();
  return permissionSeed;
};

