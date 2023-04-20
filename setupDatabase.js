const { Client } = require('pg');
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

const connectionString = isProduction ? `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}` : `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

(async () => {
  const cidadeEnumStmt = `
    DO $$ BEGIN
      CREATE TYPE Cidade AS ENUM ('Cidade1', 'Cidade2', 'Cidade3', 'Cidade4', 'Cidade5');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `;

  const itemsTableStmt = `
    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      nome TEXT NOT NULL,
      origem Cidade NOT NULL,
      destino Cidade NOT NULL,
      quantidade INTEGER DEFAULT 1 
    );
  `;

  try {
    await client.connect();

    // Create Cidade enum type
    await client.query(cidadeEnumStmt);

    // Create tables on database
    await client.query(itemsTableStmt);

    console.log("Tables created successfully!");

  } catch (err) {
    console.error("ERROR CREATING ONE OR MORE TABLES: ", err);
  } finally {
    await client.end(); // Close the database connection
  }
})();
