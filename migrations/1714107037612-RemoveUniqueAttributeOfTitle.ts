import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUniqueAttributeOfTitle1714107037612 implements MigrationInterface {
    name = 'RemoveUniqueAttributeOfTitle1714107037612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "UQ_3c28437db9b5137136e1f6d6096"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "UQ_3c28437db9b5137136e1f6d6096" UNIQUE ("title")`);
    }

}
