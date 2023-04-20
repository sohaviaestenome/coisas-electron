//preload.js
const { contextBridge } = require('electron');
const coisasController = require('./path/to/coisas.controller');


contextBridge.exposeInMainWorld('electron', {
  getCoisas: coisasController.getCoisas,
  addCoisa: coisasController.addCoisa,
  updateCoisa: coisasController.updateCoisa,
  getCoisaById: coisasController.getCoisaById,
  deleteCoisa: coisasController.deleteCoisa,
  getCidades: coisasController.getCidades,
});
