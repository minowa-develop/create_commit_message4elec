import { Model } from "./model/model.js";

/**
 * タイトル名を返す
 * @param obj 
 * @returns 
 */
export class TitleMaker {
  public static make(data: Model): string{
    return `${data.refs}_${data.subject}`;
  }
}