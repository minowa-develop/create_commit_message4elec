export class Model {
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
  public set scope(scope: string){ this._scope = scope; }
  public get subject(): string{ return this._subject}
  public set subject(subject: string){ this._subject = subject; }
  public get message(): string{ return this._message}
  public set message(message: string){ this._message = message; }
  public get refs(): string{ return this._refs}
  public set refs(refs: string){ this._refs = refs; }
}
