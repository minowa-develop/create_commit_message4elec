import { HISTORY_FILE } from "./constants.js";
import { HistoryData } from "./history-data.js";

export class HistoryReader {
  public static async read(): Promise<HistoryData[]>{
    const rawList = await window.myAPI.readFile(HISTORY_FILE) as Array<HistoryData>;
    const historyList: Array<HistoryData> = [];
    rawList.forEach((value: HistoryData) => {
      const historyData = new HistoryData(value.data);
      historyData.timestamp = value.timestamp;
      historyList.push(historyData);
    });

    return historyList;
  }
}