// TODO: create Learn window, add shortcut and button for Menu mainWindow

const { app, BrowserWindow, Menu } = require('electron');
const data = require('./woorden/woordjesLatijn3.json');

let mainWindow, learnWindow;

function createWindow(fileName, extra) {
    // Create the browser window.
    let window = new BrowserWindow({ width: 800, height: 600 });

    extra(window);

    window.loadFile(`./${fileName}/index.html`);

    // Emitted when the window is closed.
    window.on('closed', () => window = null);

    return window;
}

app.on('ready', () => {
    mainWindow = createWindow('mainWindow', w => w.woorden = data);
    const template = [{
        label: 'Learn!',
        accelerator: 'CmdOrCtrl+L',
        click() {
            learnWindow = createWindow('learnWindow', w => w.woorden = mainWindow.woorden);
        }
    }, {
        role: 'toggleDevTools'
    }, {
        role: 'reload'
    }];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
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