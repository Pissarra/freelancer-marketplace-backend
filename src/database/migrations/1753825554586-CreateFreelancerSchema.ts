import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFreelancerSchema1753825554586 implements MigrationInterface {
  name = 'CreateFreelancerSchema1753825554586';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "skill" (
        "id" SERIAL PRIMARY KEY,
        "description" VARCHAR NOT NULL
      );
    `);

    await queryRunner.query(`
        CREATE TABLE "permission" (
         "id" SERIAL PRIMARY KEY,
         "description" VARCHAR NOT NULL
        );
    `);

    await queryRunner.query(`
      CREATE TABLE "freelancer" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR NOT NULL,
        "location" VARCHAR NOT NULL,
        "timezone" VARCHAR NOT NULL,
        "hourly_rate" FLOAT NOT NULL,
        "rating" FLOAT NOT NULL,
        "available" BOOLEAN NOT NULL
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "freelancer_skills_skill" (
        "freelancer_id" INTEGER NOT NULL,
        "skill_id" INTEGER NOT NULL,
        PRIMARY KEY ("freelancer_id", "skill_id"),
        CONSTRAINT "FK_freelancer" FOREIGN KEY ("freelancer_id") REFERENCES "freelancer"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_skill" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE CASCADE
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "freelancer_permissions_permission" (
        "freelancer_id" INTEGER NOT NULL,
        "permission_id" INTEGER NOT NULL,
        PRIMARY KEY ("freelancer_id", "permission_id"),
        CONSTRAINT "FK_freelancer" FOREIGN KEY ("freelancer_id") REFERENCES "freelancer"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_permission" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "freelancer_permissions_permission"`);
    await queryRunner.query(`DROP TABLE "freelancer_skills_skill"`);
    await queryRunner.query(`DROP TABLE "freelancer"`);
    await queryRunner.query(`DROP TABLE "skill"`);
    await queryRunner.query(`DROP TABLE "permission"`);
  }
}
