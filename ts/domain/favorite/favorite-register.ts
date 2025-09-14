import { JsonMapper } from "../../base/data/json-mapper.js";
import { Model } from "../../base/data/model/model.js";
import { FAVORITE_FILE } from "./constants.js";
import { FavoriteReader } from "./favorite-reader.js";
import { FavoriteSetter } from "./favorite-setter.js";

export class FavoriteRegister {
  public static async regist(obj: Model){
    // read history
    const favoriteList: Model[] = await FavoriteReader.read();

    // add formdata for history
    favoriteList.push(JsonMapper.map(obj));

    // write history
    await window.myAPI.writeFile(FAVORITE_FILE, JSON.stringify(favoriteList));

    // drow favoriteList
    FavoriteSetter.show();
  }
}