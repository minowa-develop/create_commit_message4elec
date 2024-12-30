// typeList
const toolTypeList = ["feat","fix","docs","style","refactor","perf","test","chore"];
const documentTypeList = ["add","remove","rename","update"];

import { getInputElementById,getSelectElementById,clearChildElement,uncheckChildElement } from './common.js';

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

/**
 * ラジオボタンを選択状態にする
 * @param checkedDocuments 
 */
export function setRepositories(checkedDocuments: boolean){
  uncheckChildElement("repositories");
  if(checkedDocuments){
    getInputElementById("documents").checked = true;
  }else{
    getInputElementById("tools").checked = true;
  }
}

/**
 * 対象のtypeを選択状態にする
 * @param selectedValue 
 */
export function selectType(selectedValue): void{
  let select_childs: HTMLSelectElement = getSelectElementById("types");
  for(let i=0;i<select_childs.length;i++){
    let child: HTMLOptionElement = select_childs.children[i] as HTMLOptionElement;
    if(child.value == selectedValue){
      child.selected=true;
      break;
    }
  }
}