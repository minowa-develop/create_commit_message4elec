import { getElementById } from './common.js';
import { createMessage, copy, initialize, exportData, importData } from './afterEvent.js';
import { registHistory } from './history.js';
import { createTypeListValues } from './typelist.js';
import { showHistoryList } from './history.js';
import { registFavorite,showFavoriteList } from './favorite.js';

getElementById('tools').addEventListener('click', async () => {
  createTypeListValues();
});
getElementById('documents').addEventListener('click', async () => {
  createTypeListValues();
});
getElementById('createMessage').addEventListener('click', async () => {
  createMessage();
  registHistory();
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
  registFavorite();
});

window.onload = function() {
  // load post method
  createTypeListValues();
  showHistoryList();
  showFavoriteList();
}