const HISTORY_FILE="history.json"
function registHistory() {
  const fs = require('fs');
  
  // read history
  var historyList = [];
  if(fs.existsSync(HISTORY_FILE)){
    var text = fs.readFileSync(HISTORY_FILE).toString();
    try {
      historyList = JSON.parse(text);
    }catch(e){
      // 変換できなかった際は初期値のまま
    }
  }

  // add formdata for history
  historyList.push(convHistoryObj(getObj()));

  // write history
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(historyList));
}
function convHistoryObj(formobj){
  return {
    "timestamp": Date.now(),
    "form": formobj
  }
}