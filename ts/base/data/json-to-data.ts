import { Model } from "./model/model.js";

/**
 * json型に変換
 * @returns 
 */
export class DateToJson {
  public setJson(data: Model, json: Model): void{
    data.documents = json.documents;
    data.type = json.type;
    data.subject = json.subject;
    data.scope = json.scope;
    data.refs = json.refs;
    data.message = json.message;
  }
}