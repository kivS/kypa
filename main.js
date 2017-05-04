const app = require('electron').app;
let mainWindow;

// allow only one instance of the Program
const shouldQuit = app.makeSingleInstance(() =>{
  if(mainWindow) mainWindow.show();
})
if(shouldQuit) app.exit();

const {Tray, Menu, BrowserWindow, globalShortcut, ipcMain, clipboard, dialog } = require('electron');
const robot = require('robotjs');
const path = require('path');
const uuid = require('uuid');
const autoUpdater = require('electron-updater').autoUpdater;
const log = require('electron-log');
const autoLaunch = require('auto-launch');


// config auto launch
const auto_launch = new autoLaunch({
  name: app.getName()

}).enable();




// autoUpdater config
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info"

// define db's path
const db_location = path.join(app.getPath('userData'), 'db.json');
console.log(`DB location: ${db_location}`);
// start persistent db with location
const db  = require('./resources/helpers/db')(db_location);




/**
 *  App Events
 */
app.on('ready', start);

app.on('window-all-closed', () =>{
  return;
});

app.on('will-quit', () =>{

  mainWindow = null;

  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});


////*****************************************************
//         autoUpdater events
//
//*****************************************************

autoUpdater.on('update-downloaded', (ev, info) => {

  const title = 'Kypa - New Update';
  const msg = 'Update available. Update now?';
  const btns = ['ok', 'later'];


  sendMsgToUser('info', title, msg, btns, index =>{
    // if ok let's update app!
    if(index == '0') autoUpdater.quitAndInstall();
  });

});

autoUpdater.on('error', err =>{
  log.error('Error while updating: ',err);
});


/**
 *  Program start Up
 */
function start() {
  console.log("Start up!");

  // Check for updates
  autoUpdater.checkForUpdates();

  // load key bindings from db and start them
  new Promise((resolve, reject) =>{
    const binding_entries = db.get('bindings').value();
    console.log('entries: ', binding_entries);

    binding_entries.forEach( entry => {
        // register entry
        addGlobalShortcut(entry.shortcut, entry.text);
    });
    console.log('global shorcuts loaded!');
    resolve();
  });

  // Set Tray icon
  trayIcon = new Tray(`${__dirname}/resources/images/icon.png`);
  trayIcon.setToolTip('Kypa');

  // create menu
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open',
      click: () => {
        mainWindow.show();
      }
    },
    {
      type: 'separator',
    },
    {
      label: 'Exit',
      click: () =>{
        mainWindow.destroy();
        app.quit();
      }
    }
  ]);

  // set menu
  trayIcon.setContextMenu(contextMenu);

  // handle click on tray icon
  trayIcon.on('click', () => {
    mainWindow.show();
  })

  // Create mainWindow
  mainWindow = new BrowserWindow({
    width:            985,
    minWidth:         775,
    height:           570,
    minHeight:        320,
    show:             false,

  });


  // DEV environment
  if(process.env.DEV){

    // add react dev tools
     BrowserWindow.addDevToolsExtension(`${process.env.HOME}/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/2.0.12_0`);

     mainWindow.loadURL('http://localhost:3000'); 

      // load DevTools
     mainWindow.webContents.openDevTools();



  }else{
    mainWindow.loadURL(`file://${__dirname}/build/index.html`);
  } 


 

  // mainWindow Events
  mainWindow.on('close', (e) =>{
    // make app close if in dev mode
    if(process.env.DEV) return 1;

    e.preventDefault();
    mainWindow.hide();
  })



  /**
   *  Redenderer communication
   */

  
  ipcMain.on('register_shortcut', (e_shortcut, shortcut, text) =>{

    let addGlobalShortcut_result = null;

    try {
      // add global shortcut
      addGlobalShortcut_result = addGlobalShortcut(shortcut, text);

    } catch (e) {
      console.error('Error adding shortcut', e);
      console.log('shortcut: ', shortcut, 'text: ', text);
      // send error response back
      e_shortcut.returnValue = {success: false, msg: 'Invalid shortcut!'};

    }

    console.log('register global shortcut result: ', addGlobalShortcut_result);

    if(addGlobalShortcut_result){
      // send success response
      e_shortcut.returnValue = {success: true};

      // save to db
      const save_shorcut = db.get('bindings').push({
        "id": uuid(),
        "time_added": (new Date().getTime()),
        "shortcut": shortcut,
        "text": text,
        "type": "text"
      }).write();

      console.log('saved shorcut to db!');

    }else{
      // send error response back
      e_shortcut.returnValue = {success: false, msg: 'Shortcut not allowed. Already in use!'};

    }

  });

  ipcMain.on('get_shortcuts', (e) =>{
     e.returnValue = db.get('bindings').value();
  });

  ipcMain.on('delete_shortcut', (e, id) =>{
    
    // get the shortcut
    const shortcut = db.get('bindings').find({id: id}).get('shortcut').value();
    
    // unregister shortcut
    globalShortcut.unregister(shortcut);
    
    // delete it
    db.get('bindings').remove({id: id}).write();

  });

  ipcMain.on('delete_all_shortcut', (e) =>{
    db.set('bindings', []).write();
    globalShortcut.unregisterAll();

  });

}






/**********************************************************************************************************************
                          Utils
/**********************************************************************************************************************






/**
 * [addGlobalShortcut description]
 * @param {[type]} shortcut [description]
 * @param {[type]} text     [description]
 */
function addGlobalShortcut(shortcut, text){
    // Register shorcut
  return globalShortcut.register(shortcut, () =>{

      // set clipboard to text
      clipboard.writeText(text);

      // send paste command
      setTimeout(() => {
         robot.keyTap('v', 'control');
      }, 265);

    });
}


/**
 * Send message dialog to user
 * @param  {[string]} type -> info, error ,etc..
 * @param  {[string]} title -> title
 * @param  {[string]} msg -> message
 * @param  {[string]} btns -> array of butttons : ["ok" , "zz"]
 * @return {[type]}     [description]
 */
function sendMsgToUser(type,title, msg, btns,  cb){
  dialog.showMessageBox({
    "type": type ,
    "title": title,
    "message": msg,
    "buttons": btns

  }, index =>{

    cb(index);
  })
}