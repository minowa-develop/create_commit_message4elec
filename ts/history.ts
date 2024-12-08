import { Data } from "./Data";
import { getData,setFormData } from './DomAccess';
import { getTableElementById } from "./common";

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
      "data": this.data
    }
  }
  
  public setJson
}

// 履歴リスト表示
async function showHistoryList(){
  // read history
  let historyList: string[] = await window.myAPI.readFile(HISTORY_FILE) as string[];

  let table: HTMLTableElement = getTableElementById('history_area');

  // reset tr
  while (table.rows.length > 0) table.deleteRow(0);

  for (let i = historyList.length-1; 0 <= i; i--) {
    let tr = document.createElement("tr");

    // timestamp
    let tdTimestamp = createTdElement(convTimestamp(historyList[i].timestamp));
    tr.appendChild(tdTimestamp);

    // filename
    let tdFilename = createTdCallSetForm(historyList[i].data.makeTitle(), historyList[i].data);
    tr.appendChild(tdFilename);

    table.appendChild(tr);
  }
}

/** valueを表示するtd要素を作成 */
function createTdElement(value){
  let tdElement = document.createElement("td");
  tdElement.appendChild(document.createTextNode(value));
  return tdElement;
}

/** valueを表示し、form情報をセットするイベントを追加したtd要素を作成 */
function createTdCallSetForm(value: string,obj: Data): HTMLTableCellElement{
  let tdElement: HTMLTableCellElement = createTdElement(value);
  tdElement.addEventListener('click', async () => {
    setFormData(obj);
  });
  return tdElement;
}

/** unixタイムを表示用の形式に変換 */
function convTimestamp(unixtime: number): string{
  const date = new Date(unixtime);
  return date.toLocaleDateString() +' '+ date.toLocaleTimeString();
}
