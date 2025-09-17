import { FormMapper } from "../base/data/form-mapper.js";
import { ElementGetter } from "../base/element-getter.js";
import { CommitMessageCreator } from "./commit-message-creator.js";

/**
 * インポート機能
 */
export class Importer {
  public static import(): void{
    const inputElement = ElementGetter.getInputElementById('import_file');
    const file: File | null = inputElement && inputElement.files ? inputElement.files[0] : null;
    if (file == null) {
      return;
    }
    //Fileオブジェクト(テキストファイル)のファイル内容を読み込む
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = ()=> {
      // reader.result がファイルの中身
      const obj = JSON.parse(reader.result as string);
      FormMapper.map(obj);
      ElementGetter.getInputElementById("commit_message").value = CommitMessageCreator.create(obj)
      ElementGetter.getInputElementById("import_file").value = "";
    }
  }
}