var attributeArray = ["INT","REF","DEX","TECH","COOL","WILL","LUCK","MOVE","BODY","EMP"]
var diceArray = ["D2","D4","D6","D8","D10","D12","D20","D100"]
var cyberwareLocationArray = ["Right Cybereye","Left Cybereye", "CyberAudio Suite","Right Cyberarm","Left Cyberarm","Neural Link","Right Cyberleg","Left Cyberleg","Internal Cyberware","External Cyberware","Fashionware","Borgware"]
var classArray = ["solo","netrunner","fixer","nomad","rockerboy","techie","corporate","cop"]
var skillArray = ["Accounting [INT]", "Acting [COOL]", "Air Vehicle Tech [TECH]", "Animal Handling [INT]", "Archery [REF]", "Athletics [DEX]", "Autofire [REF]", "Basic Tech [TECH]", "Brawling [DEX]", "Bribery [COOL]", "Bureaucracy [INT]", "Business [INT]", "Composition [INT]", "Conceal/Reveal Object [INT]", "Concentration [WILL]", "Contortionist [DEX]", "Conversation [EMP]", "Criminology [INT]", "Cryptography [INT]", "Cyber Tech [TECH]", "Dance [DEX]", "Deduction [INT]", "Demolitions [TECH]", "Drive Land Vehicle [REF]", "Driving [REF]", "Education [INT]", "Electronics/Security Tech [TECH]", "Endurance [WILL]", "Evasion [DEX]", "First Aid [TECH]", "Forgery [TECH]", "Gamble [INT]", "Handgun [REF]", "Heavy Weapons [REF]", "Human Perception [EMP]", "Interrogation [COOL]", "Land Vehicle Tech [TECH]", "Language [INT]", "Library Search [INT]", "Lipreading [INT]", "Local Expert [INT]", "Marksmanship [REF]", "Martial Arts [DEX]", "Melee Weapon [DEX]", "Paint/Draw/Sculpt [TECH]", "Paramedic [TECH]", "Perception [INT]", "Personal Grooming [COOL]", "Persuasion [COOL]", "Photography/Film [TECH]", "Picklock [TECH]", "Pickpocket [TECH]", "Pilot Air Vehicle [REF]", "Pilot Sea Vehicle [REF]", "Play Instrument [EMP]", "Resist Torture/Drugs [WILL]", "Riding [REF]", "Science [INT]", "Sea Vehicle Tech [TECH]", "Shoulder Arms [REF]", "Stealth [DEX]", "Streetwise [COOL]", "Tactics [INT]", "Tracking [INT]", "Trading [COOL]", "Wardrobe/Style [COOL]", "Weapons Tech [TECH]", "Wilderness Survival [INT]"]
var armorArray = ["none [SP-0]","Leathers [SP-4]","Kevlar [SP-7]", "LightArmorJack [SP-11]","Bodyweight Suit [SP-11]", "Medium Armorjack [SP-11]","Heavy Armorjack [SP-13]","Flak [SP-15]","Metalgear [SP-18]","Bulletproof Shield [HP-10]"]
var storage = []
const slot = {
    parent: null,
    children: []
};

function getAllAttributeElms(){
    var arrayOfAttributeElms = [];
    attributeArray.forEach((element) => arrayOfAttributeElms.push(document.getElementById(element)));
    console.log(arrayOfAttributeElms);
    return arrayOfAttributeElms;
}
function addOnChangeAttribute(){
    getAllAttributeElms().forEach((element) => element.addEventListener("change", (event) => {
        console.log("changed");
        updateAttributeTotal();
    }) );
}

function updateAttributeTotal(){
    var totalCount = 0;
    getAllAttributeElms().forEach((element) => {
        if(element.value != ""){
            totalCount += parseInt(element.value);
            console.log(totalCount);
        }
    });
    var statTotalElm = document.getElementById("TOTAL");
    statTotalElm.innerText = totalCount.toString();
}
addOnChangeAttribute();


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
    if(containerName[1] == "weapon"){
        button.addEventListener("click", function (event){
            createWeaponSlot(parentContainer);
        });
    }
    if(containerName[1] == "cyberware"){
        button.addEventListener("click", function (event){
            createCyberwareSlot(parentContainer);
        });
    }
    if(containerName[1] == "respect"){
        button.addEventListener("click", function (event){
            createRespectSlot(parentContainer);
        });
    }
    if(containerName[1] == "inventory"){
        button.addEventListener("click", function (event){
            createInventorySlot(parentContainer);
        });
    }
}
function createSkillSlot(parentContainer){
    var row = createRow();
    var skillDropdown = createDropDown(skillArray);
    skillDropdown.classList.add("alignLeft");
    var plusText = createText("+");
    plusText.classList.add("skillBonusNumber");

    var numInput = document.createElement("input");
    numInput.type = "number";
    numInput.classList.add("inputSmaller");
    numInput.placeholder = 0;

    row.appendChild(skillDropdown);
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

function createCyberwareSlot(parentContainer){
    var row = createRow();
    row.classList.add("columnMobileRowDesktop");
    row.classList.add("borderBottom");

    var textInput = document.createElement("input");
    textInput.type = "text";
    textInput.placeholder = "data entry";
    textInput.classList.add("textAlignLeft");
    row.appendChild(textInput);

    var dataText = document.createElement("input");
    dataText.type = "text";
    dataText.placeholder = "data entry";
    dataText.classList.add("textAlignLeft");
    row.appendChild(dataText);

    var placement = createDropDown(cyberwareLocationArray);
    placement.classList.add("textAlignLeft");
    row.appendChild(placement);

    // row = addSideBars(row);
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

function createRoleDropdown(){
    var insertPlacement = document.getElementById("roleInsert");
    var dropdown = createDropDown(classArray);
    dropdown = addSideBars(dropdown);
    insertPlacement.appendChild(dropdown);
}

function createBodyArmorDropdown(){
    var bodyInsert = document.getElementById("bodyArmorInsert");
    var bodyDropdown = createDropDown(armorArray);
    bodyDropdown.classList.add("inputMedium");
    bodyDropdown = addSideBars(bodyDropdown);
    bodyInsert.appendChild(bodyDropdown);

    var headInsert = document.getElementById("headArmorInsert");
    var headDropdown = createDropDown(armorArray);
    headDropdown.classList.add("inputMedium");
    headDropdown = addSideBars(headDropdown);
    headInsert.appendChild(headDropdown);
}

//(buttonName, [text, string], [select,options], number)
giveAddButtonFunctionality("add_skill");
giveAddButtonFunctionality("add_weapon");
giveAddButtonFunctionality("add_cyberware");
giveAddButtonFunctionality("add_respect");
giveAddButtonFunctionality("add_inventory");

createRoleDropdown();
createBodyArmorDropdown();