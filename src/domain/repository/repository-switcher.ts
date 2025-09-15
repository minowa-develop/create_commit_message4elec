import { ElementGetter } from "../../base/element-getter.js";
import { ElementSousa } from "../../base/element-sousa.js";
import { DOCUMENT_TYPE_LIST, TOOL_TYPE_LIST } from "../typelist/constants.js";
import { TypelistCreator } from "../typelist/typelist-creator.js";

export class RepositorySwitcher{
  // repository選択時、typeリスト作成
  public static switch(): void{
    ElementSousa.clearChildElement("types");
    const documentsElm = ElementGetter.getInputElementById("documents");
    if (documentsElm.checked) {
      TypelistCreator.create(DOCUMENT_TYPE_LIST);
    } else {
      TypelistCreator.create(TOOL_TYPE_LIST);
    }
  }
}