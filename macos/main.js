const {app, BrowserWindow, shell, Menu, nativeTheme, Notification, dialog} = require('electron');
const fs = require('node:fs');
const path = require('node:path');
const MAP_URL = 'https://meshmap.net/';
const APP = 'The Jersey Connection';
let windows = new Set();
let prefs = {favorites:[], places:[], notifications:false, launchAtLogin:false, theme:'system', restoreSession:true, lastUrl:MAP_URL};
const isMapUrl = url => { try {const u=new URL(url);return u.protocol==='https:' && u.hostname==='meshmap.net';}catch{return false;} };
const prefsPath = () => path.join(app.getPath('userData'),'jersey-preferences.json');
function loadPrefs(){try{const p=JSON.parse(fs.readFileSync(prefsPath(),'utf8'));prefs={...prefs,...p};}catch{}}
function savePrefs(){try{fs.mkdirSync(app.getPath('userData'),{recursive:true});fs.writeFileSync(prefsPath(),JSON.stringify(prefs,null,2));}catch(e){console.error('Could not save settings',e);}}
function safeName(s){return String(s).trim().slice(0,80);}
function notify(title,body){if(prefs.notifications&&Notification.isSupported())new Notification({title,body}).show();}
function currentUrl(){const w=BrowserWindow.getFocusedWindow();return w && isMapUrl(w.webContents.getURL())?w.webContents.getURL():MAP_URL;}
function promptName(win, label, callback){
  const options=['Save','Cancel'];dialog.showMessageBox(win,{type:'question',title:label,message:'Save this map view?',detail:'The current map URL will be saved with an automatic label.',buttons:options,defaultId:0,cancelId:1}).then(({response})=>{if(response===0)callback();});
}
function addPlace(){const win=BrowserWindow.getFocusedWindow();if(!win)return;promptName(win,'The Neighborhood',()=>{const url=currentUrl();if(!prefs.places.some(p=>p.url===url)){prefs.places.push({name:'Map view '+(prefs.places.length+1),url});savePrefs();notify('The Neighborhood','Map view saved.');rebuildMenu();}});}
function addFavorite(){const url=currentUrl();if(!url.includes('#')){dialog.showMessageBox({message:'Open a node on the map first, paisan!',type:'info'});return;}if(!prefs.favorites.some(p=>p.url===url)){prefs.favorites.push({name:'Crew member '+(prefs.favorites.length+1),url});savePrefs();notify('The Family','Node bookmarked.');rebuildMenu();}}
function go(url){const w=BrowserWindow.getFocusedWindow()||[...windows][0];if(w && isMapUrl(url))w.loadURL(url);}
function openWindow(url=MAP_URL){
 const win=new BrowserWindow({width:1320,height:860,minWidth:820,minHeight:550,title:APP,backgroundColor:'#20252B',webPreferences:{nodeIntegration:false,contextIsolation:true,sandbox:true}});
 windows.add(win);
 win.on('closed',()=>windows.delete(win));
 win.webContents.setWindowOpenHandler(({url})=>{if(url.startsWith('https://'))shell.openExternal(url);return {action:'deny'};});
 win.webContents.on('will-navigate',(event,url)=>{if(!isMapUrl(url)){event.preventDefault();if(url.startsWith('https://'))shell.openExternal(url);}});
 win.webContents.on('did-navigate',(_e,url)=>{if(isMapUrl(url)){prefs.lastUrl=url;savePrefs();}});
 win.webContents.on('did-finish-load',()=>win.setTitle(APP+' — Connected'));
 win.webContents.on('did-fail-load',(_e,code,description,url,isMainFrame)=>{if(isMainFrame){win.setTitle(APP+' — Offline');notify('Fuggedaboutit Alerts','The map service is unavailable.');}});
 win.webContents.on('render-process-gone',()=>{win.setTitle(APP+' — Recovering');setTimeout(()=>{if(!win.isDestroyed())win.loadURL(MAP_URL);},1200);});
 win.loadURL(isMapUrl(url)?url:MAP_URL);
 return win;
}
function rebuildMenu(){
 const menu=Menu.buildFromTemplate([
 {label:APP,submenu:[{role:'about'},{type:'separator'},{label:"Tony's Office: Preferences",click:()=>dialog.showMessageBox({title:"Tony's Office",message:'Preferences are stored locally on this Mac.',detail:'Favorites: '+prefs.favorites.length+' | Saved map views: '+prefs.places.length})},{label:'Launch at Login',type:'checkbox',checked:prefs.launchAtLogin,click:item=>{prefs.launchAtLogin=item.checked;app.setLoginItemSettings({openAtLogin:item.checked});savePrefs();}},{label:'Fuggedaboutit Alerts',type:'checkbox',checked:prefs.notifications,click:item=>{prefs.notifications=item.checked;savePrefs();}},{role:'quit'}]},
 {label:'The Family',submenu:[{label:'Add Current Node to The Family',accelerator:'CmdOrCtrl+D',click:addFavorite},{type:'separator'},...prefs.favorites.map(p=>({label:safeName(p.name),click:()=>go(p.url)})),{type:'separator'},{label:'Clear Favorites',click:()=>{prefs.favorites=[];savePrefs();rebuildMenu();}}]},
 {label:'The Neighborhood',submenu:[{label:'Save Current Map View',accelerator:'CmdOrCtrl+Shift+S',click:addPlace},{type:'separator'},...prefs.places.map(p=>({label:safeName(p.name),click:()=>go(p.url)})),{type:'separator'},{label:'Clear Saved Views',click:()=>{prefs.places=[];savePrefs();rebuildMenu();}}]},
 {label:'The Parkway',submenu:[{label:'New Map Window',accelerator:'CmdOrCtrl+N',click:()=>openWindow()},{label:'Refresh — Gimme a Sec',accelerator:'CmdOrCtrl+R',click:()=>BrowserWindow.getFocusedWindow()?.reload()},{label:'Open Hosted Map in Browser',click:()=>shell.openExternal(MAP_URL)}]},
 {label:'View',submenu:[{role:'zoomIn'},{role:'zoomOut'},{role:'resetZoom'},{role:'togglefullscreen'},{type:'separator'},{label:'Use System Theme',type:'radio',checked:prefs.theme==='system',click:()=>setTheme('system')},{label:'Dark Theme',type:'radio',checked:prefs.theme==='dark',click:()=>setTheme('dark')},{label:'Light Theme',type:'radio',checked:prefs.theme==='light',click:()=>setTheme('light')}]},
 {label:'Edit',submenu:[{role:'copy'},{role:'paste'},{role:'selectAll'}]}
 ]);
 Menu.setApplicationMenu(menu);
}
function setTheme(theme){prefs.theme=theme;nativeTheme.themeSource=theme;savePrefs();rebuildMenu();}
app.whenReady().then(()=>{app.setName(APP);loadPrefs();nativeTheme.themeSource=prefs.theme;rebuildMenu();openWindow(prefs.restoreSession&&isMapUrl(prefs.lastUrl)?prefs.lastUrl:MAP_URL);app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)openWindow();});});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit();});
