import { Model } from "../../base/data/model/model.js";
import { FAVORITE_FILE } from "./constants.js";

export class FavoriteReader {
  public static async read(): Promise<Model[]>{
    return await window.ipcRenderer.readFile(FAVORITE_FILE) as Array<Model>;
  }
}