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

    values = trimValues(values);

    var blockName = values[0];
    var bandName = values[1];
    var classCode = values[2];
    var periods = values[3];
    var subCode = values[4];
    var subName = values[5];

    //display error if input incomplete 
    if (blockName.length < 1 || bandName.length < 1 || 
        classCode.length < 1 || subCode.length < 1 || subName.length < 1 || 
        periods < 1 || periods == undefined || floor(periods) != periods){
        //show the error to the user
        showError("shortInput");
        //end function as can do no more
        return "error";
    }

    //check if class code is already in array in that band and block (making both lower case to check as not necesarrily case sensitive in SMS)
    for (var i = 0; i < allBlockData.length; i++){
        console.log (allBlockData[i][0])
        //if block no match, ignore 
        if (allBlockData[i][0].toLowerCase() != blockName.toLowerCase()){
            console.log ("continuing - no  match")
            continue;
        }
        for (var j = 0; j < allBlockData[i][1].length; j++){
            console.log (allBlockData[i][0])
            //if band no match, ignore
            if (allBlockData[i][1][j][0].toLowerCase() != bandName.toLowerCase()){
                console.log ("continuing - no match")
                continue;
            }
            for (var k = 0; k < allBlockData[i][1][j][1].length; k++){
                console.log(allBlockData[i][1][j][1][k][0])
                if (classCode.toLowerCase() == allBlockData[i][1][j][1][k][0].toLowerCase()){
                    showError("alreadyAdded");
                    //end function as can do no more
                    return "error";
                }
            }
        }



        // if (teacherCode.toLowerCase() == teacherData[i][0].toLowerCase()){
        //     showError("alreadyAdded");
        //     //end function as can do no more
        //     return "error";
        // }
    }

    //add values to global variable
    addToBlocksArray(values);

    return "completed";
}

function addToBlocksArray (values){
    // var comparitor = 0;

    // //if array is empty, add the emelent in
    // if (array.length == 0){
    //     array.push(valToAdd);
    // }
    // //if array has only 1 value...
    // else if (array.length == 1){
    //     var searchVal = valToAdd[comparitor].toLowerCase();
    //     var initComp = array[0][comparitor].toLowerCase();

    //     //if lower than first value add to front
    //     if (searchVal < initComp){
    //         array.unshift(valToAdd)
    //     }
    //     //otherwise must be bigger, add to end
    //     else {
    //         array.push(valToAdd);
    //     }

    // }
    // //if array has 2 or more values...
    // else{
    //     var searchVal = valToAdd[comparitor].toLowerCase();
    //     var initComp = array[0][comparitor].toLowerCase();
    //     var endComp = array[array.length -1][comparitor].toLowerCase();
        
    //     //if lower than first value add to front
    //     if (searchVal < initComp){
    //         array.unshift(valToAdd)
    //     }
    //     //if larger than last value, add to end
    //     else if (searchVal > endComp){
    //         array.push(valToAdd);
    //     }
    //     //otherwise must be somewhere in the middle
    //     else {
    //         for (var i = 0; i < array.length -1 ; i++){
    //             var compVal1 = array[i][comparitor].toLowerCase();
    //             var compVal2 = array[i+1][comparitor].toLowerCase();
                
    //             if (searchVal > compVal1 && searchVal < compVal2){
    //                 array.splice(i+1, 0, valToAdd);
    //                 return;
    //             }
                
    //         }
    //     }
        
    // }
    
    
}