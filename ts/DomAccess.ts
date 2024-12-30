import * as Common from "./common.js";
import { Data } from "./Data.js";
import { createTypeListValues, setRepositories,selectType } from "./typelist.js";

// DOM to Object
export function getData(): Data{
  let data: Data = new Data();
  data.documents = Common.getInputElementById("documents").checked;
  data.type = selectedType();
  data.subject = Common.getInputElementById("subject").value;
  data.scope = Common.getInputElementById("scope").value;
  data.refs = Common.getInputElementById("refs").value;
  data.message = Common.getInputElementById("message").value;
  return data;
}

function selectedRepository(): string{
  return "";
}
function selectedType(): string{
  return Common.getSelectedChildElement("types").value;
}

/**
 * object情報をform(DOM)にセット
 * @param obj 
 */
export function setFormData(obj: Data): void{
  setRepositories(obj.documents);
  createTypeListValues();
  selectType(obj.type);
  Common.getInputElementById("subject").value = obj.subject;
  Common.getInputElementById("scope").value = obj.scope;
  Common.getInputElementById("refs").value = obj.refs;
  Common.getInputElementById("message").value = obj.message;
}

