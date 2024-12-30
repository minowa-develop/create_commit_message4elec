import { Data, getData } from "./Data.js";
import { getTableElementById,createTdCallSetForm,createButtonElement } from "./common.js";

const FAVORITE_FILE="favorite.json"

// 履歴登録
export async function registFavorite() {
  // read history
  var favoriteList: Data[] = await readList();

  // add formdata for history
  favoriteList.push(getData());

  // write history
  await window.myAPI.writeFile(FAVORITE_FILE, JSON.stringify(toJsonList(favoriteList)))

  // drow favoriteList
  showFavoriteList();
}

/**
 * jsonListをDataListに変換
 * @param rawList 
 * @returns 
 */
async function readList(): Promise<Data[]>{
  let rawList = await window.myAPI.readFile(FAVORITE_FILE) as Array<Data>
  let list: Array<Data> = [];
  rawList.forEach((value: Data) => {
    let data = new Data();
    data.setJson(value);
    list.push(data);
  });
  return list;
}

function toJsonList(list: Array<Data>): object[]{
  let jsonList: object[] = [];
  list.forEach((value: Data) => {
    jsonList.push(value.toJson());
  });
  return jsonList;
}

/**
 * リスト表示
 */
export async function showFavoriteList(){
  // read history
  let favoriteList: Data[] = await readList();
  let table: HTMLTableElement = getTableElementById('favorite_area');

  // reset tr
  while (table.rows.length > 0) table.deleteRow(0);

  for (var i = favoriteList.length-1; 0 <= i; i--) {
    let tr = document.createElement("tr");

    // title
    let tdFilename: HTMLTableCellElement = createTdCallSetForm(favoriteList[i].makeTitle(), favoriteList[i]);
    tr.appendChild(tdFilename);

    // delete button
    let tdDeleteButton: HTMLTableCellElement = createTdCallDelFavorite("削除", favoriteList, i);
    tr.appendChild(tdDeleteButton);

    table.appendChild(tr);
  }
}

/**
 * 削除用のボタン作成
 * @param msg 表示メッセージ
 * @param favoriteList 
 * @param delindex 削除対象の配列番号
 * @returns 
 */
function createTdCallDelFavorite(msg: string, favoriteList: Array<Data>, delindex: number): HTMLTableCellElement{
  let button: HTMLInputElement = createButtonElement(msg);
  button.addEventListener('click', async () => {
    favoriteList.splice(delindex, 1);
    await window.myAPI.writeFile(FAVORITE_FILE, JSON.stringify(toJsonList(favoriteList)));
    showFavoriteList();
  });
  let tdElement: HTMLTableCellElement  = document.createElement("td");
  tdElement.appendChild(button);
  return tdElement;
}
