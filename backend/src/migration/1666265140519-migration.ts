import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1666265140519 implements MigrationInterface {
    name = 'migration1666265140519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`data\` CHANGE \`name\` \`record_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE TABLE \`record\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`data\` DROP COLUMN \`record_id\``);
        await queryRunner.query(`ALTER TABLE \`data\` ADD \`record_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`data\` CHANGE \`time\` \`time\` timestamp NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`data\` CHANGE \`time\` \`time\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`data\` DROP COLUMN \`record_id\``);
        await queryRunner.query(`ALTER TABLE \`data\` ADD \`record_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`record\``);
        await queryRunner.query(`ALTER TABLE \`data\` CHANGE \`record_id\` \`name\` varchar(255) NOT NULL`);
    }

}
