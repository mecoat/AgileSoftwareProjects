//global variable for default periods
var defaultPeriodsSet; 

function teachersStart(){
    //draw the teacher list to screen
    drawTeachers(); 
    //add the event listener for the teacher Add button
    addTeacherEventListener (); 

    //add the event listener for the subjects Load button
    addSubLoadEventListener (); 
    //add the event listeners for the subject style buttons
    addSubStyleEventListener (); 

    //add the event listener for the Save button
    addSaveEventListener ();
    //add the event listener for the Template button
    addTemplateEventListener ();

    //add the event listener for the Delete button
    addDeleteEventListener ();
    //add the event listener for the Teacher table
    addTeacherTableEventListener ();

    //add the event listener to the set defaults button
    addDefaultsEventListener ();

    //add the event listener for the Load button
    addLoadEventListener (); 

}

///////////////////

function drawTeachers(){
    
    //get the element we want to make changes to
    var teacherList = document.getElementById("teacherList");
    //create an empty placeholder for content
    var teacherListContent = "";

    //add the header row to the placeholder to add to the DOM
    teacherListContent += createHeaderRow(teacherHeaders);

    //iterate through global variable of subjectdata to create rows in the table
    for (var i = 0; i < teacherData.length; i++){
        teacherListContent += createTableRow(teacherData[i], teacherData[i][0]);
    }

    //add the content to the DOM
    teacherList.innerHTML = teacherListContent;

    //check there's an event listener on them all
    addTeacherTableEventListener ()
}

///////////////////////////////////

function addTeacherTableEventListener (){
    //get the item that has "subList" as an ID
    var table = document.getElementById("teacherList");
    var tableRows = table.getElementsByTagName("tr");

    for (var i = 0; i < tableRows.length; i++){
        tableRows[i].addEventListener("click", function(){ rowSelect(this, tableRows); });
    }
}

/////////////////


function addTeacherEventListener (){
    //get the items that has "addSub" as an ID
    var button = document.getElementById("addTeacher");
    //add the event listener to call addSub on click
    button.addEventListener("click", addTeacher);

}

function addTeacher(){
    //hide errors if already showing
    hideError("shortInput");
    hideError("notAlphaNum");
    hideError("alreadyAdded");

    //get values
    var teacherCode = document.getElementById("teacherCode").value;
    var teacherName = document.getElementById("teacherName").value;
    var teacherPeriods = document.getElementById("teacherPeriods").value;
    var primarySub = document.getElementById("primarySub").value;
    var secondarySub = document.getElementById("secondarySub").value;
    var subjectStyle = getActiveElement("subjectStyle");

    //basic html sanitisation
    teacherCode = mySanitise(teacherCode);
    teacherName = mySanitise(teacherName);
    teacherPeriods = mySanitise(teacherPeriods);

    //get code and subject
    var primarySubLoc = findData(subjectData, primarySub, subjectStyle);
    var secondarySubLoc = findData(subjectData, secondarySub, subjectStyle);
    
    //empty value/not found in subjects list
    if (primarySubLoc == undefined){
        //show the error
        showError("shortInput")
        //end the function
        return
    }

    var primarySubArr = subjectData[primarySubLoc];

    if (secondarySubLoc != undefined){
        var secondarySubArr = subjectData[secondarySubLoc];
        var teachArr = [teacherCode, teacherName, teacherPeriods, primarySubArr[0], primarySubArr[1], secondarySubArr[0], secondarySubArr[1]];
    }
    else {
        var teachArr = [teacherCode, teacherName, teacherPeriods, primarySubArr[0], primarySubArr[1]];
        
    }

    var added = addTeachArray(teachArr);

    //reset entry boxes if added to array
    if (added == "completed"){
        document.getElementById("teacherName").value = "";
        document.getElementById("teacherCode").value = "";
        if (defaultPeriodsSet > 0){
            document.getElementById("teacherPeriods").value = defaultPeriodsSet;
            hideError("noPeriods")
        }
        else {
            document.getElementById("teacherPeriods").value = "";
            showError("noPeriods");
        }
        document.getElementById("primarySub").value = "";
        document.getElementById("secondarySub").value = "";
    }

    //redraw table
    drawTeachers();

}

////////////////////////

function addSubLoadEventListener (){
    //get the check it button
    var chkUploadBtn = document.getElementById("checkItSub");

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
    //hide error message
    hideError("noSubjects")

    //get the input file
    var input = document.querySelector('input#subFile[type="file"]');
    var file = input.files[0];

    for (var i = subjectData.length - 1; i >= 0; i--){
        deleteRow(subjectData, subjectData[i])
    }

    loadCSV(file, subHeaders, teacherDropDowns, addSubArray, [0,1]);
    
    
}

