const fs = require('fs');

const HISTORY_FILE="history.json"
const MAX_HISTORY_COUNT=5;

// 履歴登録
function registHistory() {
  // read history
  var historyList = readhistoryList();

  // oldest remove
  while(historyList.length >= MAX_HISTORY_COUNT){
    historyList.shift();
  }

  // add formdata for history
  historyList.push(convHistoryObj(getObj()));

  // write history
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(historyList));
  
  // drow historylist
  showHistoryList();
}
function readhistoryList(){
  var historyList = [];
  if(fs.existsSync(HISTORY_FILE)){
    var text = fs.readFileSync(HISTORY_FILE).toString();
    try {
      historyList = JSON.parse(text);
    }catch(e){
      // 変換できなかった際は初期値のまま
    }
  }
  return historyList;
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

  // read history
  var historyList = readhistoryList();

  // reset tr
  while (table.rows.length > 0) table.deleteRow(0);

  for (var i = historyList.length-1; 0 <= i; i--) {
    let tr = document.createElement("tr");

    // timestamp
    let tdTimestamp = document.createElement("td");
    tdTimestamp.appendChild(document.createTextNode(makeTimestamp(new Date(historyList[i].timestamp))));
    tr.appendChild(tdTimestamp);

    // filename
    let filename = document.createElement("td");
    filename.appendChild(document.createTextNode(makeExportFileName(historyList[i].form)));
    tr.appendChild(filename);

    table.appendChild(tr);
  }
}
function makeTimestamp(date){
  return date.toLocaleDateString() +' '+ date.toLocaleTimeString();
}