var attributeArray = ["INT","REF","DEX","TECH","COOL","WILL","LUCK","MOVE","BODY","EMP"]
var diceArray = ["D2","D4","D6","D8","D10","D12","D20","D100"]
var cyberwareLocationArray = ["Right Cybereye","Left Cybereye", "CyberAudio Suite","Right Cyberarm","Left Cyberarm","Neural Link","Right Cyberleg","Left Cyberleg","Internal Cyberware","External Cyberware","Fashionware","Borgware"]
var roleArray = ["solo","netrunner","fixer","nomad","rockerboy","techie","corporate","cop"]
var skillArray = [ {name:"Accounting", attribute: "INT"}, {name: "Acting", attribute:"COOL"}, {name: "Air Vehicle Tech", attribute:"TECH"}, {name: "Animal Handling ", attribute:"INT"}, {name: "Archery ", attribute:"REF"}, {name: "Athletics ", attribute:"DEX"}, {name: "Autofire", attribute:"REF"}, {name: "Basic Tech", attribute: "TECH"}, {name: "Brawling", attribute:"DEX"}, {name: "Bribery", attribute:"COOL"}, {name: "Bureaucracy", attribute:"INT"}, {name: "Business", attribute:"INT"}, {name: "Composition", attribute:"INT"}, {name: "Conceal/Reveal Object", attribute:"INT"}, {name: "Concentration", attribute:"WILL"}, {name: "Contortionist", attribute:"DEX"}, {name: "Conversation", attribute:"EMP"}, {name: "Criminology", attribute:"INT"}, {name: "Cryptography", attribute:"INT"}, {name: "Cyber Tech ", attribute:"TECH"}, {name: "Dance ", attribute:"DEX"}, {name: "Deduction ", attribute:"INT"}, {name: "Demolitions ", attribute:"TECH"}, {name: "Drive Land Vehicle ", attribute:"REF"}, {name: "Driving ", attribute:"REF"}, {name: "Education ", attribute:"INT"}, {name: "Electronics/Security Tech ", attribute:"TECH"}, {name: "Endurance ", attribute:"WILL"}, {name: "Evasion ", attribute:"DEX"}, {name: "First Aid ", attribute:"TECH"}, {name: "Forgery ", attribute:"TECH"}, {name: "Gamble ", attribute:"INT"}, {name: "Handgun ", attribute:"REF"}, {name: "Heavy Weapons", attribute:"REF"}, {name: "Human Perception", attribute:"EMP"}, {name: "Interrogation", attribute: "COOL"},{name: "Land Vehicle Tech", attribute: "TECH"}, {name: "Language", attribute: "INT"}, {name: "Library Search", attribute: "INT"}, {name: "Lipreading", attribute: "INT"}, {name: "Local Expert", attribute: "INT"}, {name: "Marksmanship", attribute: "REF"}, {name: "Martial Arts", attribute: "DEX"}, {name: "Melee Weapon", attribute: "DEX"}, {name: "Paint/Draw/Sculpt", attribute: "TECH"}, {name: "Paramedic ", attribute: "TECH"}, {name: "Perception", attribute: "INT"}, {name: "Personal Grooming", attribute: "COOL"}, {name: "Persuasion", attribute: "COOL"}, {name: "Photography/Film ", attribute: "TECH"}, {name: "Picklock", attribute: "TECH"}, {name: "Pickpocket", attribute: "TECH"}, {name: "Pilot Air Vehicle", attribute: "REF"}, {name: "Pilot Sea Vehicle ", attribute: "REF"}, {name: "Play Instrument ", attribute: "EMP"}, {name: "Resist Torture/Drugs ", attribute: "WILL"}, {name: "Riding ", attribute: "REF"}, {name: "Science", attribute: "INT"}, {name: "Sea Vehicle Tech", attribute: "TECH"}, {name: "Shoulder Arms", attribute: "REF"}, {name: "Stealth", attribute: "DEX"}, {name: "Streetwise", attribute: "COOL"}, {name: "Tactics", attribute: "INT"}, {name: "Tracking", attribute: "INT"}, {name: "Trading", attribute: "COOL"}, {name: "Wardrobe/Style", attribute: "COOL"}, {name: "Weapons Tech", attribute: "TECH"}, {name: "Wilderness Survival", attribute: "INT"}]
var armorArray = ["none [SP-0]","Leathers [SP-4]","Kevlar [SP-7]", "LightArmorJack [SP-11]","Bodyweight Suit [SP-11]", "Medium Armorjack [SP-11]","Heavy Armorjack [SP-13]","Flak [SP-15]","Metalgear [SP-18]","Bulletproof Shield [HP-10]"]

