// Node.jsのすべてのAPIがプリロード処理で利用可能です。
const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
  readFile: (file: string) => ipcRenderer.invoke('read-file', file),
  writeFile: (file: string, data: string) => ipcRenderer.invoke('write-file', file, data),
});