export class CommitMessageCreator {
    static create(data) {
        return `${data.type} ${data.scope.length === 0 ? '' : `(scope): `} ${data.subject} 

${data.message}

Refs: #${data.refs}
    `;
    }
}
//# sourceMappingURL=commit-message-creator.js.map