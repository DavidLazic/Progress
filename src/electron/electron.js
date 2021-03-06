import path from 'path';
import url from 'url';
import env from 'env';
import { app, Menu, BrowserWindow } from 'electron';
import { devMenuTemplate } from './menu/dev_menu_template';
import { editMenuTemplate } from './menu/edit_menu_template';

const setApplicationMenu = () => {
  const menus = [editMenuTemplate, devMenuTemplate];
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

require('electron-reload')(__dirname);

app.on('ready', () => {
  setApplicationMenu();

  if (env.name === 'development') {
    BrowserWindow.addDevToolsExtension(
      '/Users/dlazic/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.4.2_0'
    );
  }

  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  if (env.name === 'development') {
    mainWindow.openDevTools();
  }
});

app.on('window-all-closed', () => {
  app.quit();
});
