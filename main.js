const { app, BrowserWindow, Menu } = require('electron');

class Woord {
    constructor(jsonWord) {
        this.nom = jsonWord.nom;
        this.gen = jsonWord.gen;
        this.vert = jsonWord.vert;
        this.geslacht = jsonWord.geslacht;
    }

    check(form) {
        console.warn('unhandled call to check!!');
        return false;
    }
}

class Subs extends Woord {
    constructor(jsonWord) {
        super(jsonWord);
    }

    check(inputWord) {
        return this.gen == inputWord.gen && this.geslacht == inputWord.geslacht && this.vert.find(v => v == inputWord.vert);
    }
}

const data = require('./woorden/woordjesLatijn3.json').map(word => {
    if (word.type == 'subs') {
        return new Subs(word);
    }
    return new Woord(word);
});


let mainWindow, learnWindow, testWindow;

function createWindow(fileName, extra) {
    // Create the browser window.
    let window = new BrowserWindow({ width: 800, height: 600 });

    if (extra) {
        extra(window);
    }

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
        label: 'Test!',
        accelerator: 'CmdOrCtrl+T',
        click() {
            testWindow = createWindow('testWindow', w => w.woorden = data);
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
});