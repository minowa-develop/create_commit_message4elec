import { getInputElementById, } from "./common.js";
import { Data, setFormData, getData } from "./Data.js";
import { createTypeListValues } from "./typelist.js";
import { showHistoryList } from "./history.js";

/**
 * コミットメッセージ作成などの処理を行う
 */
export function createMessage():void{
  var obj = getData();
  getInputElementById("commit_message").value = obj.makeCommitMessage();
  showHistoryList();
}

/**
 * 作成したコミットメッセージをコピーする
 */
export function copy(): void{
  navigator.clipboard.writeText(getInputElementById("commit_message").value);
  alert("message copied!");
}

/**
 * 入力項目初期化
 * @returns 
 */
export function initialize(): void{
  if(window.confirm('inputed data clear OK?') == false){
    return null;
  }
  getInputElementById("tools").checked = true;
  createTypeListValues();
  setFormData(new Data());
  getInputElementById("commit_message").value = "";
  getInputElementById("import_file").value = "";
}

/**
 * インポート機能
 */
export function importData(): void{
  let file: File = getInputElementById('import_file').files[0];
  //Fileオブジェクト(テキストファイル)のファイル内容を読み込む
  let reader = new FileReader();
  reader.readAsText(file, 'UTF-8');
  reader.onload = ()=> {
    // reader.result がファイルの中身
    let obj: Data = new Data();
    obj.setJson(JSON.parse(reader.result as string));
    setFormData(obj);
    getInputElementById("commit_message").value = obj.makeCommitMessage();
    getInputElementById("import_file").value = "";
  }
}

export function exportData(): void{
  let obj = getData();
  const blob = new Blob([JSON.stringify(obj.toJson())],{type:"text/plain"});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = obj.makeTitle() +'.txt';
  link.click();
}