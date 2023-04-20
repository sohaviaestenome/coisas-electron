const { db } = require('../../db/index');
const coisasController = require('../../db/coisas.controller');

beforeAll(async () => {
  // Create the enum type and a test table with test data if they don't already exist
  await db.query(`
  DO $$
  BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'cidade') THEN
          CREATE TYPE Cidade AS ENUM ('Lisboa', 'Porto', 'Braga', 'Aveiro', 'Coimbra', 'Faro', 'Leiria', 'Viseu', 'Vila_Real', 'Guarda');
      END IF;
  END$$;
  
  DO $$
  BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'items') THEN
          CREATE TABLE items (
              id SERIAL PRIMARY KEY,
              nome VARCHAR(255) NOT NULL,
              origem Cidade NOT NULL,
              quantidade INTEGER NOT NULL,
              destino Cidade NOT NULL
          );
          ALTER TABLE items ADD CONSTRAINT unique_item UNIQUE (nome);
      END IF;
  END$$;
  `);
});

beforeEach(async () => {
  // Insert test data before each test
  await db.query(`
    INSERT INTO items (nome, origem, quantidade, destino)
    VALUES ('Test Item', 'Lisboa'::Cidade, 5, 'Porto'::Cidade)
    ON CONFLICT (nome) DO NOTHING;
  `);
});

afterEach(async () => {
  // Delete test data after each test
  await db.query("DELETE FROM items WHERE nome = 'Test Item';");
});

describe('coisas.controller', () => {
  test('get all coisas', async () => {
    const response = await coisasController.getCoisas();
    expect(response.status).toBe('Success');
    expect(response.data.length).toBeGreaterThan(0);
  });

  //test getCidades
  test('get cidades', async () => {
    const response = await coisasController.getCidades();
    console.log(response.data.length, 'response cidades')
    expect(response.status).toBe('Success');
    expect(response.data.length).toBeGreaterThan(0);
  });
  
  test('delete a coisa', async () => {
    // Get the ID of the test item
    const itemIdResult = await db.query("SELECT id FROM items WHERE nome = 'Test Item';");
    const itemId = itemIdResult.rows[0].id;

    // Test deleteCoisa function
    const response = await coisasController.deleteCoisa(itemId);
    expect(response.status).toBe('Success');

    // Verify that the record was deleted
    const verifyResult = await db.query("SELECT * FROM items WHERE id=$1", [itemId]);
    expect(verifyResult.rowCount).toBe(0);
  });
});
