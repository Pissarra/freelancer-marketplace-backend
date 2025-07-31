import { DataSource } from 'typeorm';
import {configDotenv} from 'dotenv'
import { SeedFreelancersAndSkills1753825554587 } from './src/database/migrations/1753825554587-SeedFreelancersAndSkills';
import { CreateFreelancerSchema1753825554586 } from './src/database/migrations/1753825554586-CreateFreelancerSchema';

configDotenv({ path: '.env' });

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number.parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: ['query'],
  entities: [], // Adjust as needed
  migrations: [
    CreateFreelancerSchema1753825554586,
    SeedFreelancersAndSkills1753825554587,
  ],
});
