// アプリケーション作成用のモジュールを読み込み
import { app, BrowserWindow, ipcMain } from'electron';
import * as fs from'fs';
import * as path from"path";

// メインウィンドウ
let mainWindow;

const createWindow = () => {
  // メインウィンドウを作成します
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      // プリロードスクリプトは、レンダラープロセスが読み込まれる前に実行され、
      // レンダラーのグローバル（window や document など）と Node.js 環境の両方にアクセスできます。
      preload: path.join("preload.js"),
    },
  });

  ipcMain.handle('read-file', async (_e, file: string) => {
    let historyList: string[] = [];
    if(fs.existsSync(file)){
      let text: string = fs.readFileSync(file).toString();
      try {
        historyList = JSON.parse(text);
      }catch(e){
        // 変換できなかった際は初期値(空配列)のまま
      }
    }
    return historyList;
  });

  ipcMain.handle('write-file', async (_e, file: string, data: string) => {
    fs.writeFileSync(file, data);
  });

  // メインウィンドウに表示するURLを指定します
  // （今回はmain.jsと同じディレクトリのindex.html）
  mainWindow.loadFile("index.html");

  // デベロッパーツールの起動
  mainWindow.webContents.openDevTools();

  // メインウィンドウが閉じられたときの処理
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

//  初期化が完了した時の処理
app.whenReady().then(() => {
  createWindow();

  // アプリケーションがアクティブになった時の処理(Macだと、Dockがクリックされた時）
  app.on("activate", () => {
    // メインウィンドウが消えている場合は再度メインウィンドウを作成する
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 全てのウィンドウが閉じたときの処理
app.on("window-all-closed", () => {
  // macOSのとき以外はアプリケーションを終了させます
  if (process.platform !== "darwin") {
    app.quit();
  }
});
