import { Model } from "./model/model.js";

/**
 * json型に変換
 * @returns 
 */
export class JsonMapper {
  public static map(json: Model): Model{
    const obj = new Model();
    obj.documents = json.documents;
    obj.type = json.type;
    obj.subject = json.subject;
    obj.scope = json.scope;
    obj.refs = json.refs;
    obj.message = json.message;

    return obj;
  }
}