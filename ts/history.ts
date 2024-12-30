import { Data } from "./Data.js";
import { getData } from './DomAccess.js';
import { getTableElementById,createTdElement,createTdCallSetForm,convTimestamp } from "./common.js";

const MAX_HISTORY_COUNT=5;
const HISTORY_FILE="history.json"

// 履歴登録
export async function registHistory(){
  // read history
  let historyList: Array<HistoryData> = jsonListToHistoryList(await window.myAPI.readFile(HISTORY_FILE) as Array<HistoryData>);

  // oldest remove
  while(historyList.length >= MAX_HISTORY_COUNT){
    historyList.shift();
  }

  // add formdata for history
  historyList.push(new HistoryData(getData()));

  // write history
  await window.myAPI.writeFile(HISTORY_FILE, JSON.stringify(toJsonList(historyList)))

  // drow historylist
  showHistoryList();
}

/**
 * jsonListをHistoryDataListに変換
 * @param rawList 
 * @returns 
 */
function jsonListToHistoryList(rawList: Array<HistoryData>): Array<HistoryData>{
  let historyList: Array<HistoryData> = [];
  rawList.forEach((value: HistoryData) => {
    let historyData = new HistoryData(value.data);
    historyData.timestamp = value.timestamp;
    historyList.push(historyData);
  });
  return historyList;
}

function toJsonList(list: Array<HistoryData>): object[]{
  let jsonList: object[] = [];
  list.forEach((value: HistoryData) => {
    jsonList.push(value.toJson());
  });
  return jsonList;
}

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

// 履歴リスト表示
export async function showHistoryList(){
  // read history
  let historyList: Array<HistoryData> = jsonListToHistoryList(await window.myAPI.readFile(HISTORY_FILE) as Array<HistoryData>);

  let table: HTMLTableElement = getTableElementById('history_area');

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

