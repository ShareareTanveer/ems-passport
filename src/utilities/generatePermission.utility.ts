import { Permission } from '../entities/user/permission.entity';
import dataSource from '../configs/orm.config';

const actions = ['create', 'read', 'update', 'delete'];

export const generatePermissions = async (): Promise<Permission[]> => {
 try {
   const permissionRepository = dataSource.getRepository(Permission);
   const entities = dataSource.entityMetadatas;
   const permissionSeed: Permission[] = [];
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
         } as Permission;
         permissionSeed.push(permission);
       }
     }
   }
   return permissionSeed;
 } catch (error) {
  console.log("No permissions to create")
 }
};
