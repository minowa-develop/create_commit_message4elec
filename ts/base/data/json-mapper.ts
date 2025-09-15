import { Model } from "./model/model.js";

/**
 * json型に変換
 * @returns 
 */
export class JsonMapper {
  public static map(data: Model): object{
    return {
      "documents": data.documents,
      "type": data.type,
      "subject": data.subject,
      "scope": data.scope,
      "refs": data.refs,
      "message": data.message
    }
  }
}