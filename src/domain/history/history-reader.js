import { HISTORY_FILE } from "./constants.js";
import { HistoryData } from "./history-data.js";
export class HistoryReader {
    static async read() {
        const rawList = await window.myAPI.readFile(HISTORY_FILE);
        const historyList = [];
        rawList.forEach((value) => {
            const historyData = new HistoryData(value.data);
            historyData.timestamp = value.timestamp;
            historyList.push(historyData);
        });
        return historyList;
    }
}
//# sourceMappingURL=history-reader.js.map