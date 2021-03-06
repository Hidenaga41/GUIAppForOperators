/* eslint-disable no-console */
import os from 'os';
import fs from 'fs';
import { app, BrowserWindow, session, Menu } from 'electron';
import * as path from 'path';
import * as url from 'url';

let mainWindow: Electron.BrowserWindow | null;

/**
 * Search React Devtools
 */
const searchReactDevtools = async () => {
  const isWin32 = os.platform() === 'win32';
  const isDarwin = os.platform() === 'darwin';

  const reactDevtools = '/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi';

  const extDir = isDarwin
    ? // macOS
      '/Library/Application Support/Google/Chrome'
    : isWin32
    ? // Windows
      '/AppData/Local/Google/Chrome/User Data'
    : // Linux
      '/.config/google-chrome';

  // React Devtools フォルダの絶対パス
  const dirPath = path.join(os.homedir(), extDir, reactDevtools);

  return await fs.promises
    .readdir(dirPath, { withFileTypes: true })
    .then((dirents) =>
      dirents
        .filter((dirent) => dirent.isDirectory())
        .map(({ name }) => path.resolve(dirPath, name))
        .shift(),
    )
    .catch((err) => Error(`Error: ${err}`));
};

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    backgroundColor: '#f2f2f2',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: process.env.NODE_ENV !== 'production',
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:4000');
    mainWindow.webContents.openDevTools({ mode: 'detach' });

    const extPath = await searchReactDevtools();

    if (typeof extPath === 'string') {
      await session.defaultSession
        .loadExtension(extPath, { allowFileAccess: true })
        .then(() => console.log('React Devtools loaded...'))
        .catch((err) => console.log(`ERROR: ${err}`));
    }

    const child = new BrowserWindow({
      width: 350,
      height: 200,
      backgroundColor: '#f2f2f2',
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true,
      },
      // frame: false,
    });
    child.loadURL('http://localhost:4000/');

    // mainWindow.flag = true;
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

const crateMenu = () => {
  const menu_temp = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New',
          click: () => {
            console.log('new window');
            createWindow();
          },
        },
        { label: 'File' },
        { label: 'Quite' },
      ],
    },
    {
      label: 'Edit',
      submenu: [{ label: 'New' }, { label: 'File' }, { label: 'Quite' }],
    },
  ];
  const menu = Menu.buildFromTemplate(menu_temp);

  Menu.setApplicationMenu(menu);
};

crateMenu();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

/**
 * window
 */
app.on('browser-window-focus', () => {
  console.log('browser window focus');
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

app.allowRendererProcessReuse = true;
