import { TitleMaker } from "../../base/data/title-marker.js";
import { ElementGetter } from "../../base/element-getter.js";
import { ElementSousa } from "../../base/element-sousa.js";
import { Model } from "../../base/data/model/model.js";
import { FAVORITE_FILE } from "./constants.js";
import { FavoriteReader } from "./favorite-reader.js";

export class FavoriteSetter {
  public static async show(){
    // read history
    const favoriteList = await FavoriteReader.read();
    const table: HTMLTableElement = ElementGetter.getTableElementById('favorite_area');

    // reset tr
    while (table.rows.length > 0) table.deleteRow(0);

    for (var i = favoriteList.length-1; 0 <= i; i--) {
      const tr = document.createElement("tr");
      const obj = favoriteList[i];

      // title
      const tdFilename: HTMLTableCellElement = ElementSousa.createTdCallSetForm(TitleMaker.make(obj), obj);
      tr.appendChild(tdFilename);

      // delete button
      const tdDeleteButton: HTMLTableCellElement = FavoriteSetter.createTdCallDelFavorite("削除", favoriteList, i);
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
  private static createTdCallDelFavorite(msg: string, favoriteList: Array<Model>, delindex: number): HTMLTableCellElement{
    const button: HTMLInputElement = ElementSousa.createButtonElement(msg);
    button.addEventListener('click', async () => {
      favoriteList.splice(delindex, 1);
      await window.ipcRenderer.writeFile(FAVORITE_FILE, JSON.stringify(favoriteList));
      FavoriteSetter.show();
    });
    const tdElement: HTMLTableCellElement  = document.createElement("td");
    tdElement.appendChild(button);
    return tdElement;
  }

}