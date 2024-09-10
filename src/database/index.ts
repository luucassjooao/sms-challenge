import 'dotenv/config';
import { Client } from 'pg';

export const client = new Client({
  connectionString: process.env.URL_POSTGRES,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function query(query: string, values?: any) {
  const { rows } = await client.query(query, values);
  return rows;
}

export { query };

