const { db } = require('../db/index');
const coisasController = require('../controllers/coisas.controller');

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
          INSERT INTO items (nome, origem, quantidade, destino)
          VALUES ('Test Item', 'Lisboa'::Cidade, 5, 'Porto'::Cidade)
          ON CONFLICT (nome) DO NOTHING;
      END IF;
  END$$;
  `);
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
  
});
