import { TitleMaker } from "../../base/data/title-marker.js";
import { ElementGetter } from "../../base/element-getter.js";
import { ElementSousa } from "../../base/element-sousa.js";
import { TimestampComverter } from "../../base/timestamp-converter.js";
import { HistoryData } from "./history-data.js";
import { HistoryReader } from "./history-reader.js";

export class HistorySetter {
  public static async show(){
    // read history
    let historyList: Array<HistoryData> = await HistoryReader.read();

    let table: HTMLTableElement = ElementGetter.getTableElementById('history_area');

    // reset tr
    while (table.rows.length > 0) table.deleteRow(0);

    for (let i = historyList.length-1; 0 <= i; i--) {
      let tr = document.createElement("tr");

      // timestamp
      let tdTimestamp: HTMLTableCellElement = ElementSousa.createTdElement(TimestampComverter.convTimestamp(historyList[i].timestamp));
      tr.appendChild(tdTimestamp);

      // filename
      let tdFilename: HTMLTableCellElement = ElementSousa.createTdCallSetForm(TitleMaker.make(historyList[i].data), historyList[i].data);
      tr.appendChild(tdFilename);

      table.appendChild(tr);
    }
  }
}