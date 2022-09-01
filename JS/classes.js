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
            }//end if block name check
            //if not, and last iteration ...
            else if (i == allBlockData.length - 1){

                //add band because not in there
                //add the block
                addToArray(allBlockData, [values[0], []]);

                //find where the entry went
                for (var j =0; j < allBlockData.length; j++){
                    if (allBlockData[j][0] == values[0]){
                        //add the band and class
                        addToArray(allBlockData[j][1], [values[1], [tempArray]]);
                        //end function
                        return
                    }
                }//end j loop
                
            }//end block check
        }//end i loop
    }//end else
    
}

///////////////

function checkBandPeriods(){

    //iterate through each block in the Master array
    for (var i = 0; i < allBlockData.length; i++){

        var blockPeriods = 0;

        //iterate through each band within
        for (var j = 0; j < allBlockData[i][1].length; j++){

            var bandPeriods = 0;

            //iterate through each class within
            for (var k = 0; k < allBlockData[i][1][j][1].length; k++){
                var classPeriods = parseInt(allBlockData[i][1][j][1][k][1]);
                if (j == 0) {

                    blockPeriods += classPeriods;
                }
                
                bandPeriods += classPeriods;

                //if on the last class in the band and blockPeriods and Band Periods don't match...
                if (k == allBlockData[i][1][j][1].length - 1 && blockPeriods != bandPeriods){
                    //show error
                    showError("periodsDontMatch");

                    //put in a try catch block for other pages
                    try {
                        //select the error blocks on the table
                        selectErrorRows(allBlockData[i][0])
                    }
                    catch {

                    }
                    

                }
            }
        }
    }

}

function selectErrorRows (errorBlock){
    //get the item that has "totalList" as an ID
    var table = document.getElementById("totalList");
    //get the rows
    var tableRows = table.getElementsByTagName("tr");
    //iterate through the rows
    for (var i = 1; i < tableRows.length; i++){
        //get the block name from the table
        var groupName = tableRows[i].getElementsByTagName("td")[0].innerHTML;
        //if it's the same as the errorBlock input
        if (groupName == errorBlock){
            //mark as active
            tableRows[i].classList.add("active");
        }
    }
    
}