const TypeList = require('./typeList.js');
const FormObj = require('./formObj.js');

window.onload = function() {
  // load post method
  var typeList = new TypeList();
  typeList.drowTypeList();
  // showHistoryList();
  // showFavoriteList();
}

// after methods
function copy() {
  navigator.clipboard.writeText(document.getElementById("commit_message").value);
  alert("message copied!");
}
function initialize() {
  var formObj = new FormObj();
  var typeList = new TypeList();
  typeList.drowTypeList();
}

// export
function exportData(){
  var formObj = new FormObj();
  const blob = new Blob([ formObj.toJsonString() ],{type:"text/plain"});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = formObj.makeExportFileName() +'.txt';
  link.click();
}

// import
function importData() {
  var file = document.getElementById('import_file').files[0];
  //Fileオブジェクト(テキストファイル)のファイル内容を読み込む
  let reader = new FileReader();
  reader.readAsText(file, 'UTF-8');
  reader.onload = ()=> {
    // reader.result がファイルの中身
    var formObj = new FormObj();
    formObj.setJson(JSON.parse(reader.result));
    formObj.createMessage();
    document.getElementById("import_file").value = "";
  }
}
