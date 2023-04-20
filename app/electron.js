//main.js
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

console.log('Preload path:', path.join(__dirname, 'preload.js'));

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  const url =
    process.env.ELECTRON_ENV === "development"
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`;

  win.loadURL(url);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


ipcMain.handle('getCoisas', async () => {
  return await coisasController.getCoisas();
});

ipcMain.handle('addCoisa', async (_, coisa) => {
  return await coisasController.addCoisa(coisa);
});

ipcMain.handle('updateCoisa', async (_, id, updatedCoisa) => {
  return await coisasController.updateCoisa(id, updatedCoisa);
});

ipcMain.handle('getCoisaById', async (_, id) => {
  return await coisasController.getCoisaById(id);
});

ipcMain.handle('deleteCoisa', async (_, id) => {
  return await coisasController.deleteCoisa(id);
});

ipcMain.handle('getCidades', async () => {
  return await coisasController.getCidades();
});