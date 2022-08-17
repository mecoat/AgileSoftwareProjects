//glsubHeadersobal variable to hold teacher data
// var teacherData = [["ASm", "Amelia Smith", 35, "En", "English", "Dr", "Drama"], ["JJO", "Jane Jones", 35, "Ma", "Maths"]];
var teacherData = [];
//headers
var teacherHeaders = ["Teacher Code", "Teacher Name", "Teaching Sessions", "Primary Subject Code", "Primary Subject Name", "Secondary Subject Code", "Secondary Subject Name"];


function addTeachArray(values){

    values = trimValues(values);

    var teacherCode = values[0];
    var teacherName = values[1];
    var teachingSessions = values[2];
    var primarySubCode = values[3];
    var primarySubName = values[4];
    var secondarySubCode = values[5];
    var secondarySubName  = values[6];

    //display error if input incomplete (secondary subject is not required)
    if (teacherCode.length < 1 || teacherName.length < 1 || 
        primarySubCode.length < 1 || primarySubName.length < 1 || 
        teachingSessions < 1 || teachingSessions == undefined){
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