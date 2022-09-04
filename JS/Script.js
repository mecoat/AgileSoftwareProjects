//required so that p5 will work
function setup(){}

///////////////////

//creates html content for header row
function createHeaderRow(headers){
    //placeholder to hold the html
    var returnVal = "";
    //add start
    returnVal += "<tr>"
    //iterate through values in headers
    for (var i = 0; i < headers.length; i++){
        //add an element for each day per week
        returnVal +=  "<th>" + headers[i] + "</th>"
    }
    //add ending
    returnVal += "</tr>"
    //return the placeholder 
    return(returnVal);
}


//creates html content for header row
function createTableRow(rowData, idName = ""){
    //placeholder to hold the html
    var returnVal = "";
    //add start
    returnVal += "<tr id = '"
    returnVal += idName
    returnVal += "'>"
    //iterate through values in headers
    for (var i = 0; i < rowData.length; i++){
        //add an element for each day per week
        returnVal +=  "<td>" + rowData[i] + "</td>"
    }
    //add ending
    returnVal += "</tr>"
    //return the placeholder 
    return(returnVal);
}

function addToArray(array, valToAdd){
    var comparitor = 0;
    
    //if array is empty, add the emelent in
    if (array.length == 0){
        array.push(valToAdd);
    }
    //if array has only 1 value...
    else if (array.length == 1){
        var searchVal = valToAdd[comparitor].toLowerCase();
        var initComp = array[0][comparitor].toLowerCase();

        //if lower than first value add to front
        if (searchVal < initComp){
            array.unshift(valToAdd)
        }
        //otherwise must be bigger, add to end
        else {
            array.push(valToAdd);
        }

    }
    //if array has 2 or more values...
    else{
        var searchVal = valToAdd[comparitor].toLowerCase();
        var initComp = array[0][comparitor].toLowerCase();
        var endComp = array[array.length -1][comparitor].toLowerCase();
        
        //if lower than first value add to front
        if (searchVal < initComp){
            array.unshift(valToAdd)
        }
        //if larger than last value, add to end
        else if (searchVal > endComp){
            array.push(valToAdd);
        }
        //otherwise must be somewhere in the middle
        else {
            for (var i = 0; i < array.length -1 ; i++){
                var compVal1 = array[i][comparitor].toLowerCase();
                var compVal2 = array[i+1][comparitor].toLowerCase();
                
                if (searchVal > compVal1 && searchVal < compVal2){
                    array.splice(i+1, 0, valToAdd);
                    return;
                }
                
            }
        }
        
    }
    
}

function saveAsCSV(header, data, fileName){
    var csvData = "";

    csvData += csvPrepRow(header);

    for (var i = 0; i < data.length; i++){
        csvData += csvPrepRow(data[i]);
    }


    var hiddenElement = document.createElement('a');  
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);  
    hiddenElement.target = '_blank';  
    //provide the name for the CSV file to be downloaded  
    hiddenElement.download = fileName;  
    hiddenElement.click();  

}

function csvPrepRow (dataToAdd){
    var rowData ="";
    for (var i = 0; i < dataToAdd.length; i++){
        rowData += dataToAdd[i];
        if (i < dataToAdd.length -1){
            rowData += ","
        }
        
    }

    rowData += "\n"

    return rowData;
}

