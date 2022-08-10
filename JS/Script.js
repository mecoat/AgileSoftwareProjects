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
