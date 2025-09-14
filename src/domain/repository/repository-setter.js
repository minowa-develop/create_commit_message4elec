import { ElementGetter } from "../../base/element-getter.js";
import { ElementSousa } from "../../base/element-sousa.js";
import { RepositorySwitcher } from "./repository-switcher.js";
/**
 * ラジオボタンを選択状態にする
 * @param checkedDocuments
 */
export class RepositorySetter {
    static set(checkedDocuments) {
        ElementSousa.uncheckChildElement("repositories");
        if (checkedDocuments) {
            ElementGetter.getInputElementById("documents").checked = true;
        }
        else {
            ElementGetter.getInputElementById("tools").checked = true;
        }
        RepositorySwitcher.switch();
    }
}
//# sourceMappingURL=repository-setter.js.map