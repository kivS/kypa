const app = require('electron').app;

const {Tray, Menu, globalShortcut} = require('electron');
const robot = require('robotjs');


/**
 *  App Events
 */
app.on('ready', start);





/**
 *  Program start Up
 */
function start() {
  console.log("hello biatch!");

  // Set Tray icon
  trayIcon = new Tray(`${__dirname}/resources/images/icon.png`);
  trayIcon.setToolTip('Kypa');

  // create menu
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open',
      click: () => {
        return;
      }
    },
    {
      type: 'separator',
    },
    {
      label: 'Exit',
      role: 'quit'
    }
  ]);
  // set menu
  trayIcon.setContextMenu(contextMenu);

  // trayIcon.on('click', () => {
  // // popup menu
  //
  // })


  // register global shorcut demo
  globalShortcut.register('ctrl+shift+g', () =>{
    // output some text
    console.log("well fuck you!");
  });

}
