//global variable to hold all blocks
var allBlockData = [];
var allBlockHeaders = ["Block Name", "Band Name", "Class Code", "Periods", "Subject Code", "Subject Name"]
var allBlockFileHeaders = ["Block Name", "Band Name", "Class Code", "Periods", "Subject Code"]

///////////

function loadTotalArray (values){

    //get subject code
    var subCode = values[4].trim();

    //get subject location
    var subLoc = findData(subjectData, subCode, 0);

    //empty value/not found in subjects list
    if (subLoc == undefined){
        //show the errors
        showError("shortInput");
        //end the function
        return "error";
    }

    var subArr = subjectData[subLoc];
    
    var blockArr = [values[0], values[1], values[2], values[3], subArr[0], subArr[1]];

    var added = addMainArray(blockArr);

    return added;
}

function addMainArray(values){
    console.log (values)
    // values = trimValues(values);
    // var teacherCode = values[0];
    // var teacherName = values[1];
    // var teachingSessions = values[2];
    // var primarySubCode = values[3];
    // var primarySubName = values[4];

    // //display error if input incomplete (secondary subject is not required)
    // if (teacherCode.length < 1 || teacherName.length < 1 || 
    //     primarySubCode.length < 1 || primarySubName.length < 1 || 
    //     teachingSessions < 1 || teachingSessions == undefined || floor(teachingSessions) != teachingSessions){
    //     //show the error to the user
    //     showError("shortInput");
    //     //end function as can do no more
    //     return "error";
    // }

    // //Display error if teacher Code is not alphanumeric
    // var checkTeacherCode = checkAlphaNum(teacherCode);
    // if (checkTeacherCode == "error"){
    //     showError("notAlphaNum");

    //     //end function as can do no more
    //     return "error";
    // }
   
    // //check if teacher code is already in array (making both lower case to check as not necesarrily case sensitive in SMS)
    // for (var i = 0; i < teacherData.length; i++){
    //     if (teacherCode.toLowerCase() == teacherData[i][0].toLowerCase()){
    //         showError("alreadyAdded");
    //         //end function as can do no more
    //         return "error";
    //     }
    // }

    // //add values to global variable
    // addToArray(teacherData, values);

    return "completed";
}