//global variable to hold subject data
var subjectData = [["De", "German"], ["En", "English"], ["Ma", "Maths"]];

function subStart(){
    //draw the subject list to screen
    drawSubjects(); 
    //add the event listener for the subject Add button
    addSubEventListener (); 
    //hide optional values
    // hideOnTTPage();
    //add event listener to user input
    // addUIEventListeners ();
}


/////////////////

function drawSubjects(){

    //get the element we want to make changes to
    var subList = document.getElementById("subList");
    //create an empty placeholder for content
    var subListContent = "";

    //headers to display
    var headers = ["Subject Code", "Subject Name"];

    //add the header row to the placeholder to add to the DOM
    subListContent += createHeaderRow(headers);

    //iterate through global variable of subjectdata to create rows in the table
    for (var i = 0; i < subjectData.length; i++){
        subListContent += createTableRow(subjectData[i]);
    }

    //add the content to the DOM
    subList.innerHTML = subListContent;
}

///////////////////////////////////

function addSubEventListener (){
    //get the items that has "addSub" as an ID
    var button = document.getElementById("addSub");

    button.addEventListener("click", addSub);

}

function addSub(){
    var subCode = document.getElementById("subCode").value;

    var subName = document.getElementById("subject").value;

    //display error if input incomplete
    if (subCode.length < 1 || subName.length < 1){
        var shortInput = document.getElementById("shortInput");
        shortInput.classList.remove("hide");
        //end function as can do no more
        return;
    }

    //Display error if Subject Code is not alhanumeric
    var regEx = /^[0-9a-zA-Z]+$/;
    if (!subCode.match(regEx)){
        var notAlphaNum = document.getElementById("notAlphaNum");
        notAlphaNum.classList.remove("hide");
        //end function as can do no more
        return;
    }


}