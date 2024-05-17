import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveTagsColumn1714730169975 implements MigrationInterface {
    name = 'RemoveTagsColumn1714730169975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "tags"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ADD "tags" text array NOT NULL`);
    }

}
