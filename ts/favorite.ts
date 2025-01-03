import { Data, getData } from "./Data.js";
import { html } from '../node_modules/@polymer/polymer/polymer-element.js';
import { createTdCallSetForm,createButtonElement,UserPolymerElement } from "./common.js";

const FAVORITE_FILE="favorite.json"
export class FavoriteElement extends UserPolymerElement {
  static get is() { return 'favorite-element'; }
  static get template() {
    return html`
      <div class="favorite_area area">
        <b>Favorite</b>
        <table id="favorite_area"></table>
      </div>
    `;
  }

  /**
 * jsonListをDataListに変換
 * @param rawList 
 * @returns 
 */
  public async readList(): Promise<Data[]>{
    let rawList = await window.myAPI.readFile(FAVORITE_FILE) as Array<Data>
    let list: Array<Data> = [];
    rawList.forEach((value: Data) => {
      let data = new Data();
      data.setJson(value);
      list.push(data);
    });
    return list;
  }

  public toJsonList(list: Array<Data>): object[]{
    let jsonList: object[] = [];
    list.forEach((value: Data) => {
      jsonList.push(value.toJson());
    });
    return jsonList;
  }

  public async showFavoriteList(){
    // read history
    let favoriteList: Data[] = await this.readList();
    let table: HTMLTableElement = this.getElementById<HTMLTableElement>('favorite_area');
  
    // reset tr
    while (table.rows.length > 0) table.deleteRow(0);
  
    for (var i = favoriteList.length-1; 0 <= i; i--) {
      let tr = document.createElement("tr");
  
      // title
      let tdFilename: HTMLTableCellElement = createTdCallSetForm(favoriteList[i].makeTitle(), favoriteList[i]);
      tr.appendChild(tdFilename);
  
      // delete button
      let tdDeleteButton: HTMLTableCellElement = this.createTdCallDelFavorite("削除", favoriteList, i);
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
  private createTdCallDelFavorite(msg: string, favoriteList: Array<Data>, delindex: number): HTMLTableCellElement{
    let button: HTMLInputElement = createButtonElement(msg);
    button.addEventListener('click', async () => {
      favoriteList.splice(delindex, 1);
      await window.myAPI.writeFile(FAVORITE_FILE, JSON.stringify(this.toJsonList(favoriteList)));
      this.showFavoriteList();
    });
    let tdElement: HTMLTableCellElement  = document.createElement("td");
    tdElement.appendChild(button);
    return tdElement;
  }
}
customElements.define(FavoriteElement.is, FavoriteElement);

/**
 * お気に入り登録ボタン
 */
export class FavoriteRegistElement extends UserPolymerElement {
  static get is(){ return "favorite-regist-element"; }
  constructor(){
    super();
    this.addEventListener('click', this.regist);
  }
  static get template() {
    return html`<button id="favoriteRegist">regist favorite</button>`;
  }
  private async regist(){
    let FavoriteElm = new FavoriteElement();
    // read history
    let favoriteList: Data[] = await FavoriteElm.readList();
  
    // add formdata for history
    favoriteList.push(getData());
  
    // write history
    await window.myAPI.writeFile(FAVORITE_FILE, JSON.stringify(FavoriteElm.toJsonList(favoriteList)))
  
    // drow favoriteList
    FavoriteElm.showFavoriteList();
  }
}
customElements.define(FavoriteRegistElement.is, FavoriteRegistElement);