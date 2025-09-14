export class ElementGetter {
    // 存在しないIDを指定していた場合は例外を出力する
    static getElementById(id) {
        let element = document.getElementById(id);
        if (element === null) {
            throw new Error(`parentId: ${id} is null.`);
        }
        return element;
    }
    static getSelectElementById(id) {
        return ElementGetter.getElementById(id);
    }
    static getTdElementById(id) {
        return ElementGetter.getElementById(id);
    }
    static getInputElementById(id) {
        return ElementGetter.getElementById(id);
    }
    static getTableElementById(id) {
        return ElementGetter.getElementById(id);
    }
    /**
     * 指定したIDの子要素の中で選択状態の要素を返す
     * @param id
     * @returns
     */
    static getSelectedChildElement(id) {
        const element = ElementGetter.getSelectElementById(id);
        return Array.from(element.options).find((child) => child.selected);
    }
}
//# sourceMappingURL=element-getter.js.map