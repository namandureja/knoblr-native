const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev');

if (require('electron-squirrel-startup')) return app.quit();
// var server = require("./server/server");

// server.get('/quit', (req, res) => {
//   res.send('Hello quit');
//   app.quit();
// });

let win;
const createWindow = () => {
  win = new BrowserWindow({
    width: 210,
    height: 250,
    frame: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
  },
  })
  win.setAlwaysOnTop(true);
  win.setHasShadow(false);
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})



let deeplinkingUrl;

if (isDev && process.platform === 'win32') {
  // Set the path of electron.exe and your app.
  // These two additional parameters are only available on windows.
  // Setting this is required to get this working in dev mode.
  app.setAsDefaultProtocolClient('knoblr', process.execPath, [
    resolve(process.argv[1])
  ]);
} else {
  app.setAsDefaultProtocolClient('knoblr');
}

app.on('open-url', function (event, url) {
  event.preventDefault();
  deeplinkingUrl = url;
});

// Force single application instance
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
  return;
} else {
  app.on('second-instance', (e, argv) => {
    if (process.platform !== 'darwin') {
      // Find the arg that is our custom protocol url and store it
      deeplinkingUrl = argv.find((arg) => arg.startsWith('knoblr://'));
    }
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });
}

const { ipcMain } = require('electron')
ipcMain.on('close-me', (evt, arg) => {
  win.close();
})