//function needs to be asynchronous to load the input file
async function loadCSV(file, headers, drawFunc, addArrayFunc, required = [0]){

    //hide upload error messages if they were showing
    hideError("invalidFile");
    hideError("invalidHeaders");
    hideError("invalidContents");
    hideError("invalidRow");

    //hide individual errors if already showing
    hideError("shortInput");
    hideError("notAlphaNum");
    hideError("alreadyAdded");


    //check that the input file is the correct type
    if (!file.name.endsWith(".csv")){
        //Show correct error if not csv
        showError("invalidFile");
        //leave function
        return;
    }

    //right file type now, so...

    //now start processing file contents
    var fileText = await file.text();

    //split into separate values for each new line
    fileText = fileText.split("\n");

    var fileArray = [];
    //turn these values into separate array objects
    for (var i = 0; i < fileText.length; i++){
        var sanitised = mySanitise(fileText[i])
        fileArray.push(sanitised.split(","))
    }

    var fileHeader = [];
    fileHeader = fileArray[0];
        
    //check the file header is correct
    for (var i = 0; i < fileHeader.length; i++){
        //check for longer headers in file
        if (typeof headers[i] == undefined){
            showError("invalidHeaders");
            return;
        }
        //check for incorect values afer strippng white space from edges
        if (fileHeader[i].trim() != headers[i].trim()){
            showError("invalidHeaders");
            
            return;
        }
        //check if the file headers are too short
        if (i == fileHeader.length -1 
            && headers[i+1] != undefined){
            showError("invalidHeaders");
            return;
        }
    }

    //remove empty values
    for (var i = fileArray.length-1; i > 0; i--){
        if (fileArray[i].length == 1){
            var tempVal = fileArray[i][0].trim();
            if (tempVal.length == 0){
                //remove from array
                fileArray.splice(i, 1);
            }
        }
    }

    //everything's basically OK with the file, so...

    //put the elements (without the header) into the array
    for (var i = 1; i < fileArray.length; i++){
        //look for a short row
        if (fileArray[i].length < required[length-1]){

            //completey empty, should never trigger
            if (fileArray[i].length == 1){
                var tempVal = fileArray[i][0].trim();
                if (tempVal.length == 0){
                    //skip this iteration
                    continue;
                }
            }
            showError("invalidContents");
            //end this iteration
            continue;

        }

        //check for an empty required value
        var reqErrors = 0;
        for (var j = 0; j < required.length; j++){
            if (fileArray[i][required[j]].length < 1){
                reqErrors ++;
            }
        }
        //check value of req errors against length of required values
        if (reqErrors == required.length){
            //skip this iteration
            continue;
        }
        else if (reqErrors > 0){
            showError("invalidContents");
            //end this iteration
            continue;
        }

        //check if data is too long (there may be commas in the last column)
        if (fileArray[i].length > headers.length){
            //join the end values together
            for (var j = headers.length; j < fileArray[i].length; j++){
                fileArray[i][headers.length - 1].concat(",", fileArray[i][j]);
            }
            //remove the other elements from the array
            while (fileArray[i].length > headers.length){
                fileArray[i].pop();
            }
        }

        //add the element to the data array in the argument
        var errorAdding = addArrayFunc(fileArray[i]);

        if (errorAdding == "error"){
            showError("invalidRow");
        }

    }

    drawFunc();
       
}

function showError(idName){
    //find the error message element...
    var invalid = document.getElementById(idName);
    //and remove the "hide" from the class list to make it display 
    // (if not already showing)
    if (invalid.classList.contains("hide")){
        invalid.classList.remove("hide");
    }
}

function hideError(idName){
    //find the error message element...
    var invalid = document.getElementById(idName);
    //check that it doesn't have "hide" in the class (it's currently showing)
    if (!invalid.classList.contains("hide")){
        //add hide to the class to make the message go away again
        invalid.classList.add("hide");
    }
}

function deleteRow(array, row){

    for (var i = 0; i < array.length; i++){
        if (array[i] == row){
            array.splice(i, 1);
        }
    }
}

function mySanitise(value){
    return value.replace(/<|>/g," ");
}

////////////////////


function getActiveRow(row){
    //if there's no class list it can't be active
    if (row.classList.length == 0){
        return false;
    }
    //if it's already active...
    try {
        
        if (row.getAttribute("class").includes("active")){
            return true;
        }
    } 
    //not already active
    catch{
        return false;
    }
}

function rowSelect(row, allRows){
    //if it's already active...
    if (getActiveRow(row)){
        //remove the active value - deselect
        row.classList.remove("active");
    }
    //not already active
    else {
        //so search to see if someting else is...
        for (var i = 0; i < allRows.length; i++){
            if (getActiveRow(allRows[i])){
                allRows[i].classList.remove("active");
                break;
            }
        }
        row.classList.add("active");
    }

}

