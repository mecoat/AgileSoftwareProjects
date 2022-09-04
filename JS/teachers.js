//glsubHeadersobal variable to hold teacher data
var teacherData = [];
//headers
var teacherHeaders = ["Teacher Code", "Teacher Name", "Teaching Sessions", "Main Subject Code", "Main Subject Name", "Secondary Subject Code", "Secondary Subject Name"];
//file headers
var teacherFileHeaders = ["Teacher Code", "Teacher Name", "Teaching Sessions", "Main Subject Code", "Secondary Subject Code"];

function addTeachArray(values){
    values = trimValues(values);
    var teacherCode = values[0];
    var teacherName = values[1];
    var teachingSessions = values[2];
    var primarySubCode = values[3];
    var primarySubName = values[4];

    //display error if input incomplete (secondary subject is not required)
    if (teacherCode.length < 1 || teacherName.length < 1 || 
        primarySubCode.length < 1 || primarySubName.length < 1 || 
        teachingSessions < 1 || teachingSessions == undefined || floor(teachingSessions) != teachingSessions){
        //show the error to the user
        showError("shortInput");
        //end function as can do no more
        return "error";
    }

    //Display error if teacher Code is not alphanumeric
    var checkTeacherCode = checkAlphaNum(teacherCode);
    if (checkTeacherCode == "error"){
        showError("notAlphaNum");

        //end function as can do no more
        return "error";
    }
   
    //check if teacher code is already in array (making both lower case to check as not necesarrily case sensitive in SMS)
    for (var i = 0; i < teacherData.length; i++){
        if (teacherCode.toLowerCase() == teacherData[i][0].toLowerCase()){
            showError("alreadyAdded");
            //end function as can do no more
            return "error";
        }
    }

    //add values to global variable
    addToArray(teacherData, values);

    return "completed";
}

/////////////////

function loadTeachersArray(values){

    //add primary subject code
    var primaryCode = values[3].trim();

    //if there's a secondary subject...
    if (values[4] != undefined){
        //add secondary subject code
        var secondaryCode = values[4].trim();
        var secondarySubLoc = findData(subjectData, secondaryCode, 0);

    }
    //get code and subject
    var primarySubLoc = findData(subjectData, primaryCode, 0);

    //empty value/not found in subjects list
    if (primarySubLoc == undefined){
        //show the errors
        showError("shortInput");
        //end the function
        return "error";
    }

    var primarySubArr = subjectData[primarySubLoc];
    
    //if secondary subject found
    if (secondarySubLoc != undefined){
        var secondarySubArr = subjectData[secondarySubLoc];
        var teachArr = [values[0], values[1], values[2], primarySubArr[0], primarySubArr[1], secondarySubArr[0], secondarySubArr[1]];
    }
    //if secondary subject code added, but not found in Subjects List
    else if (secondarySubLoc == undefined && values[4] != undefined && values[4] != "\r") {
        //show the errors
        showError("shortInput");
        //end the function
        return "error";
    }
    else {
        var teachArr = [values[0], values[1], values[2], primarySubArr[0], primarySubArr[1]];
        
    }

    var added = addTeachArray(teachArr);

    return added;
}