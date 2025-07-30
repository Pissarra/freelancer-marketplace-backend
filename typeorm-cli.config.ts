import { DataSource } from 'typeorm';
import { SeedFreelancersAndSkills1753825554587 } from './src/database/migrations/1753825554587-SeedFreelancersAndSkills';
import { CreateFreelancerSchema1753825554586 } from './src/database/migrations/1753825554586-CreateFreelancerSchema';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'postgres',
  logging: ['query'],
  entities: [], // Adjust as needed
  migrations: [
    CreateFreelancerSchema1753825554586,
    SeedFreelancersAndSkills1753825554587,
  ],
});
