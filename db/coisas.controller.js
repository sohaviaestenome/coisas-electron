// coisas.controller.js
const { db } = require('../db/index');

exports.getCoisas = async () => {
  const query = "SELECT * FROM items";

  try {
    const coisas = await db.query(query);
    if (coisas.rowCount < 1) {
      return {
        status: 'Success',
        message: 'No records found.',
        data: [],
      };
    }
    return {
      status: 'Success',
      message: 'Todas as coisas a enviar',
      data: coisas.rows,
    };

  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.addCoisa = async (data) => {
  
  const { nome, origem, quantidade, destino } = data;

  const query = "INSERT INTO items(nome, origem, quantidade, destino) VALUES($1, $2, $3, $4) RETURNING *";

  try {
    const newCoisa = await db.query(query, [nome, origem, quantidade, destino]);
    return {
      status: 'Success',
      message: 'New envelope created',
      data: newCoisa.rows[0],
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.updateCoisa = async (id, data) => {
  const { nome, origem, quantidade, destino } = data;
  const query =
    "UPDATE items SET nome = $1, origem = $2, quantidade = $3, destino = $4 WHERE id = $5 RETURNING *";

  try {
    const updatedCoisa = await db.query(query, [nome, origem, quantidade, destino, id]);
    return updatedCoisa.rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getCoisaById = async (id) => {
  const query = "SELECT * FROM items WHERE id = $1";

  try {
    const coisa = await db.query(query, [id]);
    if (coisa.rowCount < 1) {
      return {
        status: 'Error',
        message: 'No coisa information found',
      };
    }
    return {
      status: 'Success',
      message: 'Coisa Information retrieved',
      data: coisa.rows[0],
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.deleteCoisa = async (coisaId) => {
  const coisasQuery = "SELECT * FROM items WHERE id=$1";
  const deleteCoisaQuery = "DELETE FROM items WHERE id=$1";

  try {
    const record = await db.query(coisasQuery, [coisaId]);

    if (record.rowCount < 1) {
      return {
        status: 'Error',
        message: 'Record not found',
      };
    }
    await db.query(deleteCoisaQuery, [coisaId]);
    return {
      status: 'Success',
      message: 'Coisa deleted',
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getCidades = async () => {
  const query = `SELECT unnest(enum_range(NULL::Cidade)) AS nome`;

  try {
    const { rows } = await db.query(query);
    return {
      status: 'Success',
      message: 'Cidades retrieved',
      data: rows,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
