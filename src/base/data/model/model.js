export class Model {
    // fields
    _repository = "";
    _documents = false;
    _type = "feat";
    _scope = "";
    _subject = "";
    _message = "";
    _refs = "";
    // get/setter methods
    get repository() { return this._repository; }
    set repository(repository) { this._repository = repository; }
    get documents() { return this._documents; }
    set documents(documents) { this._documents = documents; }
    get type() { return this._type; }
    set type(type) { this._type = type; }
    get scope() { return this._scope; }
    set scope(scope) { this._scope = scope; }
    get subject() { return this._subject; }
    set subject(subject) { this._subject = subject; }
    get message() { return this._message; }
    set message(message) { this._message = message; }
    get refs() { return this._refs; }
    set refs(refs) { this._refs = refs; }
}
//# sourceMappingURL=model.js.map