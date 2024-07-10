import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class createRoleTable1720616336753 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'role',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isUnique: true,
                },
            ],
        }), true);

        // Seed the Role table with initial roles
        await queryRunner.query(`
            INSERT INTO role (name) VALUES ('admin'), ('user'), ('employee');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('role');
    }

}
