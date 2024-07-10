// src/utils/generatePermissions.ts
import { getConnection, getRepository, Connection } from 'typeorm';
import { Role } from '../entities/user/role.entity';

const roles = ['admin', 'user', 'employees'];

export const generateRoles = async () => {
    const connection = getConnection();
    const permissionRepository = getRepository(Role);

    const schemaBuilder = connection.options.type === "mysql" ? (connection.driver as any).database : connection.name;
    const doesTableExist = await connection.query(`
        SELECT *
        FROM information_schema.tables
        WHERE table_schema = '${schemaBuilder}'
        AND table_name = 'role'
    `);

    if (!doesTableExist.length) {
        await connection.query(`
            CREATE TABLE role (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
            )
        `);
    }
        for (const role of roles) {
            const roleExists = await permissionRepository.findOne({ where: { role } });
            if (!roleExists) {
                const roleCreate = permissionRepository.create({
                    name: `role`
                });
                await permissionRepository.save(roleCreate);
            }
        }
    
};