import { Model } from "./base/data/model/model.js";
import { HistoryData } from "./domain/history/history-data.js";


// electron preload
interface MyAPI {
  readFile: (filePath: string) => Promise<string[] | string | Array<HistoryData> | Array<Model>>;
  writeFile: (filePath: string, data: string) => Promise<string>;
}
declare global { interface Window { myAPI: MyAPI; } }