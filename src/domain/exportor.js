import { DataGetter } from "../base/data/data-getter.js";
import { DateToJson } from "../base/data/date-to-json.js";
import { TitleMaker } from "../base/data/title-marker.js";
export class Exportor {
    static export() {
        const obj = DataGetter.get();
        const blob = new Blob([JSON.stringify(DateToJson.toJson(obj))], { type: "text/plain" });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${TitleMaker.make(obj)}.txt`;
        link.click();
    }
}
//# sourceMappingURL=exportor.js.map