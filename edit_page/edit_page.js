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

    //New element and yours properties, include empty text check
    let newElement = document.createElement("h1");
    newElement.innerHTML = "New Section";
    newElement.setAttribute("contenteditable","true");
    newElement.style.cursor = "pointer";
    newElement.style.color = document.getElementById("colorPickerSection").value;
    newElement.onfocus = function (){
        if(this.innerHTML === "New Section" || this.innerHTML.includes("Empty Section"))
            this.innerHTML = ""
    };
    newElement.onblur = function (){
        if(this.innerHTML === "")
            this.innerHTML = "<p title='WARNING: Insert name of section!' style='display: inline; background-color: red'>Empty Section " + "&#128721" + "</p>";
        this.setAttribute("id",newElement.innerHTML);
    };

    //If user type enter during the edit section, the header lost focus
    newElement.addEventListener("keypress",function (event){
        if(event.key === "Enter")
            this.blur();
    });

    //Add new element at main container
    containerMenu.appendChild(newElement);
}

/** Remove Mode Element */
function removeMode(remButton){
    let toolButtons = document.getElementById('tool').querySelectorAll("button");
    let sections = document.getElementById("myFrame").contentWindow.document.querySelectorAll("h1");

    if(remButton.innerHTML === "Remove Mode") {
        toolButtons.forEach(button => {
            if (button.innerHTML != "Remove Mode"){
                button.disabled = true;
                button.style.visibility = "hidden";
            }
        });
        remButton.innerHTML = "Exit from remove mode";

        sections.forEach(element =>{
            if(element !== sections[0])
                element.setAttribute("onclick","deleteFunc(this)");
            element.contentEditable = "false";
        });
        //sections[0].setAttribute("onclick","");
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
    element.remove();
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
