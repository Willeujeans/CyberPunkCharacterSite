var attributeArray = ["INT","REF","DEX","TECH","COOL","WILL","LUCK","MOVE","BODY","EMP"]
var diceArray = ["D2","D4","D6","D8","D10","D12","D20","D100"]
var storage = []
const slot = {
    parent: null,
    children: []
  };



function giveAddButtonFunctionality(buttonName){
    var button = document.getElementById(buttonName);
    console.log(buttonName.toString());
    var containerName = buttonName.toString().split("_");
    var parentContainerName = "container_" + containerName[1];
    var parentContainer = document.getElementById(parentContainerName);

    if(containerName[1] == "skill"){
        button.addEventListener("click", function (event){
            createSkillSlot(parentContainer);
        });
    }
    if(containerName[1] == "inventory"){
        button.addEventListener("click", function (event){
            createInventorySlot(parentContainer);
        });
    }
    if(containerName[1] == "weapon"){
        button.addEventListener("click", function (event){
            createWeaponSlot(parentContainer);
        });
    }
    if(containerName[1] == "respect"){
        button.addEventListener("click", function (event){
            createRespectSlot(parentContainer);
        });
    }
}
function createSkillSlot(parentContainer){
    var row = createRow();
    var input = document.createElement("input");
    input.type = "text";
    input.classList.add("textAlignLeft");
    input.placeholder = "data entry"

    var dropDown = createDropDown(attributeArray);

    var plusText = createText("+");
    plusText.classList.add("skillBonusNumber");

    var numInput = document.createElement("input");
    numInput.type = "number";
    numInput.classList.add("inputSmaller");
    numInput.placeholder = 0;

    row.appendChild(input);
    row.appendChild(dropDown);
    row.appendChild(plusText);
    row.appendChild(numInput);
    row = addSideBars(row);
    parentContainer.appendChild(row);
    storeSlot(row, parentContainer);
}

function createRespectSlot(parentContainer){
    var row = createRow();

    var textInput = document.createElement("input");
    textInput.type = "text";
    textInput.classList.add("noBorder");
    textInput.placeholder = "data entry";
    row.appendChild(textInput);

    var numInput = document.createElement("input");
    numInput.type = "number";
    numInput.classList.add("noBorder");
    numInput.placeholder = "0";
    numInput.classList.add("inputSmaller");
    row.appendChild(numInput);
    row = addSideBars(row);
    parentContainer.appendChild(row);
    storeSlot(row, parentContainer);
}

function createWeaponSlot(parentContainer){
    var row = createRow();

    var textInput = document.createElement("input");
    textInput.type = "text";
    textInput.placeholder = "data entry";
    textInput.classList.add("textAlignLeft");
    row.appendChild(textInput);

    var numInput = document.createElement("input");
    numInput.type = "number";
    numInput.placeholder = 0;
    numInput.classList.add("inputSmaller");
    row.appendChild(numInput);

    var dropDown = createDropDown(diceArray);
    row.appendChild(dropDown);
    row = addSideBars(row);
    parentContainer.appendChild(row);
    storeSlot(row, parentContainer);
}

function createInventorySlot(parentContainer){
    var input = document.createElement("input");
    input.classList.add("fillWidth");
    input.classList.add("noBorder");
    input.placeholder = "data entry";
    input = addSideBars(input);
    input.classList.add("fillWidth");

    parentContainer.appendChild(input);
    storeSlot(input, parentContainer);
}

function createRow(){
    var row = document.createElement("div");
    row.classList.add("flexRow");
    row.classList.add("gap");
    return row;
}

function addSideBars(in_element){
    var row = document.createElement("div");
    row.classList.add("flexRow");
    row.style.alignContent = "center";
    row.style.alignItems = "center";
    row.style.justifyItems = "center";
    row.style.justifyContent = "center";

    var leftP = createText("[ ");
    leftP.classList.add("sideBars");
    leftP.style.alignSelf = "left";

    var rightP = createText(" ]");
    rightP.classList.add("sideBars");
    rightP.style.alignSelf = "right";

    row.appendChild(leftP);
    row.appendChild(in_element);
    row.appendChild(rightP);

    return row;
}
function createDropDown(in_options){
    var selectElement = document.createElement("select");
    for(var i=0;i < in_options.length;i++){
        var option = document.createElement("option")
        option.text = in_options[i];
        selectElement.appendChild(option);
    }
    return selectElement;
}
function createText(in_string){
    var paragragh = document.createElement("p");
    var text = document.createTextNode(in_string);
    paragragh.appendChild(text);
    return paragragh;
}

function storeSlot(row, parentContainer){
    var createdSlot = Object.create(slot);
    var array = createdSlot.children;
    createdSlot.children = array;
    storage.push(createdSlot);
    createdSlot.parent = parentContainer;
}

//(buttonName, [text, string], [select,options], number)
giveAddButtonFunctionality("add_skill");
giveAddButtonFunctionality("add_weapon");
giveAddButtonFunctionality("add_respect");
giveAddButtonFunctionality("add_inventory");