"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// cjsモジュールではないと駄目みたい
const { ipcRenderer, contextBridge } = require('electron');
contextBridge.exposeInMainWorld('myAPI', {
    readFile: (filename) => ipcRenderer.invoke('read-file', filename),
    writeFile: (filename, data) => ipcRenderer.invoke('write-file', filename, data),
});
//# sourceMappingURL=preload.cjs.map