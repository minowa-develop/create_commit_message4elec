import { ElementGetter } from "../../base/element-getter.js";
export class TypeSelector {
    /**
     * 対象のtypeを選択状態にする
     * @param selectedValue
     */
    static select(selectedValue) {
        const selectElm = ElementGetter.getSelectElementById("types");
        Array.from(selectElm.children).forEach((child) => {
            if (child.value == selectedValue) {
                child.selected = true;
            }
        });
    }
}
//# sourceMappingURL=type-selector.js.map