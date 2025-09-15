import { RepositorySetter } from "../../domain/repository/repository-setter.js";
import { TypeSelector } from "../../domain/typelist/type-selector.js";
import { ElementGetter } from "../element-getter.js";
import { Model } from "./model/model.js";

/**
 * Domからobject情報を取得
 * @returns 
 */
export class FormMapper {
  public static map(obj: Model): void{
    RepositorySetter.set(obj.documents);
    TypeSelector.select(obj.type);
    ElementGetter.getInputElementById("subject").value = obj.subject;
    ElementGetter.getInputElementById("scope").value = obj.scope;
    ElementGetter.getInputElementById("refs").value = obj.refs;
    ElementGetter.getInputElementById("message").value = obj.message;
  }
}