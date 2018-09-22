// TODO: create Learn window, add shortcut and button from Menu mainWindow

const { app, BrowserWindow, Menu } = require('electron');
const data = require('./woorden/woordjesLatijn3.json');

let mainWindow, learnWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 800, height: 600 })

    mainWindow.woorden = data;

    mainWindow.loadFile('./mainWindow/index.html');

    // Menu.setApplicationMenu(null);

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        mainWindow = null
    })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow()
    }
})