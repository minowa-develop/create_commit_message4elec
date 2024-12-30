import { Data, setFormData } from "./Data.js";
import { HistoryData } from './history.js'

export type INPUT_TAG_ID = "documents"|"tools"|"subject"|"scope"|"refs"|"message"|"commit_message"|"import_file";
export type TD_TAG_ID = "repositories";
export type SELECT_TAG_ID = "types";
export type RADIO_TAG_ID = "tools"|"documents";
export type TABLE_TAG_ID = "history_area"|"favorite_area"
export type EVENT_ID = "createMessage"|"copy"|"initialize"|"exportData"|"import_file"|"favoriteRegist";
export type Id = INPUT_TAG_ID|EVENT_ID|SELECT_TAG_ID|TD_TAG_ID|TABLE_TAG_ID|RADIO_TAG_ID
export type NAME = "repository"|"type"

// 存在しないIDを指定していた場合は例外を出力する
export function getElementById<T extends HTMLElement>(id: Id): T{
  let element: HTMLElement|null = document.getElementById(id);
  if(element === null){
      throw new Error("parentId: "+ this.parentId +" is null.");
  }
  return element as T;
}

export function getSelectElementById(id: SELECT_TAG_ID): HTMLSelectElement{
  return getElementById<HTMLSelectElement>(id);
}
export function getTdElementById(id: TD_TAG_ID): HTMLTableCellElement{
  return getElementById<HTMLTableCellElement>(id);
}
export function getInputElementById(id: INPUT_TAG_ID): HTMLInputElement{
  return getElementById<HTMLInputElement>(id);
}
export function getTableElementById(id: TABLE_TAG_ID): HTMLTableElement{
  return getElementById<HTMLTableElement>(id);
}

// electron preload
interface MyAPI {
  readFile: (filePath: string) => Promise<string[]|string|Array<HistoryData>|Array<Data>>;
  writeFile: (filePath: string, data: string) => Promise<string>;
}
declare global { interface Window { myAPI: MyAPI; } }


/** valueを表示するtd要素を作成 */
export function createTdElement(value: string): HTMLTableCellElement{
  let tdElement = document.createElement("td");
  tdElement.appendChild(document.createTextNode(value));
  return tdElement;
}

/** valueを表示するボタン要素を作成 */
export function createButtonElement(value: string): HTMLInputElement{
  let elm = document.createElement("input");
  elm.type = "button";
  elm.value = value;
  return elm;
}

/**
 * クリックイベント付きのtdを作成
 * @param value 表示メッセージ
 * @param callFunc クリック時の関数
 * @returns 
 */
export function createTdEventForm(value: string, callFunc: Function): HTMLTableCellElement{
  let tdElement: HTMLTableCellElement = createTdElement(value);
  tdElement.addEventListener('click', async () => {callFunc});
  return tdElement;
}

/** valueを表示し、form情報をセットするイベントを追加したtd要素を作成 */
export function createTdCallSetForm(value: string, obj: Data): HTMLTableCellElement{
  let tdElement: HTMLTableCellElement = createTdElement(value);
  tdElement.addEventListener('click', async () => {
    setFormData(obj);
  });
  return tdElement;
}

/** unixタイムを表示用の形式に変換 */
export function convTimestamp(unixtime: number): string{
  const date: Date = new Date(unixtime);
  return date.toLocaleDateString() +' '+ date.toLocaleTimeString();
}

/**
 * 指定したIDの子要素を削除
 * @param id 
 */
export function clearChildElement(id: TD_TAG_ID|SELECT_TAG_ID): void{
  let element: HTMLElement = getElementById(id);
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * 指定したIDの子要素をすべてuncheck状態にする
 * @param id 
 */
export function uncheckChildElement(id: Id): void{
  let element: HTMLInputElement = getElementById(id);
  element.childNodes.forEach((child: HTMLInputElement)=>{
    child.checked = false;
  });
}

/**
 * 指定したIDの子要素の中で選択状態の要素を返す
 * @param id 
 * @returns 
 */
export function getSelectedChildElement(id: SELECT_TAG_ID): HTMLOptionElement{
  let element: HTMLSelectElement = getSelectElementById(id);
  let ckeckedElement: HTMLOptionElement;
  element.childNodes.forEach((child: HTMLOptionElement)=>{
    if(child.selected){
      ckeckedElement = child;
    }
  });
  return ckeckedElement;
}