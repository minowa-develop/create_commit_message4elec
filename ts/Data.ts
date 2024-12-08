import { Types } from "./Types";

// input form data

export class Data {
  // fields
  private repository: string;
  private type: string;
  private scope: string;
  private subject: string;
  private message: string;
  private refs: string;

  // get/setter methods
  public getRepository(): string{ return this.repository }
  public setRepository(repository: string): void{ this.repository = repository }
  public getType(): string{ return this.type }
  public setType(type: string): void{ this.type = type }
  public getScope(): string{ return this.scope}
  public setScope(scope: string){ this.scope=scope; }
  public getSubject(): string{ return this.subject}
  public setSubject(subject: string){ this.subject=subject; }
  public getMessage(): string{ return this.message}
  public setMessage(message: string){ this.message=message; }
  public getRefs(): string{ return this.refs}
  public setRefs(refs: string){ this.refs=refs; }

  //methods
  public makeCommitMessage(): string{
    return this.type + this.makeScope() + this.subject + "\r\n\r\n"+ this.message + "\r\n\r\n#"+ this.makeRefs
  }
  private makeScope(): string{
    if(this.scope != null && this.scope.length === 0){
      return "";
    }
    return "("+ this.scope +"): "
  }
  private makeRefs(): string{
    return "Refs: #"+ this.refs;
  }

  /**
   * タイトル名を返す
   * @param obj 
   * @returns 
   */
  public makeTitle(): string{
    return this.refs +'_'+ this.subject;
  }
  

  /**
   * json型に変換
   * @returns 
   */
  public toJson(): object{
    return {
      "repository": this.repository,
      "type": this.type,
      "subject": this.subject,
      "scope": this.scope,
      "refs": this.refs,
      "message": this.message
    }
  }

  /**
   * json型をセット
   * @param json 
   */
  public setJson(json: Data): void{
    this.repository = json.getRepository();
    this.type = json.getType();
    this.subject = json.getSubject();
    this.scope = json.getScope();
    this.refs = json.getRefs();
    this.message = json.getMessage();
  }

}
