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

function loadCSV(file, headers, subjectData){
    console.log (file)
}