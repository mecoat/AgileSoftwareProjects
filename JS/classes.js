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
        
        //if block no match, ignore 
        if (allBlockData[i][0].toLowerCase() != blockName.toLowerCase()){
            continue;
        }

        for (var j = 0; j < allBlockData[i][1].length; j++){
            //if band no match, ignore
            if (allBlockData[i][1][j][0].toLowerCase() != bandName.toLowerCase()){
                continue;
            }
            for (var k = 0; k < allBlockData[i][1][j][1].length; k++){
                if (classCode.toLowerCase() == allBlockData[i][1][j][1][k][0].toLowerCase()){
                    showError("alreadyAdded");
                    //end function as can do no more
                    return "error";
                }
            }
        }

    }

    //add values to global variable
    addToBlocksArray(values);

    return "completed";
}

function addToBlocksArray (values){

    //array is empty
    if (allBlockData.length == 0){
        //add the block
        addToArray(allBlockData, [values[0], []]);
        
        //add the class data to temp array
        var tempArray = []
        for (var i = 2; i < values.length; i++){
            tempArray.push(values [i]);
        }

        //add the band and class data to the block
        addToArray(allBlockData[0][1], [values[1], [tempArray]]);
    }
    //array not empty
    else {
        //get the class data into an array to be placed once determined where 
        // it belongs
        var tempArray = []
        for (var i = 2; i < values.length; i++){
            tempArray.push(values [i]);
        }

        //iterate through blocks
        for (var i = 0; i < allBlockData.length; i ++){
            //if block name the same
            if (allBlockData[i][0].toLowerCase() == values[0].toLowerCase()){
                //iterate through the bands
                for (var j = 0; j < allBlockData[i][1].length; j++){
                    //if band name the same
                    if (allBlockData[i][1][j][0].toLowerCase() == values[1].toLowerCase()){
                        //add class to band
                        addToArray(allBlockData[i][1][j][1], tempArray);
                        //end function
                        return
                    }
                    //if not, and last iteration...
                    else if (j == allBlockData[i][1].length -1){
                        //add band and class because not in there
                        addToArray(allBlockData[i][1], [values[1], [tempArray]]);
                        //end function
                        return
                    }
                } // end j for loop
            }
            //if not, and last iteration ...
            else if (i == allBlockData.length - 1){
                //add all because not in there
                //add the block
                addToArray(allBlockData, [values[0], []]);
                //add the band and class data to the block
                addToArray(allBlockData[0][1], [values[1], [tempArray]]);
                // addToArray(allBlockData, [values[0], [values[1], [tempArray]]]);
                //end function
                return
            }
        }
    }
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