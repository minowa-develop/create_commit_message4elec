import { FormMapper } from "../base/data/form-mapper.js";
import { ElementGetter } from "../base/element-getter.js";
import { CommitMessageCreator } from "./commit-message-creator.js";
/**
 * インポート機能
 */
export class importer {
    static import() {
        let file = ElementGetter.getInputElementById('import_file').files[0];
        //Fileオブジェクト(テキストファイル)のファイル内容を読み込む
        let reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = () => {
            // reader.result がファイルの中身
            // let obj: Data = new Data();
            // obj.setJson(JSON.parse(reader.result as string));
            const obj = JSON.parse(reader.result);
            FormMapper.map(obj);
            ElementGetter.getInputElementById("commit_message").value = CommitMessageCreator.create(obj);
            ElementGetter.getInputElementById("import_file").value = "";
        };
    }
}
//# sourceMappingURL=importer.js.map