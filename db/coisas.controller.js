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


  

  