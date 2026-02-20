import { config } from 'dotenv';

config();

const datasources = {
  db: {
    url: process.env.DATABASE_URL,
  },
};

export { datasources };
