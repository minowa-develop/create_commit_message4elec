// typeList
const toolTypeList = ["feat","fix","docs","style","refactor","perf","test","chore"];
const documentTypeList = ["add","remove","rename","update"];

import { clearChildElement } from './DomAccess.js';

// repository選択時、typeリスト作成
export function createTypeListValues(){
  clearChildElement("types");
  let documentsElem = document.getElementById("documents") as HTMLInputElement;
  if(documentsElem.checked){
    createTypeList(documentTypeList);
  }else{
    createTypeList(toolTypeList);
  }
}
function createTypeList(typeListArr: string[]){
  typeListArr.forEach((elem, index) => {
    var option = document.createElement("option");
    option.text = elem;
    option.value = elem;
    option.selected = false;
    if(index == 0){
      option.selected = true;
    }

    let select = document.getElementById("types");
    select.appendChild(option);
  });
}
