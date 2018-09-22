// TODO: create Learn window, add shortcut and button from Menu mainWindow

const { app, BrowserWindow, Menu } = require('electron');
const data = require('./woorden/woordjesLatijn3.json');

let mainWindow, learnWindow;

function createWindow(fileName) {
    // Create the browser window.
    let window = new BrowserWindow({ width: 800, height: 600 });

    window.woorden = data;

    window.loadFile(`./${fileName}/index.html`);

    // Emitted when the window is closed.
    window.on('closed', () => window = null);

    return window;
}

app.on('ready', () => {
    mainWindow = createWindow('mainWindow');
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function() {
    if (mainWindow === null) {
        mainWindow = createWindow('mainWindow');
    }
})