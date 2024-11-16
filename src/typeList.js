const typeList = class {
  // const
  #toolList = ["feat","fix","docs","style","refactor","perf","test","chore"];
  #documentList = ["add","remove","rename","update"];

  // fields
  #checkedDocuments;
  #type;

  //set/getters
  getCheckedDocuments(){
    return checkedDocuments;
  }
  setCheckedDocuments(checkedDocuments){
    this.#checkedDocuments = checkedDocuments;
  }
  
  getType(){
    return this.#type;
  }
  setType(type){
    this.#type = type;
  }

  // const
  constructor() {
    this.#checkedDocuments = document.getElementById("documents").checked;
    this.#type = document.getElementById("type").value;
  }

  // methods
  drow(){
    this.drowTypeList();
    this.selectOption(this.#type);
  }
  drowTypeList(){
    this.#clear();

    var settingList = this.#toolList;
    if(this.#checkedDocuments){
      settingList = this.#documentList;
    }

    settingList.forEach((value, index) => {
      this.#addOption(value, index);
    });
  }
  #addOption(value, index) {
    var option = document.createElement("option");
    option.text = value;
    option.value = value;
    option.selected = false;
    if(index == 0){
      option.selected = true;
    }
    var select = document.getElementById("type");
    select.appendChild(option);
  }
  #clear() {
    select_childs = document.getElementById("type");
    while(0 < select_childs.length){
      select_childs.remove(0);
    }
  }
  selectOption(value){
    select_childs = document.getElementById("type");
    for(let i=0;i<select_childs.length;i++){
      var child = select_childs.children[i];
      if(child.value == value){
        child.selected=true;
        return null;
      }
    }
  }
  
}