import Store from "electron-store";
import { random } from "./crypt/crypto.factory";

export const appStore = new Store({
  name: "preferences",
  defaults: {
    statistic: { upload: 0, download: 0, seed: 0 },
    autoLaunch: false,
    minimizeOnClose: true,
    checkUpdatesOnApplicationStart: true,
    lastUpdate: Date.now(),
  },
});

export const walletStore = new Store({
  name: "wallet",
  defaults: {},
});

export const torrentStore = new Store({
  name: "torrents",
  defaults: {
    torrents: [], // {file, state, ...}
    nodeId: random(20).toString("hex"),
    peerId: random(20).toString("hex"),
  },
});
