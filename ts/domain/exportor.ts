import { DataGetter } from "../base/data/data-getter.js";
import { TitleMaker } from "../base/data/title-marker.js";

export class Exportor {
  public static export(): void{
    const obj = DataGetter.get();
    const blob = new Blob([JSON.stringify(obj)],{type:"text/plain"});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${TitleMaker.make(obj)}.txt`;
    link.click();
  }
}