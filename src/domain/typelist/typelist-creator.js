export class TypelistCreator {
    static create(typeListArr) {
        typeListArr.forEach((elem, index) => {
            const option = document.createElement("option");
            option.text = elem;
            option.value = elem;
            option.selected = false;
            if (index == 0) {
                option.selected = true;
            }
            document.getElementById("types").appendChild(option);
        });
    }
}
//# sourceMappingURL=typelist-creator.js.map