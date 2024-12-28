// Node.jsのすべてのAPIがプリロード処理で利用可能です。
import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('myAPI', {
  readFile: (filename: string) => ipcRenderer.invoke('read-file', filename),
  writeFile: (filename: string, data: string) => ipcRenderer.invoke('write-file', filename, data),
});