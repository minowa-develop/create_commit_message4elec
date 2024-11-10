const FAVORITE_FILE="favorite.json"

// 履歴登録
async function registFavorite() {
  // read history
  var favoriteList = await window.myAPI.readFile(FAVORITE_FILE);

  // add formdata for history
  favoriteList.push(getObj());

  // write history
  await window.myAPI.writeFile(FAVORITE_FILE, JSON.stringify(favoriteList))

  // drow favoriteList
  showFavoriteList();
}

// 履歴リスト表示
async function showFavoriteList(){
  // read history
  var favoriteList = await window.myAPI.readFile(FAVORITE_FILE);

  var table = document.getElementById('favorite_area');

  // reset tr
  while (table.rows.length > 0) table.deleteRow(0);

  for (var i = favoriteList.length-1; 0 <= i; i--) {
    let tr = document.createElement("tr");

    // filename
    let tdFilename = createTdCallSetForm(makeExportFileName(favoriteList[i]), favoriteList[i]);
    tr.appendChild(tdFilename);

    let tdDeleteButton = createTdCallDelFavorite("削除", favoriteList, i);
    tr.appendChild(tdDeleteButton);

    table.appendChild(tr);
  }
}

function createTdCallDelFavorite(value, favoriteList, index){
  let tdElement = createTdElement(value);
  tdElement.addEventListener('click', async () => {
    favoriteList.splice(index, 1);
    await window.myAPI.writeFile(FAVORITE_FILE, JSON.stringify(favoriteList));
    showFavoriteList();
  });
  return tdElement;
}