function teacherDropDowns (){
    var subIndex = getActiveElement("subjectStyle");

    addToDropdown("primarySub", subjectData, subIndex);
    addToDropdown("secondarySub", subjectData, subIndex);
}

////////////////

function addSubStyleEventListener (){
    //get all the items that have "subjectStyle" as a Class name
    var subStyleBtns = document.getElementsByClassName("subStyleBtn");
    //iterate through them and add an event listener that calls the activate button with appropriate parameters when clicked
    for (var i = 0; i < subStyleBtns.length; i++){
        subStyleBtns[i].addEventListener("click", function(){ swapActiveButton(this.name, this.value); });
    }
}

///////////////////

function addSaveEventListener (){
    //get the items that has "save" as an ID
    var button = document.getElementById("save");

    button.addEventListener("click", processTeachersToSave);
}

function processTeachersToSave(){

    //placeholder array
    var teachersHolding = [];

    //iterate through teachers array the table is made from...
    for (var i = 0; i < teacherData.length; i++){
        var tempData = [];
       
        //add teacher code
        tempData.push(teacherData[i][0]);
        //add teacher name
        tempData.push(teacherData[i][1]);
        //add teacher periods
        tempData.push(teacherData[i][2]);
        //add primary subject code
        tempData.push(teacherData[i][3]);

        //if there's a secondary subject...
        if (teacherData[i][5] != undefined){
            //add secondary subject code
            tempData.push(teacherData[i][5]);
        }
        
        //add temp data to placeolder
        teachersHolding.push(tempData)
    }

    saveAsCSV(teacherFileHeaders,teachersHolding, "teachers.csv")
}

///////////////

function addTemplateEventListener (){
    //get the items that has "addSub" as an ID
    var button = document.getElementById("template");

    button.addEventListener("click", function() {saveAsCSV(teacherFileHeaders,[], "teachers.csv")});
}

////////////

////////////////////

function addDeleteEventListener (){
    //get the item that has "delSub" as an ID
    var button = document.getElementById("delTeacher");

    button.addEventListener("click", delTeacher);
}

function delTeacher(){
    //get the item that has "delTeacher" as an ID
    var table = document.getElementById("teacherList");
    var tableRows = table.getElementsByTagName("tr");

    for (var i = 0; i < tableRows.length; i++){
        if (getActiveRow(tableRows[i])){
            //find the location of the data in the array
            var dataLoc = findData(teacherData, tableRows[i].id, 0);
            
            //delete the row from the array 
            deleteRow(teacherData, teacherData[dataLoc])

            //redraw the table
            drawTeachers();

            //end function
            return;
        }    
    }
}

////////////////

function addDefaultsEventListener (){
    //get the items that has "setDefaults" as an ID
    var button = document.getElementById("setDefaults");

    button.addEventListener("click", setDefaults);
}

function setDefaults(){
    //hide error if already showing
    hideError("noPeriods")
    hideError("noSubjects")

    var subjectsSet = checkForSubjects();

    //if no subjects found end function
    if (subjectsSet == "noSubjects"){
        return
    }

    var defaultPeriods = document.getElementById("defaultPeriods").value;

    //if default periods isn't larger than 0, or isn't an integer
    //(floors of non-integer don't equal the same as the input)...
    if (defaultPeriods < 1 || floor(defaultPeriods) != defaultPeriods ){
        //display error
        showError("noPeriods")
        //end function
        return
    }
    //larger than 0
    else {
        //set value to readd to form 
        defaultPeriodsSet = defaultPeriods;
        //set value in form
        document.getElementById("teacherPeriods").value = defaultPeriodsSet;
        //hide error
        hideError("noPeriods");

    }

    //set dropdows by subject style
    teacherDropDowns();

}

/////////////////

function addLoadEventListener (){
    //get the check it button
    var chkUploadBtn = document.getElementById("checkIt");

     //get the file input element
     var teacherFile = document.getElementById("teacherFile");
 
     //add an event listener that adds active to the Change it button
     // to make it more obvious to press once user has uploaded a file
     teacherFile.addEventListener("change", function(){ 
        chkUploadBtn.classList.add("active"); 
     });

    //listen for a click to load the data from the file
    chkUploadBtn.addEventListener("click", loadTeacherFile);
}

function loadTeacherFile(){
    //get the input file
    var input = document.querySelector('input#teacherFile[type="file"]');
    var file = input.files[0];

    for (var i = teacherData.length - 1; i >= 0; i--){
        deleteRow(teacherData, teacherData[i])
    }

    drawTeachers();

    // loadCSV(file, teacherFileHeaders, drawTeachers, addTeachArray);
    loadCSV(file, teacherFileHeaders, drawTeachers, loadTeachersArray, [0,1,2,3]);
    
}