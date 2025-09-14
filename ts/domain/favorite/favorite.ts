import { DataGetter } from "../../base/data/data-getter.js";
import { Model } from "../../base/data/model/model.js";
import { TitleMaker } from "../../base/data/title-marker.js";
import { ElementGetter } from "../../base/element-getter.js";
import { ElementSousa } from "../../base/element-sousa.js";
import { FAVORITE_FILE } from "./constants.js";

// 履歴登録
export async function registFavorite() {
  // read history
  var favoriteList: Model[] = await readList();

  // add formdata for history
  favoriteList.push(DataGetter.get());

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
async function readList(): Promise<Model[]>{
  let rawList = await window.myAPI.readFile(FAVORITE_FILE) as Array<Model>
  let list: Array<Model> = [];
  rawList.forEach((value: Model) => {
    let data = new Model();
    data = value;
    list.push(data);
  });
  return list;
}

function toJsonList(list: Array<Model>): object[]{
  let jsonList: object[] = [];
  list.forEach((value: Model) => {
    jsonList.push(value);
  });
  return jsonList;
}

/**
 * リスト表示
 */
export async function showFavoriteList(){
  // read history
  let favoriteList: Model[] = await readList();
  let table: HTMLTableElement = ElementGetter.getTableElementById('favorite_area');

  // reset tr
  while (table.rows.length > 0) table.deleteRow(0);

  for (var i = favoriteList.length-1; 0 <= i; i--) {
    let tr = document.createElement("tr");

    // title
    let tdFilename: HTMLTableCellElement = ElementSousa.createTdCallSetForm(TitleMaker.make(favoriteList[i]), favoriteList[i]);
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
function createTdCallDelFavorite(msg: string, favoriteList: Array<Model>, delindex: number): HTMLTableCellElement{
  let button: HTMLInputElement = ElementSousa.createButtonElement(msg);
  button.addEventListener('click', async () => {
    favoriteList.splice(delindex, 1);
    await window.myAPI.writeFile(FAVORITE_FILE, JSON.stringify(toJsonList(favoriteList)));
    showFavoriteList();
  });
  let tdElement: HTMLTableCellElement  = document.createElement("td");
  tdElement.appendChild(button);
  return tdElement;
}
