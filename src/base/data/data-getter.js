import { ElementGetter } from "../element-getter.js";
import { Model } from "./model/model.js";
/**
 * Domからobject情報を取得
 * @returns
 */
export class DataGetter {
    static get() {
        const data = new Model();
        data.documents = ElementGetter.getInputElementById("documents").checked;
        data.type = ElementGetter.getSelectedChildElement("types").value;
        data.subject = ElementGetter.getInputElementById("subject").value;
        data.scope = ElementGetter.getInputElementById("scope").value;
        data.refs = ElementGetter.getInputElementById("refs").value;
        data.message = ElementGetter.getInputElementById("message").value;
        return data;
    }
}
//# sourceMappingURL=data-getter.js.map