//This is the format to store character data for export
var storage = {
    characterName: "",
    role: 0, //index for roleArray
    trackers: {currentHP: 0, TotalHP:0, SeriouslyWounded:0,DeathSaves:0,LuckRemaining:0},
    armor: {head:0,body:0},
    euroBucks: 0,
    skills: [{name:"",bonus:0}],
    weapons:[{name:"",diceAmount:0,diceType:0}],
    cyberware:[{name:"",data:"",location:0}],
    respect:[{name:"",amount:0}],
    inventory:[""]
}




const slot = {
    parent: null,
    children: []
};

function getAllAttributeElms(){
    var arrayOfAttributeElms = [];
    attributeArray.forEach((element) => arrayOfAttributeElms.push(document.getElementById(element)));
    return arrayOfAttributeElms;
}

function addOnChangeAttribute(){
    getAllAttributeElms().forEach((element) => element.addEventListener("change", (event) => {
        updateAttributeTotal();
        updateAttributeBonus(element);
    }) );
}
function updateAttributeBonus(element){
    var elm = document.getElementById("bonusNum_" + element.id)
    console.log(elm, "bonusNum_" + element.id);
    elm.innerHTML = "+" + element.value
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

//cycle through all skills and create them
function createSkillSlot(){
    for(var i=0; i < skillArray.length;i++){
        var row = createRow();
        row.style.position = "relative";
        row.classList.add("width100");
        row.classList.add("alignLeft");
        var skillName = createText(skillArray[i].name);

        var numInput = document.createElement("input");
        numInput.type = "number";
        numInput.classList.add("inputSmaller");
        numInput.placeholder = 0;

        row.appendChild(numInput);
        row.appendChild(skillName);

        var cont = document.createElement("div");
        cont.classList.add("flexRow");
        cont.classList.add("alignRight");
        var result = createText("= 0");
        cont.appendChild(result);
        row.appendChild(cont);

        row.classList.add("alignLeft");
        row.classList.add("textAlignLeft");
        document.getElementById("holder_" + skillArray[i].attribute).appendChild(row);
    }
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
    row.classList.add("flexRow");
    row.classList.add("cyberwareSlot");
    row.classList.add("roundedEdges");

    var column = document.createElement("div");
    column.classList.add("flexColumn");


    var textInput = document.createElement("input");
    textInput.type = "text";
    textInput.placeholder = "data entry";
    textInput.classList.add("textAlignLeft");
    textInput.classList.add("thinnerInput");
    textInput = addSideBars(textInput);

    var dataText = document.createElement("input");
    dataText.type = "text";
    dataText.placeholder = "data entry";
    dataText.classList.add("textAlignLeft");
    dataText.classList.add("thinnerInput");
    dataText = addSideBars(dataText);

    column.appendChild(textInput);
    column.appendChild(dataText);
    row.appendChild(column);

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
    var dropdown = createDropDown(roleArray);
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
giveAddButtonFunctionality("add_weapon");
giveAddButtonFunctionality("add_cyberware");
giveAddButtonFunctionality("add_respect");
giveAddButtonFunctionality("add_inventory");

createRoleDropdown();
createBodyArmorDropdown();
createSkillSlot();