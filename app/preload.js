//preload.js
const { contextBridge, ipcRenderer } = require('electron');

console.log('Preload script loaded');

contextBridge.exposeInMainWorld('electron', {
  getCoisas: () => ipcRenderer.invoke('getCoisas'),
  addCoisa: (coisa) => ipcRenderer.invoke('addCoisa', coisa),
  updateCoisa: (id, updatedCoisa) => ipcRenderer.invoke('updateCoisa', id, updatedCoisa),
  getCoisaById: (id) => ipcRenderer.invoke('getCoisaById', id),
  deleteCoisa: (id) => ipcRenderer.invoke('deleteCoisa', id),
  getCidades: () => ipcRenderer.invoke('getCidades'),
});