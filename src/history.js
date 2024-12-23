const MAX_HISTORY_COUNT=5;
const HISTORY_FILE="history.json"

// 履歴登録
async function registHistory() {
  // read history
  var historyList = await window.myAPI.readFile(HISTORY_FILE);

  // oldest remove
  while(historyList.length >= MAX_HISTORY_COUNT){
    historyList.shift();
  }

  // add formdata for history
  historyList.push(convHistoryObj(getObj()));

  // write history
  await window.myAPI.writeFile(HISTORY_FILE, JSON.stringify(historyList))

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
async function showHistoryList(){
  // read history
  var historyList = await window.myAPI.readFile(HISTORY_FILE);

  var table = document.getElementById('history_area');

  // reset tr
  while (table.rows.length > 0) table.deleteRow(0);

  for (var i = historyList.length-1; 0 <= i; i--) {
    let tr = document.createElement("tr");

    // timestamp
    let tdTimestamp = createTdElement(convTimestamp(historyList[i].timestamp));
    tr.appendChild(tdTimestamp);

    // filename
    let tdFilename = createTdCallSetForm(makeExportFileName(historyList[i].form), historyList[i].form);
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
function createTdCallSetForm(value,formObj){
  let tdElement = createTdElement(value);
  tdElement.addEventListener('click', async () => {
    setFormData(formObj);
  });
  return tdElement;
}

/** unixタイムを表示用の形式に変換 */
function convTimestamp(unixtime){
  const date = new Date(unixtime);
  return date.toLocaleDateString() +' '+ date.toLocaleTimeString();
}
