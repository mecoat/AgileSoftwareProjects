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
    //hide errors if already showing
    hideError("shortInput");
    hideError("notAlphaNum");
    hideError("alreadyAdded");

    var subCode = document.getElementById("subCode").value;

    var subName = document.getElementById("subject").value;

    var subArr = [subCode, subName];

    addSubArray(subArr);

    //redraw table
    drawSubjects();

}

function addSubArray(values){
    var subCode = values[0];
    var subName = values[1];
    //display error if input incomplete
    if (subCode.length < 1 || subName.length < 1){
        showError("shortInput");
        //end function as can do no more
        return true;
    }

    //Display error if Subject Code is not alphanumeric
    var regEx = /^[0-9a-zA-Z]+$/;
    if (!subCode.match(regEx)){
        showError("notAlphaNum");

        //end function as can do no more
        return true;
    }

    //variable to hold the values
    var values = [];

    //check if subject code is already in array (making both lower case to check as not case sensitive in SMS)
    for (var i = 0; i < subjectData.length; i++){
        if (subCode.toLowerCase() == subjectData[i][0].toLowerCase()){
            showError("alreadyAdded");
            //end function as can do no more
            return true;
        }
    }

    //add values to array
    values.push(subCode);
    values.push(subName);

    //add values to global variable
    addToArray(subjectData, values);
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

    for (var i = subjectData.length - 1; i >= 0; i--){
        deleteRow(subjectData, subjectData[i])
    }
    
    // loadCSV(file, headers, subjectData, drawSubjects, addSubArray);
    loadCSV(file, headers, drawSubjects, addSubArray);
    
}

    
