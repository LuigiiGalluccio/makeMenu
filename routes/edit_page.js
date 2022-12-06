var express = require('express');
var router = express.Router();


/** Function for A4 layout */
function setLayoutA4(){
    let x = document.getElementById("myFrame");
    x.style.height = "297mm";
    x.style.width = "210mm";
}

/** Add Section Function */
function addSection(){
    let myFrame = document.getElementById('myFrame');
    let containerMenu = myFrame.contentWindow.document.querySelector("#menuContainer");
    let newElement = newSectionTitle();
    let newTable = newTableSection(newElement);

    //Add new element at main container
    containerMenu.appendChild(newElement);
    containerMenu.appendChild(newTable);
}

/** Function for apply attribute to element */
function setElementProperties(element){
    element.setAttribute("contenteditable","true");
    element.style.cursor = "pointer";

    //If user type enter during the edit section, the header lost focus
    element.addEventListener("keypress",function (event){
        if(event.key === "Enter")
            this.blur();
    });

    //Clear textbox if content is default
    element.onfocus = function (){
        if(this.innerHTML.includes("Empty Section") || this.innerHTML.includes("New"))
            this.innerHTML = "";
    };
}
/** Add Section Title */
function newSectionTitle(){
    let newElement = document.createElement("h1");
    setElementProperties(newElement );

    newElement.innerHTML = "New Section";
    newElement.style.color = document.getElementById("colorPickerSection").value;


    newElement.onblur = function (){
        if(this.innerHTML === "")
            this.innerHTML = "<p title='WARNING: Insert name of section!' style='display: inline; background-color: red'>Empty Section " + "&#128721" + "</p>";
        this.setAttribute("id",newElement.innerHTML);
        myFrame.contentWindow.document.querySelector(this.nextSibling.setAttribute("id",newElement.innerHTML + "T"));
    };

    newElement.ondblclick = function (){
        let tableOfSection = myFrame.contentWindow.document.getElementById(this.id + "T");
        addItemToTable(tableOfSection);
    }

    return newElement;
}
/** Create New Table Section Function */
function newTableSection(){
    let newTable = document.createElement("table");
    addItemToTable(newTable);
    return newTable;
}
function addItemToTable(newTable){
    let newRow = document.createElement("tr");
    let newTitle = document.createElement("td");
    let newDescription = document.createElement("td");
    let newPrice = document.createElement("td");

    //New title properties
    setElementProperties(newTitle);
    newTitle.setAttribute("class","itemTitle");
    newTitle.style.color = document.getElementById("colorPickerTitleItem").value;
    newTitle.innerHTML = "New Title";

    //New Description properties
    setElementProperties(newDescription);
    newDescription.setAttribute("class","itemDescription");
    newDescription.innerHTML = "New Description";

    //new Price properties
    setElementProperties(newPrice);
    newPrice.setAttribute("class","itemPrice");
    newPrice.innerHTML = "New Price";

    newDescription.style.color = newPrice.style.color = document.getElementById("colorPickerItem").value;

    //double click to add td description to table
    newRow.ondblclick = function (){
        newDescription.style.color =
        newRow.firstChild.after(newDescription);
    }

    //add item to table
    newRow.appendChild(newTitle);
    newRow.appendChild(newPrice);
    newTable.appendChild(newRow);
}

/** Remove Mode Element */
function removeMode(remButton){
    let toolButtons = document.getElementById('tool').querySelectorAll("button");
    let sections = document.getElementById("myFrame").contentWindow.document.querySelectorAll("h1");
    let allRow = document.getElementById("myFrame").contentWindow.document.querySelectorAll("tr");

    if(remButton.innerHTML === "Remove Mode") {
        toolButtons.forEach(button => {
            if (button.innerHTML != "Remove Mode"){
                button.disabled = true;
                button.style.visibility = "hidden";
            }
        });
        remButton.innerHTML = "Exit from remove mode";

        allRow.forEach(row =>{
           row.setAttribute("onclick","deleteFunc(this)");
        });

        sections.forEach(element =>{
            if(element !== sections[0]){
                element.setAttribute("onclick","deleteFunc(this)");
            }
            element.contentEditable = "false";
        });

        alert("Remove Mode Enabled: Click on element for delete it\nATTENTION: If you delete a section, you will also delete all its items!");
    }else{
        toolButtons.forEach(button => {
            if (button.innerHTML != "Exit from remove mode"){
                button.disabled = false;
                button.style.visibility = "visible";
            }
        });
        remButton.innerHTML = "Remove Mode";

        sections.forEach(element =>{
            element.setAttribute("onclick","");
            element.contentEditable = "true";
        });
        alert("Remove Mode Disabled!");
    }

}
function deleteFunc(element){
    if(element.tagName === "H1")
        element.nextElementSibling.remove();
    element.remove();x
}

/** Show and Edit color picker for Color Text Section */
function showHeaderColor(){
    let colorPicker = document.getElementById("colorPickerSection");
    colorPicker.click();
}
function changeColorSection(picker){
    let myFrame = document.getElementById("myFrame");
    let sectionsElement = myFrame.contentWindow.document.querySelectorAll("h1");
    sectionsElement.forEach(element =>{
        if(element.id != "titleMenu")
            element.style.color = picker.value;
    })
}

/** Show and Edit color picker for Color Text Item */
function showItemColor(){
    let colorPicker = document.getElementById("colorPickerItem");
    colorPicker.click();
}
function changeColorItem(picker){
    let myFrame = document.getElementById("myFrame");
    let items = myFrame.contentWindow.document.querySelectorAll("td");
    items.forEach(item =>{
        if(!item.attributes.getNamedItem("class").value.includes("itemTitle"))
            item.style.color = picker.value;
            item.style.borderColor = "gray";
    });
}
/** Show and Edit color picker for Color Text Title Item */
function showTitleItemColor(){
    let colorPicker = document.getElementById("colorPickerTitleItem");
    colorPicker.click();
}
function changeColorTitleItem(picker){
    let myFrame = document.getElementById("myFrame");
    let items = myFrame.contentWindow.document.querySelectorAll("td");
    items.forEach(item =>{
        if(item.attributes.getNamedItem("class").value.includes("itemTitle"))
            item.style.color = picker.value;
            item.style.borderColor = "gray";
    });
}

/** Show and Edit color picker for Color Text Title */
function showTitleColor(){
    let colorPicker = document.getElementById("colorPickerTitle");
    colorPicker.click();
}
function changeColorTitle(picker){
    let myFrame = document.getElementById("myFrame");
    let titleElement = myFrame.contentWindow.document.getElementById("titleMenu");
    titleElement.style.color = picker.value;
}

/** Show and Edit color picker for Color Background Color */
function showBackgroundColor(){
    let colorPicker = document.getElementById("colorPickerBackground");
    colorPicker.click();
}
function changeBackgroundColor(picker){
    let myFrame = document.getElementById("myFrame");
    myFrame.contentWindow.document.body.style.backgroundColor = picker.value
}

function show(){
    var overlay = document.getElementById('overlay');
    overlay.style.visibility = "visible";
}


function openNav() {
    document.getElementById("mySidenav").style.width = "350px";
    document.getElementById("frameContainer").style.marginLeft = "350px";
    document.getElementById("export_tool").style.marginLeft = "350px";

}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("frameContainer").style.marginLeft = 0;
    document.getElementById("export_tool").style.marginLeft = 0;
}

module.exports = router;
