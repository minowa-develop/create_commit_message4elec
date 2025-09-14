// cjsモジュールではないと駄目みたい
const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
  readFile: (filename: string) => ipcRenderer.invoke('read-file', filename),
  writeFile: (filename: string, data: string) => ipcRenderer.invoke('write-file', filename, data),
});

