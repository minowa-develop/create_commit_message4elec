import * as Common from "./common.js";
import { Types } from "./Types.js";
import { Data } from "./Data.js";

// DOM to Object
export function getData(): Data{
  let data: Data = new Data();
  // data.repository = selectedRepository();
  data.type = selectedType();
  data.subject = Common.getInputElementById("subject").value;
  data.scope = Common.getInputElementById("scope").value;
  data.refs = Common.getInputElementById("refs").value;
  data.message = Common.getInputElementById("message").value;
  return data;
}

function selectedRepository(): string{
  return "";
}
function selectedType(): string{
  return "";
}

/**
 * object情報をform(DOM)にセット
 * @param obj 
 */
export function setFormData(obj: Data): void{
  // repositories
  // let settingTypes: Types = createRepositories(readRepositories(), obj.repository);

  // types
  // createTypes(settingTypes.getTypes());

  selectType(obj.type);
  Common.getInputElementById("subject").value = obj.subject;
  Common.getInputElementById("scope").value = obj.scope;
  Common.getInputElementById("refs").value = obj.refs;
  Common.getInputElementById("message").value = obj.message;
}


function selectType(selectedValue): void{
  let select_childs: HTMLSelectElement = Common.getSelectElementById("types");
  for(let i=0;i<select_childs.length;i++){
    let child: HTMLOptionElement = select_childs.children[i] as HTMLOptionElement;
    if(child.value == selectedValue){
      child.selected=true;
      break;
    }
  }
}

/**
 * DOMにrepositoriesとtypesを追加します
 */
function createRepoAndTypes(): void{
  let selectedRepository: string = getSelectedChildElement("repositories").value;

  // repositories
  clearChildElement("repositories");
  let settingTypes: Types = createRepositories(readRepositories(), selectedRepository);

  // types
  clearChildElement("types");
  createTypes(settingTypes.getTypes());
}

/**
 * DOMにrepositoriesを作成する
 * 選択されたrepositoryを元にtypesを返す
 * @param repositories 
 * @param selectedRepository 
 * @returns 
 */
function createRepositories(repositories: Types[], selectedRepository: String|null): Types{
  let element: HTMLTableCellElement = Common.getTdElementById("repositories");
  clearChildElement("repositories");

  let useFirstRepository: boolean;
  if(selectedRepository instanceof null){
    useFirstRepository = true;
  }

  let settingTypes: Types;
  repositories.forEach((elem: Types, index) => {
    let checked: boolean;
    if((useFirstRepository && index == 0) || elem.getRepository()===selectedRepository){
      checked = true;
      settingTypes = elem;
    }
    element.appendChild(createRadioElement(elem.getRepository(), checked));
  });
  return settingTypes;
}

/**
 * jsonからrepositoriesを取得する
 * @returns 
 */
function readRepositories(): Types[]{
  const JSON_FILE: string = "./typelist.json";
  let objs: Types[];
  window.myAPI.readFile(JSON_FILE).then((plaintext: string) => {
    objs = JSON.parse(plaintext)
  });
  return objs;
}

/**
 * DOMにtypeの配列内容をセット
 * @param typeListArr 
 */
function createTypes(typeListArr: string[]): void{
  let select: HTMLSelectElement = Common.getSelectElementById("types");
  clearChildElement("types");
  typeListArr.forEach((elem, index) => {
    let selected: boolean = false;
    if(index == 0){
      selected = true;
    }
    select.appendChild(createOptionElement(elem, selected));
  });
}

/**
 * optionタグを作成して返す
 * @param value 
 * @param selected 
 * @returns 
 */
function createOptionElement(value: string, selected: boolean): HTMLOptionElement {
  var option: HTMLOptionElement = document.createElement("option");
  option.text = value;
  option.value = value;
  option.id = value;
  option.selected = selected;
  return option;
}

/**
 * ラジオボタン要素を作成して返す
 * @param value 
 * @param checked 
 * @returns 
 */
function createRadioElement(value: string, checked: boolean): HTMLInputElement {
  const radio = document.createElement('input');
  radio.type = 'radio';
  radio.value = value;
  radio.id = value;
  radio.checked = checked;
  radio.addEventListener('click', async () => {
    createRepoAndTypes();
  });
  return radio;
}


// 汎用
/**
 * 子要素で選択済みのoption要素を返す
 * @param id 
 * @returns 
 */
function getSelectedChildElement(id: Common.TD_TAG_ID|Common.SELECT_TAG_ID): HTMLOptionElement{
  let element: HTMLElement = Common.getElementById(id);

  let selectedElement: HTMLOptionElement;
  element.childNodes.forEach((child: HTMLOptionElement)=>{
    if(child.selected){
      selectedElement = child;
    }
  });
  return selectedElement;
}

/**
 * 指定したIDの子要素を削除
 * @param id 
 */
export function clearChildElement(id: Common.TD_TAG_ID|Common.SELECT_TAG_ID): void{
  let element: HTMLElement = Common.getElementById(id);
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function uncheckChildElement(id: Common.Id): void{
  let element: HTMLInputElement = Common.getElementById(id);
  element.childNodes.forEach((child: HTMLElement)=>{
    element.checked = false;
  });
}