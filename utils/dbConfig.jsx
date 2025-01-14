// dbConfig.js
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon('postgresql://expense-tracker_owner:fLOKqgC6Pm5l@ep-soft-queen-a5z5k45z.us-east-2.aws.neon.tech/expense-tracker?sslmode=require');
export const db = drizzle({ client: sql }, { schema });
