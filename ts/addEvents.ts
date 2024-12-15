import { getElementById } from './common';
import { createMessage, copy, initialize, exportData, importData } from './afterEvent';
import { registHistory } from './history';
// import { registFavorite } from './favorite';

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
  // registFavorite();
});
