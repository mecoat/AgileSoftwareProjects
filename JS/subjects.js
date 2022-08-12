//global variable to hold subject data
// var subjectData = [["De", "German"], ["En", "English"], ["Ma", "Maths"]];
var subjectData = [];
//headers
var headers = ["Subject Code", "Subject Name"];

function subStart(){
    //draw the subject list to screen
    drawSubjects(); 
    //add the event listener for the subject Add button
    addSubEventListener (); 
    //add the event listener for the Save button
    addSaveEventListener ();
    //add the event listener for the Save button
    addLoadEventListener (); 
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

    //Display error if Subject Code is not alphanumeric
    var regEx = /^[0-9a-zA-Z]+$/;
    if (!subCode.match(regEx)){
        var notAlphaNum = document.getElementById("notAlphaNum");
        notAlphaNum.classList.remove("hide");
        //end function as can do no more
        return;
    }

    //variable to hold the values
    var values = [];

    //check if subject code is already in array (making both lower case to check as not case sensitive in SMS)
    for (var i = 0; i < subjectData.length; i++){
        if (subCode.toLowerCase() == subjectData[i][0].toLowerCase()){
            var alreadyAdded = document.getElementById("alreadyAdded");
            alreadyAdded.classList.remove("hide");
            //end function as can do no more
            return;
        }
    }

    //add values to array
    values.push(subCode);
    values.push(subName);
    
    //add values to global variable
    addToArray(subjectData, values);

    //redraw table
    drawSubjects();

}

/////////////////

function addSaveEventListener (){
    //get the items that has "addSub" as an ID
    var button = document.getElementById("save");

    button.addEventListener("click", function() {saveAsCSV(["Subject Code", "Subject Name"],subjectData, "subjects.csv")});
}

function addLoadEventListener (){
    //get the check it button
    var chkUploadBtn = document.getElementById("checkIt");

     //get the file input element
     var subFile = document.getElementById("subFile");
 
     //add an event listener that adds active to the Change it button
     // to make it more obvious to press once user has uploaded a file
     subFile.addEventListener("change", function(){ 
        chkUploadBtn.classList.add("active"); 
     });

    

    //listen for a click to load the data from the file
    chkUploadBtn.addEventListener("click", loadSubFile);
}

function loadSubFile(){
    //get the input file
    var input = document.querySelector('input[type="file"]');
    var file = input.files[0];

    loadCSV(file, headers, subjectData, drawSubjects);
    
}

    
