import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const timezone = process.env.TZ;
export const environment = process.env.NODE_ENV;