////////////////

function findData(array, searchVal, valLoc){
    for (var i = 0; i < array.length; i++){
        if (array[i][valLoc] == searchVal){
            return i;
        }
    }
}


////////

//gets the active value within elements with a name
function getActiveElement(name){
    //Get elements from document    
    var elements = document.getElementsByName(name);
    //call function to get active value
    var active = getActive (elements);
    return active;
}


//iterates through inputs and returns current ative value
function getActive (input){
    var retVal;
    for (var i=0; i<input.length; i++){
        if (input[i].getAttribute("class").includes("active")){
            retVal = input[i].value;
        }
    }
    return (retVal);
}


///////////

function trimValues(values){
    //trim blank spaces 
    for (var i = 0; i < values.length; i ++){
        values[i] = values[i].trim();
    }
    return values;
}

/////////////

function checkAlphaNum(checkVal){
    var regEx = /^[0-9a-zA-Z]+$/;
    if (!checkVal.match(regEx)){
        return "error";
    }
}

////////////////////

function addToDropdown(ddID, array, index){
    var element = document.getElementById(ddID);

    var content = "";

    content += '<option value=""></option>';

    for (var i = 0; i < array.length; i++){
        content += '<option value="';
        content += array[i][index];
        content += '">';
        content += array[i][index];
        content +='</option>';

    }
    element.innerHTML = content;
}

/////////////

function swapActiveButton(name, value){
    //Get section from document    
    var section = document.getElementsByName(name);
    //call function to get active value
    var oldActive = getActive (section);
    //check if user has selected currently active setting
    if (oldActive == value){
        //do nothing if they have
        return false;
    } else { //otherwise...

        //delete old active class
        section = deleteActive(section, oldActive);
        //set new active class
        section = addActive(section, value);
        return true;
    }
}

function deleteActive (section, value){
    //iterate through the section
    for (var i=0; i<section.length; i++){
        //find the value
        if (section[i].getAttribute("value")==value){
            //change the classname so that it no longer includes active
            section[i].classList.remove("active");
        }
    }
    //return the amended section
    return (section);
}

function addActive (section, value){
    //iterate through the section
    for (var i=0; i<section.length; i++){
        //find the value
        if (section[i].getAttribute("value")==value){
            //change the class name so that it includes active
            section[i].classList.add("active");
        }
    }
    //return the amended section
    return (section);
}


/////////////////

function checkForSubjects(){
    //if length of SubjectData is less than 1 (empty)...
    if (subjectData.length < 1){
        //display the error message
        showError("noSubjects");
        return "noSubjects";
    }
    //otherwise, must have data...
    else {
        //hide the error message
        hideError("noSubjects");
        return "subjectsFound";
    }
}

/////////////

function multiRowSelect (row, allRows){

    var groupName = row.getElementsByTagName("td")[0].innerHTML;

    //if it's already active...
    if (getActiveRow(row)){
        //remove the active value - deselect
        for (var i = 1; i < allRows.length; i++){
            // row.classList.remove("active");
            if (allRows[i].getElementsByTagName("td")[0].innerHTML == groupName){
                allRows[i].classList.remove("active");
            }

        }

        
    }
    //not already active
    else {
        //so search to see if someting else is...
        for (var i = 0; i < allRows.length; i++){
            if (getActiveRow(allRows[i])){
                //... and remove the active status there
                allRows[i].classList.remove("active");
            }
        }
        

        //add active to the band in question
        for (var i = 1; i < allRows.length; i++){
            if (allRows[i].getElementsByTagName("td")[0].innerHTML == groupName){
                allRows[i].classList.add("active");
            }

        }
    }

}

/////////////////

//filler function - does nothing (used as input to loadCSV if no drawing required)
function emptyDraw(){
    return
}

/////////////


function showSection(name){
    //get all elements with the class
    var section = document.getElementsByClassName(name);
     //iterate thrugh the elements 
     for (var i = 0; i < section.length; i++){
        //add hide to the class of the element
        section[i].classList.remove("hide");
    }
}