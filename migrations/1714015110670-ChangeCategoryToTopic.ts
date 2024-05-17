import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeCategoryToTopic1714015110670 implements MigrationInterface {
    name = 'ChangeCategoryToTopic1714015110670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "category" TO "topic"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "topic" TO "category"`);
    }

}
