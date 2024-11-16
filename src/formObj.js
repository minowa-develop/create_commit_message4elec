const formObj = class {
  // fields
  #documents = false;
  #type;
  #subject;
  #scope;
  #refs;
  #message;

  // const
  constructor() {
    this.documents = document.getElementById("documents").checked;
    this.type = this.#getTypeValue(document.getElementById("type"));
    this.subject = document.getElementById("subject").value;
    this.scope = document.getElementById("scope").value;
    this.refs = document.getElementById("refs").value;
    this.message = document.getElementById("message").value;
  }
  #getTypeValue(type){
    return type.options[type.selectedIndex].value;
  }

  // get/setters
  getDocuments(){
    return documents;
  }
  setDocuments(documents){
    this.#documents = documents;
  }

  getType(){
    return type;
  }
  setType(type){
    this.#type = type;
  }

  getSubject(){
    return subject;
  }
  setSubject(subject){
    this.#subject = subject;
  }

  getScope(){
    return scope;
  }
  setScope(scope){
    this.#scope = scope;
  }

  getRefs(){
    return refs;
  }
  setRefs(refs){
    this.#refs = refs;
  }
  
  getMessage(){
    return message;
  }
  setMessage(message){
    this.#message = message;
  }

  // methods
  setJson(json){
    if(json.documents){
      this.#documents = true;
    }
    this.type = json.type;
    this.#subject = json.subject;
    this.#scope = json.scope;
    this.#refs = json.refs;
    this.#message = json.message;
  }

  // formset
  setFormData(){
    document.getElementById("tools").checked = true;
    if(this.#documents){
      document.getElementById("documents").checked = true;
    }
    document.getElementById("subject").value = this.#subject;
    document.getElementById("scope").value = this.#scope;
    document.getElementById("refs").value = this.#refs;
    document.getElementById("message").value = this.#message;
  }

  // メッセージ作成
  createMessage(){
    return this.#createHeader() +"\r\n\r\n"+ this.#message +"\r\n\r\n"+ this.#createRefs();
  }
  #createHeader(){
    return this.#type + this.#createScope() +": "+ this.#subject;
  }
  #createScope(){
    if(this.#scope == ""){
      return "";
    }
    return "("+ this.#scope +")";
  }
  #createRefs(){
    return "Refs: #"+ this.#refs;
  }

  // json
  toJsonString(){
    JSON.stringify(toJson())
  }
  toJson(){
    return {
      "documents": this.#documents,
      "type": this.#type,
      "subject": this.#subject,
      "scope": this.#scope,
      "refs": this.#refs,
      "message": this.#message
    }
  }

  makeExportFileName(){
    return this.#refs +'_'+ this.#subject;
  }
}