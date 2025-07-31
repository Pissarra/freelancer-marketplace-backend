import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedFreelancersAndSkills1753825554587
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          INSERT INTO skill (description) VALUES 
            ('JavaScript'), ('TypeScript'), ('Node.js'), ('NestJS'), ('React'),
            ('PostgreSQL'), ('GraphQL'), ('Docker'), ('AWS'), ('MongoDB');
        `);

    await queryRunner.query(`
        INSERT INTO permission (description) VALUES
                     ('read_specific_1'), ('read_specific_2');
    `);

    await queryRunner.query(`
      INSERT INTO freelancer (name, location, timezone, hourly_rate, rating, available) VALUES
      ('Alice Mendes', 'São Paulo', 'GMT-3', 80.0, 4.7, true),
      ('Bruno Costa', 'Rio de Janeiro', 'GMT-3', 70.0, 4.5, true),
      ('Clara Lima', 'Lisboa', 'GMT+1', 90.0, 4.9, true),
      ('Diego Rocha', 'Buenos Aires', 'GMT-3', 60.0, 4.3, false),
      ('Eduarda Silva', 'Porto Alegre', 'GMT-3', 75.0, 4.8, true),
      ('Fernando Torres', 'Madrid', 'GMT+2', 100.0, 5.0, true),
      ('Gabriela Freitas', 'Curitiba', 'GMT-3', 85.0, 4.6, true),
      ('Henrique Ramos', 'Belo Horizonte', 'GMT-3', 65.0, 4.4, false),
      ('Isabela Souza', 'Fortaleza', 'GMT-3', 70.0, 4.2, true),
      ('João Pedro', 'Recife', 'GMT-3', 90.0, 4.9, true);
    `);

    await queryRunner.query(`INSERT INTO auth_user (email, password) VALUES 
                                            ('admin@mail.test', '$2b$10$EvnwYkBqUNzEn3nQPar/Vu0kX.vo/cfNqN1HDU5bVPKgNKYdzyPky'), 
                                            ('user@mail.test', '$2b$10$Y8/gJT.YJxoVW3RR0u3FUuVZBeVMPSdCrXj6DMxAo4zfWF6Jn6UF2');
    `);

    await queryRunner.query(`
      INSERT INTO freelancer_skills_skill (freelancer_id, skill_id) VALUES
      (1, 1), (1, 2), (1, 3),
      (2, 2), (2, 4), (2, 6),
      (3, 1), (3, 4), (3, 5),
      (4, 3), (4, 7), (4, 9),
      (5, 2), (5, 6), (5, 10),
      (6, 4), (6, 5), (6, 6),
      (7, 1), (7, 5), (7, 8),
      (8, 3), (8, 9), (8, 10),
      (9, 2), (9, 3), (9, 7),
      (10, 1), (10, 2), (10, 4);
    `);

    await queryRunner.query(`
      INSERT INTO freelancer_permissions_permission (freelancer_id, permission_id) VALUES
      (1, 1),
      (2, 1), (2, 2),
      (3, 1), (3, 2),
      (4, 1),
      (5, 1),
      (6, 1),
      (7, 1),
      (8, 1), (8, 2),
      (9, 1),
      (10, 1), (10, 2);
    `);

    await queryRunner.query(`
      INSERT INTO user_permissions_permission (user_id, permission_id) VALUES
      (1, 1),
      (2, 1), (2, 2);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM user_permissions_permission`);
    await queryRunner.query(`DELETE FROM freelancer_permissions_permission`);
    await queryRunner.query(`DELETE FROM freelancer_skills_skill`);
    await queryRunner.query(`DELETE FROM user`);
    await queryRunner.query(`DELETE FROM freelancer`);
    await queryRunner.query(`DELETE FROM skill`);
    await queryRunner.query(`DELETE FROM permission`);
  }
}
