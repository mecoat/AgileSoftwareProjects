//glsubHeadersobal variable to hold teacher data
// var teacherData = [["ASm", "Amelia Smith", 35, "En", "English", "Dr", "Drama"], ["JJO", "Jane Jones", 35, "Ma", "Maths"]];
var teacherData = [];
//headers
var teacherHeaders = ["Teacher Code", "Teacher Name", "Teaching Sessions", "Primary Subject Code", "Primary Subject Name", "Secondary Subject Code", "Secondary Subject Name"];


function addTeachArray(values){


    teacherData.push(values);
    // var subCode = values[0].trim();
    // var subName = values[1].trim();
    // //display error if input incomplete
    // if (subCode.length < 1 || subName.length < 1){
    //     showError("shortInput");
    //     //end function as can do no more
    //     return "error";
    // }

    // //Display error if Subject Code is not alphanumeric
    // var regEx = /^[0-9a-zA-Z]+$/;
    // if (!subCode.match(regEx)){
    //     showError("notAlphaNum");

    //     //end function as can do no more
    //     return "error";
    // }

    // //variable to hold the values
    // var values = [];

    // //check if subject code is already in array (making both lower case to check as not case sensitive in SMS)
    // for (var i = 0; i < subjectData.length; i++){
    //     if (subCode.toLowerCase() == subjectData[i][0].toLowerCase()){
    //         showError("alreadyAdded");
    //         //end function as can do no more
    //         return "error";
    //     }
    // }

    // //add values to array
    // values.push(subCode);
    // values.push(subName);

    // //add values to global variable
    // addToArray(subjectData, values);

    // return "completed";
}

/////////////////