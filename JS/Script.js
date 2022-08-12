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
async function loadCSV(file, headers, data, drawFunc, addArrayFunc, required = [0]){

    //hide error messages if they were showing
    hideError("invalidFile");
    hideError("invalidHeaders");
    hideError("invalidContents");

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
        fileArray.push(fileText[i].split(","))
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
            //check for incorect values
            if (fileHeader[i] != headers[i]){
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

        //everything's basically OK with the file, so...

        //put the elements (without the header) into the array
        for (var i = 1; i < fileArray.length; i++){
            //check for an empty required value
            var reqErrors = 0;
            for (var j = 0; j < required.length; j++){
                if (fileArray[i][j].length < 1){
                    reqErrors ++;
                }
            }
            //check value of req errors against length of required values
            if (reqErrors == required.length){
                //skip this iteration
                continue;
            }
            if (reqErrors > 0){
                showError("invalidContents");
                //end this iteration
                continue;
            }
            

            //check that there's enough data in a row
            if (fileArray[i].length < headers.length){
                //if there isn't, show error message
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
            addArrayFunc(fileArray[i])
                // data.push(fileArray[i]);
        }
        console.log(data)
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
