document.getElementById('documents').addEventListener('click', async () => {
  createTypeListValues();
});
document.getElementById('tools').addEventListener('click', async () => {
  createTypeListValues();
});

document.getElementById('createMessage').addEventListener('click', async () => {
  createMessage();
  registHistory();
});
document.getElementById('copy').addEventListener('click', async () => {
  copy();
});
document.getElementById('initialize').addEventListener('click', async () => {
  initialize();
});
document.getElementById('exportData').addEventListener('click', async () => {
  exportData();
});
document.getElementById('import_file').addEventListener('change', async () => {
  importData();
});
document.getElementById('favoriteRegist').addEventListener('click', async () => {
  registFavorite();
});
