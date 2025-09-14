import { Model } from "../base/data/model/model.js";

export class CommitMessageCreator {
  public static create(data: Model): string{
    return `${data.type} ${data.scope.length===0? '' : `(scope): `} ${data.subject} 

${data.message}

Refs: #${data.refs}
    `
  }
}