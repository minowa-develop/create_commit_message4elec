import { getElementById } from './common.js';
import { createMessage, copy, initialize, exportData, importData } from './afterEvent.js';
import { createTypeListValues } from './typelist.js';
import { HistoryElement } from './history.js';
import { FavoriteElement } from './favorite.js';
const favoriteElm = new FavoriteElement();
const historyElm = new HistoryElement();

getElementById('tools').addEventListener('click', async () => {
  createTypeListValues();
});
getElementById('documents').addEventListener('click', async () => {
  createTypeListValues();
});
getElementById('createMessage').addEventListener('click', async () => {
  createMessage();
  historyElm.registHistory();
});
getElementById('copy').addEventListener('click', async () => {
  copy();
});
getElementById('initialize').addEventListener('click', async () => {
  initialize();
});
getElementById('exportData').addEventListener('click', async () => {
  exportData();
});
getElementById('import_file').addEventListener('change', async () => {
  importData();
});
getElementById('favoriteRegist').addEventListener('click', async () => {
  favoriteElm.registFavorite();
});

window.onload = function() {
  // load post method
  createTypeListValues();
  historyElm.showHistoryList();
  favoriteElm.showFavoriteList();
}