const fs = require('fs');
const HISTORY_FILE="history.json"
const MAX_HISTORY_COUNT=5;
var historyList = readFile(HISTORY_FILE);

// node側処理(ファイルio関係)
/** ファイルの内容をjsonに変換して返す */
function readFile(file){
  const fs = require('fs');
  var historyList = [];
  if(fs.existsSync(file)){
    var text = fs.readFileSync(file).toString();
    try {
      historyList = JSON.parse(text);
    }catch(e){
      // 変換できなかった際は初期値(空配列)のまま
    }
  }
  return historyList;
}
function writeFile(file, data){
  fs.writeFileSync(file, data);
}

// 履歴登録
function registHistory() {
  // oldest remove
  while(historyList.length >= MAX_HISTORY_COUNT){
    historyList.shift();
  }

  // add formdata for history
  historyList.push(convHistoryObj(getObj()));

  // write history
  writeFile(HISTORY_FILE, JSON.stringify(historyList))

  // drow historylist
  showHistoryList();
}
function convHistoryObj(formobj){
  return {
    "timestamp": Date.now(),
    "form": formobj
  }
}

// 履歴リスト表示
function showHistoryList(){
  var table = document.getElementById('history_area');

  // reset tr
  while (table.rows.length > 0) table.deleteRow(0);

  for (var i = historyList.length-1; 0 <= i; i--) {
    let tr = document.createElement("tr");

    // timestamp
    let tdTimestamp = createTdElement(convTimestamp(historyList[i].timestamp));
    tr.appendChild(tdTimestamp);

    // filename
    let tdFilename = createTdElementExtends(makeExportFileName(historyList[i].form), 'onclick', 'callHistory', i);
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

/** valueを表示し、イベントを追加したtd要素を作成 */
function createTdElementExtends(value,event,func,index){
  let tdElement = createTdElement(value);
  tdElement.setAttribute(event, func +'('+ index +')');
  return tdElement;
}

/** unixタイムを表示用の形式に変換 */
function convTimestamp(unixtime){
  const date = new Date(unixtime);
  return date.toLocaleDateString() +' '+ date.toLocaleTimeString();
}

// 履歴呼び出し
function callHistory(index){
  setFormData(historyList[index].form);
}
