import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define a type for your environment configuration
interface EnvConfig {
  NODE_ENV: string;
  PORT: number;
  JWT_SECRET: string;
  MONGO_URI: string;
}

// Fetch and cast environment variables to the correct types
export const config: EnvConfig = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '4000', 10),
  JWT_SECRET: process.env.JWT_SECRET || 'default-secret', // Use a fallback secret in dev mode
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/employee_management',
};
