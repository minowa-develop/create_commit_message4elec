import { Data } from "./Data.js";
import { getData,setFormData } from './DomAccess.js';
import { getTableElementById,createTdElement,createTdCallSetForm,convTimestamp } from "./common.js";

const MAX_HISTORY_COUNT=5;
const HISTORY_FILE="history.json"

// 履歴登録
export async function registHistory(){
  // read history
  let historyList: string[] = await window.myAPI.readFile(HISTORY_FILE) as string[];

  // oldest remove
  while(historyList.length >= MAX_HISTORY_COUNT){
    historyList.shift();
  }

  // add formdata for history
  historyList.push(JSON.stringify(new HistoryData(getData()).toJson()));

  // write history
  await window.myAPI.writeFile(HISTORY_FILE, JSON.stringify(historyList))

  // drow historylist
  showHistoryList();
}
class HistoryData {
  // fields
  timestamp: number;
  data: Data;

  constructor(data: Data){
    this.data = data;
  }

  public toJson(): object{
    return {
      "timestamp": Date.now(),
      "data": this.data.toJson()
    }
  }
}

// 履歴リスト表示
async function showHistoryList(){
  // read history
  let historyList: HistoryData[] = JSON.parse(await window.myAPI.readFile(HISTORY_FILE) as string) as HistoryData[];

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

