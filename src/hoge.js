// typeList
const toolTypeList = ["feat","fix","docs","style","refactor","perf","test","chore"];
const documentTypeList = ["add","remove","rename","update"];

window.onload = function() {
  // load post method
  createTypeListValues();
  showHistoryList();
  showFavoriteList();
}

// repository選択時、typeリスト作成
function createTypeListValues(){
  clearTypeList("type");
  if(document.getElementById("documents").checked){
    createTypeList(documentTypeList);
  }else{
    createTypeList(toolTypeList);
  }
}
function createTypeList(typeListArr){
  typeListArr.forEach((elem, index) => {
    addOption(elem, index);
  });
}
function addOption(value,index) {
  if(index == 0){
    option.selected = true;
  }
  var select = document.getElementById("type");
  let option = new Option(text, value, defaultSelected);
  select.appendChild(option);
}
function clearTypeList(optionId) {
  select_childs = document.getElementById(optionId);
  while(0 < select_childs.length){
    select_childs.remove(0);
  }
}

// メッセージ作成
function createMessage(){
  document.getElementById("commit_message").value = createHeader() +"\r\n\r\n"+ document.getElementById("message").value +"\r\n\r\n"+ createRefs();
}
function createHeader(){
  return getTypeValue() + createScope() +": "+ document.getElementById("subject").value;
}
function getTypeValue(){
  var type = document.getElementById("type");
  var index = type.selectedIndex;
  return type.options[index].value;
}
function createScope(){
  var scope = document.getElementById("scope").value;
  if(scope == ""){
    return "";
  }
  return "("+ scope +")";
}
function createRefs(){
  return "Refs: #"+ document.getElementById("refs").value;
}


// after methods
function copy() {
  navigator.clipboard.writeText(document.getElementById("commit_message").value);
  alert("message copied!");
}
function initialize() {
  if(window.confirm('inputed data clear OK?') == false){
    return null;
  }
  document.getElementById("tools").checked = true;
  createTypeListValues();
  document.getElementById("scope").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("message").value = "";
  document.getElementById("refs").value = "";
  document.getElementById("commit_message").value = "";
  document.getElementById("import_file").value = "";
}

function getObj(){
  return {
    "documents": document.getElementById("documents").checked,
    "type": getTypeValue(),
    "subject": document.getElementById("subject").value,
    "scope": document.getElementById("scope").value,
    "refs": document.getElementById("refs").value,
    "message": document.getElementById("message").value
  }
}

// export
function exportData(){
  var obj = getObj();
  const blob = new Blob([ JSON.stringify(obj)],{type:"text/plain"});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = makeExportFileName(obj) +'.txt';
  link.click();
}
function makeExportFileName(obj){
  return obj.refs +'_'+ obj.subject;
}

// import
function importData() {
  var file = document.getElementById('import_file').files[0];
  //Fileオブジェクト(テキストファイル)のファイル内容を読み込む
  let reader = new FileReader();
  reader.readAsText(file, 'UTF-8');
  reader.onload = ()=> {
    // reader.result がファイルの中身
    setFormData(JSON.parse(reader.result));
    createMessage();
    document.getElementById("import_file").value = "";
  }
}
function setFormData(obj){
  document.getElementById("tools").checked = true;
  if(obj.documents){
    document.getElementById("documents").checked = true;
  }
  createTypeListValues();
  selectOption("type", obj.type);
  document.getElementById("subject").value = obj.subject;
  document.getElementById("scope").value = obj.scope;
  document.getElementById("refs").value = obj.refs;
  document.getElementById("message").value = obj.message;
}
function selectOption(optionId,value){
  select_childs = document.getElementById(optionId);
  for(let i=0;i<select_childs.length;i++){
    var child = select_childs.children[i];
    if(child.value == value){
      child.selected=true;
      return null;
    }
  }
}