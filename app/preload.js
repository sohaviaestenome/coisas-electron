//preload.js
const { contextBridge, ipcRenderer } = require('electron');
const coisasController = require('../db/coisas.controller');

contextBridge.exposeInMainWorld('electron', {
  getCoisas: coisasController.getCoisas,
  addCoisa: coisasController.addCoisa,
  updateCoisa: coisasController.updateCoisa,
  getCoisaById: coisasController.getCoisaById,
  deleteCoisa: coisasController.deleteCoisa,
  getCidades: coisasController.getCidades,
});
