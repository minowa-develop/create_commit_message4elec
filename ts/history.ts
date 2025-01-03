import { Data, getData } from "./Data.js";
import { html } from '../node_modules/@polymer/polymer/polymer-element.js';
import { createTdElement,createTdCallSetForm,convTimestamp,UserPolymerElement } from "./common.js";


export class HistoryElement extends UserPolymerElement {
  private readonly MAX_HISTORY_COUNT = 5;
  private readonly HISTORY_FILE = "history.json"
  getElementId(){ return "history-element"; }
  static get template() {
    return html`
      <div class="history_area area">
        <b>History</b>
        <table id="history_area"></table>
      </div>
    `;
  }

  // 履歴登録
  public async registHistory(){
    // read history
    let historyList: Array<HistoryData> = await this.readList();

    // oldest remove
    while(historyList.length >= this.MAX_HISTORY_COUNT){
      historyList.shift();
    }

    // add formdata for history
    historyList.push(new HistoryData(getData()));

    // write history
    await window.myAPI.writeFile(this.HISTORY_FILE, JSON.stringify(this.toJsonList(historyList)))

    // drow historylist
    this.showHistoryList();
  }

  /**
   * jsonListをHistoryDataListに変換
   * @param rawList 
   * @returns 
   */
  private async readList(): Promise<HistoryData[]>{
    let rawList = await window.myAPI.readFile(this.HISTORY_FILE) as Array<HistoryData>;
    let historyList: Array<HistoryData> = [];
    rawList.forEach((value: HistoryData) => {
      let historyData = new HistoryData(value.data);
      historyData.timestamp = value.timestamp;
      historyList.push(historyData);
    });
    return historyList;
  }

  private toJsonList(list: Array<HistoryData>): object[]{
    let jsonList: object[] = [];
    list.forEach((value: HistoryData) => {
      jsonList.push(value.toJson());
    });
    return jsonList;
  }

  // 履歴リスト表示
  public async showHistoryList(){
    // read history
    let historyList: Array<HistoryData> = await this.readList();

    let table: HTMLTableElement = this.getElementById('history_area');

    // reset tr
    while (table.rows.length > 0) table.deleteRow(0);

    for (let i = historyList.length-1; 0 <= i; i--) {
      let tr = document.createElement("tr");

      // timestamp
      let tdTimestamp: HTMLTableCellElement = createTdElement(convTimestamp(historyList[i].timestamp));
      tr.appendChild(tdTimestamp);

      // filename
      let tdFilename: HTMLTableCellElement = createTdCallSetForm(historyList[i].data.makeTitle(), historyList[i].data);
      tr.appendChild(tdFilename);

      table.appendChild(tr);
    }
  }

}
customElements.define("history-element", HistoryElement);


export class HistoryData {
  // fields
  private _timestamp: number;
  private _data: Data = new Data();

  // get/setter methods
  public get timestamp(): number{ return this._timestamp }
  public set timestamp(timestamp: number){ this._timestamp = timestamp }
  public get data(): Data{ return this._data }
  public set data(data: Data){ this._data = data }

  constructor(jsonData: Data){
    this._timestamp = Date.now();
    this._data.setJson(jsonData);
  }

  public toJson(): object{
    return {
      "timestamp": this._timestamp,
      "data": this._data.toJson()
    }
  }
}