function teachersStart(){
    //draw the subject list to screen
    drawTeachers(); 
    //add the event listener for the subject Add button
    addTeacherEventListener (); 
    //add the event listener for the Save button
    // addSaveEventListener ();
    //add the event listener for the Load button
    // addLoadEventListener (); 
    //add the event listener for the Template button
    // addTemplateEventListener ();
    //add the event listener for the Delete button
    // addDeleteEventListener ();
    //add the event listener for the Teacher table
    addTeacherTableEventListener ();
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
    var primarySubArr = findData(subjectData, primarySub, subjectStyle)
    var secondarySubArr = findData(subjectData, secondarySub, subjectStyle)

    // var teachArr = [teacherCode, teacherName, teacherPeriods, primarySubArr[0], primarySubArr[1], secondarySubArr[0], secondarySubArr[1]];
    var teachArr = [teacherCode, teacherName, teacherPeriods, primarySub, primarySub, secondarySub, secondarySub];

    teacherData.push(teachArr);

    var added = 0//addSubArray(subArr);

    //clear entry boxes if added to array
    if (added == "completed"){
        document.getElementById("subCode").value = "";
        document.getElementById("subject").value = "";
    }

    //redraw table
    drawTeachers();

}
