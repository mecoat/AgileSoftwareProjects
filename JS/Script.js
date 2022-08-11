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
function createTableRow(rowData){
    //placeholder to hold the html
    var returnVal = "";
    //add start
    returnVal += "<tr>"
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
    array.push(valToAdd);
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
async function loadCSV(file, headers, subjectData){

    //check that the input file is the correct type
    if (file.name.endsWith(".csv")){
        //hide error messages if they were showing
        // hideError("invalidFile");
        // hideError("invalidContents");

        //now start processing file contents
        var fileText = await file.text();

        //split into separate values for each new line
        fileText = fileText.split("\n");

        var fileArray = [];
        //turn these values into separate array objects
        for (var i = 0; i < fileText.length; i++){
            fileArray.push(fileText[i].split(","))
        }

        if (fileArray[0] != headers){
            showError("invalidHeaders")
        }
        // console.log(fileArray[0][0])
        // //try to convert string to JSON
        // try{
        //     var fileParsed = JSON.parse(fileText);
        // }
        // //if conversion fails...
        // catch{
        //     //display the error message
        //     showError("invalidFile");
        //     //end function
        //     return;
        // }
        
        //iterate through the parsed file contents
        // for (var key in fileParsed){
        //     //check if the key is a name in elements in the page
        //     if (document.getElementsByName(key).length > 0){
        //         //Check the value is valid for that name
        //         if (checkActiveValid(key, fileParsed[key])) {
        //             // Change the active value as though the user had clicked the button
        //             activateButton(key, fileParsed[key]);
        //         }
        //         //if value is invalid
        //         else {
        //             //Alert the user of a potential issue
        //             showError("invalidContents");
        //         }
                
        //     }
        //     //if key is not a name of an element in the file ...
        //     else {            
        //         //Alert the user of a potential issue
        //         showError("invalidContents");
        //     }
        // }
        

    }
    //if not correct type...
    else {
        showError("invalidFile");
    }
       
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
