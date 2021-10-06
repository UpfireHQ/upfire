import { app, ipcMain, ipcRenderer } from 'electron';
import path from 'path';
import log from 'electron-log';
import { APP_NAME } from '../constants';

let defaultCwd;
if (ipcRenderer) {
  const appData = ipcRenderer.sendSync('electron-store-get-data');
  defaultCwd = appData.defaultCwd;
} else if (ipcMain && app) {
  defaultCwd = app.getPath('userData');
} else {
  throw new Error('localStorage: userDataPath non-determinable');
}
const userDataPath = defaultCwd;

if (log.transports) {
  log.transports.console.level = 'debug';
  log.transports.console.format = '[{level}] {text}';

  log.transports.file.level = 'info';
  log.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s} {level}] {text}';
  log.transports.file.maxSize = 10 * 1024 * 1024;
  log.transports.file.file = path.join(userDataPath, `${APP_NAME}.log`);
}

export default log;
