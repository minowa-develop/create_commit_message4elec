import { TD_TAG_ID, SELECT_TAG_ID, Id } from "./constants.js";
import { Model } from "./data/model/model.js";
import { FormMapper } from "./data/form-mapper.js";
import { ElementGetter } from "./element-getter.js";

export class ElementSousa {
  /** valueを表示するtd要素を作成 */
  public static createTdElement(value: string): HTMLTableCellElement{
    let tdElement = document.createElement("td");
    tdElement.appendChild(document.createTextNode(value));
    return tdElement;
  }
  
  /** valueを表示するボタン要素を作成 */
  public static createButtonElement(value: string): HTMLInputElement{
    let elm = document.createElement("input");
    elm.type = "button";
    elm.value = value;
    return elm;
  }
  
  /** valueを表示し、form情報をセットするイベントを追加したtd要素を作成 */
  public static createTdCallSetForm(value: string, obj: Model): HTMLTableCellElement{
    let tdElement: HTMLTableCellElement = ElementSousa.createTdElement(value);
    tdElement.className = "pointer";
    tdElement.addEventListener('click', async () => {
      FormMapper.map(obj);
    });
    return tdElement;
  }
    
  /**
   * 指定したIDの子要素を削除
   * @param id 
   */
  public static clearChildElement(id: TD_TAG_ID|SELECT_TAG_ID): void{
    let element: HTMLElement = ElementGetter.getElementById(id);
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
  
  /**
   * 指定したIDの子要素をすべてuncheck状態にする
   * @param id 
   */
  public static uncheckChildElement(id: Id): void{
    let element: HTMLInputElement = ElementGetter.getElementById(id);
    element.childNodes.forEach((child: HTMLInputElement)=>{
      child.checked = false;
    });
  }
}