import { Model } from "../../base/data/model/model.js";
export class HistoryData {
    // fields
    _timestamp;
    _data = new Model();
    // get/setter methods
    get timestamp() { return this._timestamp; }
    set timestamp(timestamp) { this._timestamp = timestamp; }
    get data() { return this._data; }
    set data(data) { this._data = data; }
    constructor(jsonData) {
        this._timestamp = Date.now();
        this._data = jsonData;
    }
    toJson() {
        return {
            "timestamp": this._timestamp,
            "data": this._data
        };
    }
}
//# sourceMappingURL=history-data.js.map