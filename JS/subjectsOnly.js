function subStart(){
    //draw the subject list to screen
    drawSubjects(); 
    //add the event listener for the subject Add button
    addSubEventListener (); 
    //add the event listener for the Save button
    addSaveEventListener ();
    //add the event listener for the Load button
    addLoadEventListener (); 
    //add the event listener for the Template button
    addTemplateEventListener ();
    //add the event listener for the Delete button
    addDeleteEventListener ();
    //add the event listener for the Subjects table
    addSubtableEventListener ();
}

///////////////////////////

function drawSubjects(){
    
    //get the element we want to make changes to
    var subList = document.getElementById("subList");
    //create an empty placeholder for content
    var subListContent = "";

    //add the header row to the placeholder to add to the DOM
    subListContent += createHeaderRow(headers);

    //iterate through global variable of subjectdata to create rows in the table
    for (var i = 0; i < subjectData.length; i++){
        subListContent += createTableRow(subjectData[i], subjectData[i][0]);
    }

    //add the content to the DOM
    subList.innerHTML = subListContent;

    //check there's an event listener on them all
    addSubtableEventListener ()
}

///////////////////////////////////


function addSubEventListener (){
    //get the items that has "addSub" as an ID
    var button = document.getElementById("addSub");
    //add the event listener to call addSub on click
    button.addEventListener("click", addSub);

}

function addSub(){
    //hide errors if already showing
    hideError("shortInput");
    hideError("notAlphaNum");
    hideError("alreadyAdded");

    //get values
    var subCode = document.getElementById("subCode").value;
    var subName = document.getElementById("subject").value;

    //basic html sanitisation
    subName = mySanitise(subName);

    var subArr = [subCode, subName];

    var added = addSubArray(subArr);

    //clear entry boxes if added to array
    if (added == "completed"){
        document.getElementById("subCode").value = "";
        document.getElementById("subject").value = "";
    }

    //redraw table
    drawSubjects();

}

////////////////////////

function addSaveEventListener (){
    //get the items that has "addSub" as an ID
    var button = document.getElementById("save");

    button.addEventListener("click", function() {saveAsCSV(headers,subjectData, "subjects.csv")});
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

    drawSubjects();

    // loadCSV(file, headers, subjectData, drawSubjects, addSubArray);
    loadCSV(file, headers, drawSubjects, addSubArray);
    
}

////////////////////

function addTemplateEventListener (){
    //get the items that has "addSub" as an ID
    var button = document.getElementById("template");

    button.addEventListener("click", function() {saveAsCSV(headers,[], "subjects.csv")});
}

////////////////////

function addDeleteEventListener (){
    //get the item that has "delSub" as an ID
    var button = document.getElementById("delSub");

    button.addEventListener("click", delSub);
}

function delSub(){
    //get the item that has "subList" as an ID
    var table = document.getElementById("subList");
    var tableRows = table.getElementsByTagName("tr");

    for (var i = 0; i < tableRows.length; i++){
        if (getActiveRow(tableRows[i])){
            //find the location of the data in the array
            var dataLoc = findData(subjectData, tableRows[i].id, 0);
            
            //delete the row from the array 
            deleteRow(subjectData, subjectData[dataLoc])

            //redraw the table
            drawSubjects();

            //end function
            return;
        }    
    }
}

function addSubtableEventListener (){
    //get the item that has "subList" as an ID
    var table = document.getElementById("subList");
    var tableRows = table.getElementsByTagName("tr");

    for (var i = 0; i < tableRows.length; i++){
        tableRows[i].addEventListener("click", function(){ rowSelect(this, tableRows); });
    }
}

//////////////////////

