// Node.jsのすべてのAPIがプリロード処理で利用可能です。
const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
  readFile: (file) => ipcRenderer.invoke('read-file', file),
  writeFile: (file, data) => ipcRenderer.invoke('write-file', file, data),
});