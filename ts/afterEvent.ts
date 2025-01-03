import { getInputElementById,UserPolymerElement } from "./common.js";
import { Data, setFormData, getData } from "./Data.js";
import { createTypeListValues } from "./typelist.js";
import { HistoryElement } from "./history.js";
import { html } from '../node_modules/@polymer/polymer/polymer-element.js';

const historyElm = new HistoryElement();

/**
 * コミットメッセージを作成
 */
export class CreateMessageElement extends UserPolymerElement {
  static get is(){ return "create-message-element"; }
  constructor(){
    super();
    this.addEventListener('click', this.createMessage);
  }
  static get template() {
    return html`
      <style>
        :host {
          width: 100%;
          text-align: left;
          background-color:rgb(0, 197, 59);
        }
      </style>
      <button>make</button>
    `;
  }
  private createMessage(): void{
    let obj = getData();
    getInputElementById("commit_message").value = obj.makeCommitMessage();
    historyElm.registHistory();
  }
}
customElements.define(CreateMessageElement.is, CreateMessageElement);

/**
 * コミットメッセージをクリップボードにコピー
 */
export class CopyElement extends UserPolymerElement {
  static get is(){ return "copy-element"; }
  constructor(){
    super();
    this.addEventListener('click', this.copy);
  }
  static get template() {
    return html`<button>copy</button>`;
  }
  private copy(): void{
    navigator.clipboard.writeText(getInputElementById("commit_message").value);
    alert("message copied!");
  }
}
customElements.define(CopyElement.is, CopyElement);

/**
 * 初期化ボタン
 */
export class InitElement extends UserPolymerElement {
  static get is(){ return "init-element"; }
  constructor(){
    super();
    this.addEventListener('click', this.init);
  }
  static get template() {
    return html`<button>initialize</button>`;
  }
  private init(){
    if(window.confirm('inputed data clear OK?') == false){
      return null;
    }
    getInputElementById("tools").checked = true;
    createTypeListValues();
    setFormData(new Data());
    getInputElementById("commit_message").value = "";
    new ImportElement().init();
  }
}
customElements.define(InitElement.is, InitElement);

/**
 * インポートボタン
 */
export class ImportElement extends UserPolymerElement {
  static get is(){ return "import-element"; }
  constructor(){
    super();
    this.addEventListener('click', this.import);
  }
  static get template() {
    return html`<input type="file" id="import_file" accept=".txt">`;
  }
  private import(){
    let file: File = this.getElementById<HTMLInputElement>('import_file').files[0];
    //Fileオブジェクト(テキストファイル)のファイル内容を読み込む
    let reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = ()=> {
      // reader.result がファイルの中身
      let obj: Data = new Data();
      obj.setJson(JSON.parse(reader.result as string));
      setFormData(obj);
      getInputElementById("commit_message").value = obj.makeCommitMessage();
      this.init();
    }
  }
  public init(){
    this.getElementById<HTMLInputElement>('import_file').value = "";
  }
}
customElements.define(ImportElement.is, ImportElement);

/**
 * エクスポートボタン
 */
export class ExportElement extends UserPolymerElement {
  static get is(){ return "export-element"; }
  constructor(){
    super();
    this.addEventListener('click', this.export);
  }
  static get template() {
    return html`<button>export</button>`;
  }
  private export(){
    let obj = getData();
    const blob = new Blob([JSON.stringify(obj.toJson())],{type:"text/plain"});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = obj.makeTitle() +'.txt';
    link.click();
  }
}
customElements.define(ExportElement.is, ExportElement);
