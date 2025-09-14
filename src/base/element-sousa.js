import { FormMapper } from "./data/form-mapper.js";
import { ElementGetter } from "./element-getter.js";
export class ElementSousa {
    /** valueを表示するtd要素を作成 */
    static createTdElement(value) {
        let tdElement = document.createElement("td");
        tdElement.appendChild(document.createTextNode(value));
        return tdElement;
    }
    /** valueを表示するボタン要素を作成 */
    static createButtonElement(value) {
        let elm = document.createElement("input");
        elm.type = "button";
        elm.value = value;
        return elm;
    }
    /** valueを表示し、form情報をセットするイベントを追加したtd要素を作成 */
    static createTdCallSetForm(value, obj) {
        let tdElement = ElementSousa.createTdElement(value);
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
    static clearChildElement(id) {
        let element = ElementGetter.getElementById(id);
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    /**
     * 指定したIDの子要素をすべてuncheck状態にする
     * @param id
     */
    static uncheckChildElement(id) {
        let element = ElementGetter.getElementById(id);
        element.childNodes.forEach((child) => {
            child.checked = false;
        });
    }
}
//# sourceMappingURL=element-sousa.js.map