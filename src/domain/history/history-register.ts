import { Model } from "../../base/data/model/model.js";
import { MAX_HISTORY_COUNT, HISTORY_FILE } from "./constants.js";
import { HistoryData } from "./history-data.js";
import { HistoryReader } from "./history-reader.js";
import { HistorySetter } from "./history-setter.js";

export class HistoryRegister {
  public static async regist(obj: Model){
    // read history
    const historyList: Array<HistoryData> = await HistoryReader.read();
  
    // oldest remove
    while(historyList.length >= MAX_HISTORY_COUNT){
      historyList.shift();
    }
  
    // add formdata for history
    historyList.push(new HistoryData(obj));
  
    // write history
    await window.myAPI.writeFile(HISTORY_FILE, JSON.stringify(HistoryRegister.toJsonList(historyList)));
  
    // drow historylist
    HistorySetter.show();
  }

  private static toJsonList(list: Array<HistoryData>): object[]{
    let jsonList: object[] = [];
    list.forEach((value: HistoryData) => {
      jsonList.push(value.toJson());
    });
    return jsonList;
  }
}