export class Data {
  // fields
  private _repository: string = "";
  private _documents: boolean = false;
  private _type: string = "feat";
  private _scope: string = "";
  private _subject: string = "";
  private _message: string = "";
  private _refs: string = "";

  // get/setter methods
  public get repository(): string{ return this._repository }
  public set repository(repository: string){ this._repository = repository }
  public get documents(): boolean{ return this._documents }
  public set documents(documents: boolean){ this._documents = documents }
  public get type(): string{ return this._type }
  public set type(type: string){ this._type = type }
  public get scope(): string{ return this._scope}
  public set scope(scope: string){ this._scope=scope; }
  public get subject(): string{ return this._subject}
  public set subject(subject: string){ this._subject=subject; }
  public get message(): string{ return this._message}
  public set message(message: string){ this._message=message; }
  public get refs(): string{ return this._refs}
  public set refs(refs: string){ this._refs=refs; }

  //methods
  public makeCommitMessage(): string{
    return this._type + this.makeScope() + this._subject + "\r\n\r\n"+ this._message + "\r\n\r\n"+ this.makeRefs();
  }
  private makeScope(): string{
    if(this._scope != null && this._scope.length === 0){
      return "";
    }
    return "("+ this._scope +"): "
  }
    private makeRefs(): string{
      return "Refs: #"+ this._refs;
    }

  /**
   * タイトル名を返す
   * @param obj 
   * @returns 
   */
  public makeTitle(): string{
    return this._refs +'_'+ this._subject;
  }
  

  /**
   * json型に変換
   * @returns 
   */
  public toJson(): object{
    return {
      "repository": this._repository,
      "type": this._type,
      "subject": this._subject,
      "scope": this._scope,
      "refs": this._refs,
      "message": this._message
    }
  }

  /**
   * json型をセット
   * @param json 
   */
  public setJson(json: Data): void{
    // this.repository = json.repository();
    this.documents = json.documents;
    this.type = json.type;
    this.subject = json.subject;
    this.scope = json.scope;
    this.refs = json.refs;
    this.message = json.message;
  }

}
