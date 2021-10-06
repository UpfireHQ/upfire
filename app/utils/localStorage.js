import { app, ipcMain, ipcRenderer } from 'electron';
import Store from 'electron-store';
import { random } from './crypt/crypto.factory';

let defaultCwd;
if (ipcRenderer) {
  const appData = ipcRenderer.sendSync('electron-store-get-data');
  defaultCwd = appData.defaultCwd;
} else if (ipcMain && app) {
  defaultCwd = app.getPath('userData');
} else {
  throw new Error('localStorage: userDataPath non-determinable');
}
export const userDataPath = defaultCwd;

export const appStore = new Store({
  name: 'preferences',
  defaults: {
    statistic: { upload: 0, download: 0, seed: 0 },
    autoLaunch: false,
    minimizeOnClose: true,
    checkUpdatesOnApplicationStart: true,
    lastUpdate: Date.now(),
  },
});

export const walletStore = new Store({
  name: 'wallet',
  defaults: {},
});

export const torrentStore = new Store({
  name: 'torrents',
  defaults: {
    torrents: [], // {file, state, ...}
    nodeId: random(20).toString('hex'),
    peerId: random(20).toString('hex'),
  },
});
