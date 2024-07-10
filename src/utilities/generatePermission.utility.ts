// src/utils/generatePermissions.ts
import { getConnection, getRepository, Connection } from 'typeorm';
import { Permission } from '../entities/user/permission.entity';

const actions = ['create', 'read', 'update', 'delete'];

export const generatePermissions = async () => {
    const connection = getConnection();
    const permissionRepository = getRepository(Permission);

    // Check if Permission table exists
    const schemaBuilder = connection.options.type === "mysql" ? (connection.driver as any).database : connection.name;
    const doesTableExist = await connection.query(`
        SELECT *
        FROM information_schema.tables
        WHERE table_schema = '${schemaBuilder}'
        AND table_name = 'permission'
    `);

    // Create Permission table if it doesn't exist
    if (!doesTableExist.length) {
        await connection.query(`
            CREATE TABLE permission (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                codename VARCHAR(255) NOT NULL,
                entity_name VARCHAR(255) NOT NULL
            )
        `);
    }

    // Generate permissions for each entity
    const entities = connection.entityMetadatas;
    for (const entity of entities) {
        const modelName = entity.name.toLowerCase();

        for (const action of actions) {
            const codename = `${action}_${modelName}`;
            const permissionExists = await permissionRepository.findOne({ where: { codename } });

            if (!permissionExists) {
                const permission = permissionRepository.create({
                    name: `${action} ${modelName}`,
                    codename,
                    entity_name: modelName,
                });
                await permissionRepository.save(permission);
            }
        }
    }
};
