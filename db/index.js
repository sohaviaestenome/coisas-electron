const { Pool } = require('pg');
require('dotenv').config();

const {
  PGHOST,
  PGDATABASE,
  PGUSER,
  PGPASSWORD,
  ENDPOINT_ID,
  ELECTRON_ENV,
  DB_HOST,
  DB_USER,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT
} = process.env;

const isProduction = ELECTRON_ENV === 'production';

const connectionString = isProduction
  ? `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`
  : `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

const db = new Pool({
  connectionString: connectionString,
  ssl: isProduction
});

module.exports = { db };
