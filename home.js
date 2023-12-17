var attributeArray = ["INT","REF","DEX","TECH","COOL","WILL","LUCK","MOVE","BODY","EMP"]

function giveAddSkillButtonFunctionality(){
    var button = document.getElementById("addSkillButton");
    button.addEventListener("click", function (event){
        console.log("adding new skill slot...")
        createNewSkillSlot();
    });
}

function createNewSkillSlot(){
    var row = document.createElement("div");
    row.classList.add("flexRow");
    
    var skillNameRow = document.createElement("div");
    var skillNameInput = document.createElement("input");
    skillNameRow.classList.add("flexRow");

    var leftP = document.createElement("p");
    leftP.classList.add("sideBars");
    var leftText = document.createTextNode("[");
    leftP.appendChild(leftText);

    var rightP = document.createElement("p");
    rightP.classList.add("sideBars");
    var rightText = document.createTextNode("]");
    rightP.appendChild(rightText);

    skillNameRow.appendChild(leftP);
    skillNameRow.appendChild(skillNameInput);
    skillNameRow.appendChild(rightP);

    skillNameInput.classList.add("skillName");
    var skillAttribute = document.createElement("select");
    
    for(var i=0;i< 10;i++){
        var option = document.createElement("option")
        option.text = attributeArray[i];
        skillAttribute.appendChild(option);
    }

    var bonusNumber = document.createElement("p");
    bonusNumber.classList.add("skillBonusNumber");
    var textNode = document.createTextNode("+");
    bonusNumber.appendChild(textNode);
    bonusNumber.text = "+"
    row.appendChild(skillNameRow);
    row.appendChild(skillAttribute);
    row.appendChild(bonusNumber);
    document.getElementById("skillContainer").appendChild(row);
}

giveAddSkillButtonFunctionality();