import { TitleMaker } from "../../base/data/title-marker.js";
import { ElementGetter } from "../../base/element-getter.js";
import { ElementSousa } from "../../base/element-sousa.js";
import { TimestampComverter } from "../../base/timestamp-converter.js";
import { HistoryReader } from "./history-reader.js";
export class HistorySetter {
    static async show() {
        // read history
        let historyList = await HistoryReader.read();
        let table = ElementGetter.getTableElementById('history_area');
        // reset tr
        while (table.rows.length > 0)
            table.deleteRow(0);
        for (let i = historyList.length - 1; 0 <= i; i--) {
            let tr = document.createElement("tr");
            // timestamp
            let tdTimestamp = ElementSousa.createTdElement(TimestampComverter.convTimestamp(historyList[i].timestamp));
            tr.appendChild(tdTimestamp);
            // filename
            let tdFilename = ElementSousa.createTdCallSetForm(TitleMaker.make(historyList[i].data), historyList[i].data);
            tr.appendChild(tdFilename);
            table.appendChild(tr);
        }
    }
}
//# sourceMappingURL=history-setter.js.map