import { ElementGetter } from "../../base/element-getter.js";

export class TypeSelector {
  /**
   * 対象のtypeを選択状態にする
   * @param selectedValue
   */
  public static select(selectedValue: string): void{
    const selectElm = ElementGetter.getSelectElementById("types");
    
    Array.from(selectElm.children).forEach((child: HTMLOptionElement) => {
      if(child.value == selectedValue){
        child.selected = true;
      }      
    });
  }
}