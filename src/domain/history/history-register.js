import { MAX_HISTORY_COUNT, HISTORY_FILE } from "./constants.js";
import { HistoryData } from "./history-data.js";
import { HistoryReader } from "./history-reader.js";
import { HistorySetter } from "./history-setter.js";
export class historyRegister {
    static async regist(obj) {
        // read history
        let historyList = await HistoryReader.read();
        // oldest remove
        while (historyList.length >= MAX_HISTORY_COUNT) {
            historyList.shift();
        }
        // add formdata for history
        historyList.push(new HistoryData(obj));
        // write history
        await window.myAPI.writeFile(HISTORY_FILE, JSON.stringify(historyRegister.toJsonList(historyList)));
        // drow historylist
        HistorySetter.show();
    }
    static toJsonList(list) {
        let jsonList = [];
        list.forEach((value) => {
            jsonList.push(value.toJson());
        });
        return jsonList;
    }
}
//# sourceMappingURL=history-register.js.map