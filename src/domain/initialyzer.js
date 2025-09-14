import { FormMapper } from "../base/data/form-mapper.js";
import { Model } from "../base/data/model/model.js";
import { ElementGetter } from "../base/element-getter.js";
import { RepositorySwitcher } from "./repository/repository-switcher.js";
/**
 * 入力項目初期化
 * @returns
 */
export class Initialyzer {
    static initialize() {
        if (window.confirm('inputed data clear OK?') == false) {
            return;
        }
        ElementGetter.getInputElementById("tools").checked = true;
        RepositorySwitcher.switch();
        FormMapper.map(new Model());
        ElementGetter.getInputElementById("commit_message").value = "";
        ElementGetter.getInputElementById("import_file").value = "";
    }
}
//# sourceMappingURL=initialyzer.js.map