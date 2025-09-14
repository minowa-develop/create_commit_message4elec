/**
 * json型に変換
 * @returns
 */
export class DateToJson {
    static toJson(data) {
        return {
            "documents": data.documents,
            "type": data.type,
            "subject": data.subject,
            "scope": data.scope,
            "refs": data.refs,
            "message": data.message
        };
    }
}
//# sourceMappingURL=date-to-json.js.map