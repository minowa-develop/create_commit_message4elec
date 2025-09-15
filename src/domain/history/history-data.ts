import { JsonMapper } from "../../base/data/json-mapper.js";
import { Model } from "../../base/data/model/model.js";

export class HistoryData {
  // fields
  private _timestamp: number;
  private _data: Model = new Model();

  // get/setter methods
  public get timestamp(): number{ return this._timestamp }
  public set timestamp(timestamp: number){ this._timestamp = timestamp }
  public get data(): Model{ return this._data }
  public set data(data: Model){ this._data = data }

  constructor(jsonData: Model){
    this._timestamp = Date.now();
    this._data = jsonData;
  }

  public toJson(): object{
    return {
      "timestamp": this._timestamp,
      "data": JsonMapper.map(this._data)
    }
  }
}