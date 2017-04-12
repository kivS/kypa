const app = require('electron').app;

const {Tray, Menu, BrowserWindow, globalShortcut, ipcMain, clipboard } = require('electron');
const robot = require('robotjs');
let mainWindow;


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



/**
 *  Program start Up
 */
function start() {
  console.log("Start up!");

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
    width:            600,
    height:           600,
    show:             false,

  });

  // load mainWindow
  mainWindow.loadURL(`file://${__dirname}/shortcuts_page.html`);

  // load DevTools
  mainWindow.webContents.openDevTools();

  // mainWindow Events
  mainWindow.on('close', (e) =>{
    e.preventDefault();
    mainWindow.hide();
  })



  /**
   *  Main & Redender processes communication
   */

  // Listen for commands from shortcuts_page
  ipcMain.on('register_shortcut', (e, shortcut, text) =>{

    // Register shorcut
    globalShortcut.register(shortcut, () =>{

      // set clipboard to text
      clipboard.writeText(text);

      // send paste command
      setTimeout(() => {
         robot.keyTap('v', 'control');
      }, 265);

    });
  });

}
