import { getElementById } from './common.js';
import { createTypeListValues } from './typelist.js';
import { HistoryElement } from './history.js';
import { FavoriteElement } from './favorite.js';
import './afterEvent.js';
const favoriteElm = new FavoriteElement();
const historyElm = new HistoryElement();

getElementById('tools').addEventListener('click', async () => {
  createTypeListValues();
});
getElementById('documents').addEventListener('click', async () => {
  createTypeListValues();
});


window.onload = function() {
  // load post method
  createTypeListValues();
  historyElm.showHistoryList();
  favoriteElm.showFavoriteList();
}