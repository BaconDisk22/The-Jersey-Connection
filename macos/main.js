const { app, BrowserWindow, shell, Menu } = require('electron');
const MAP_URL = 'https://meshmap.net/';
app.setName('The Jersey Connection');
function openWindow() {
  const win = new BrowserWindow({ width: 1320, height: 860, minWidth: 820, minHeight: 550, title: 'The Jersey Connection', backgroundColor: '#20252B', webPreferences: { nodeIntegration: false, contextIsolation: true, sandbox: true } });
  win.webContents.setWindowOpenHandler(({url}) => { if (url.startsWith('https://')) shell.openExternal(url); return {action:'deny'}; });
  win.webContents.on('will-navigate', (event, url) => { if (!url.startsWith('https://meshmap.net/')) { event.preventDefault(); if (url.startsWith('https://')) shell.openExternal(url); } });
  win.loadURL(MAP_URL);
  win.webContents.on('did-fail-load', (_e, code, description, url, isMainFrame) => { if (isMainFrame) win.loadURL('data:text/html,' + encodeURIComponent('<body style="background:#20252B;color:#FFCA28;font:20px sans-serif;padding:40px"><h1>🤌 Ayyy, the map is unavailable!</h1><p>Check your internet connection and try reopening The Jersey Connection.</p></body>')); });
  const menu = Menu.buildFromTemplate([{label:'The Jersey Connection',submenu:[{role:'about'},{role:'quit'}]},{label:'View',submenu:[{role:'reload'},{role:'togglefullscreen'},{role:'toggleDevTools'}]},{label:'Edit',submenu:[{role:'copy'},{role:'paste'},{role:'selectAll'}]}]);
  Menu.setApplicationMenu(menu);
}
app.whenReady().then(() => {openWindow();app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)openWindow()})});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit()});
