/**
 * json型に変換
 * @returns
 */
export class DateToJson {
    setJson(data, json) {
        data.documents = json.documents;
        data.type = json.type;
        data.subject = json.subject;
        data.scope = json.scope;
        data.refs = json.refs;
        data.message = json.message;
    }
}
//# sourceMappingURL=json-to-data.js.map