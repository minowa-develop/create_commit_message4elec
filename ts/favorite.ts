import { Data } from "./Data";
import { getData,setFormData } from './DomAccess';
import { getTableElementById,createTdElement,createTdCallSetForm } from "./common";

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
  let favoriteList: Data[]= JSON.parse(await window.myAPI.readFile(FAVORITE_FILE) as string);

  let table = getTableElementById('favorite_area');

  // reset tr
  while (table.rows.length > 0) table.deleteRow(0);

  for (var i = favoriteList.length-1; 0 <= i; i--) {
    let tr = document.createElement("tr");

    // filename
    let tdFilename = createTdCallSetForm(favoriteList[i].makeCommitMessage(), favoriteList[i]);
    tr.appendChild(tdFilename);

    let tdDeleteButton = createTdCallDelFavorite("削除", favoriteList, i);
    tr.appendChild(tdDeleteButton);

    table.appendChild(tr);
  }
}

/**
 * 
 * @param msg 表示メッセージ
 * @param favoriteList 
 * @param delindex 削除対象の配列番号
 * @returns 
 */
function createTdCallDelFavorite(msg: string, favoriteList: Array<Data>, delindex: number): HTMLTableCellElement{
  let tdElement = createTdElement(msg);
  tdElement.addEventListener('click', async () => {
    favoriteList.splice(delindex, 1);
    await window.myAPI.writeFile(FAVORITE_FILE, JSON.stringify(favoriteList));
    showFavoriteList();
  });
  return tdElement;
}