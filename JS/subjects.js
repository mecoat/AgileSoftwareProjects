function subStart(){
    //draw the subject list to screen
    drawSubjects(); 
    //add the event listeners for the timetable choice buttns
    // addTTEventListeners (); 
    //hide optional values
    // hideOnTTPage();
    //add event listener to user input
    // addUIEventListeners ();
}

function drawSubjects(){

}




//creates html content for Subjects header row
function createHeaderRow(noWeeks){
    //array to hold days of the week for the header
    var days = ["Mon", "Tue", "Wed", "Thu", "Fri"]

    //placeholder to hold the html
    var returnVal = "";
    //add start
    returnVal += "<tr><td></td>"
    //iterate through number of weeks
    for (var i = 0; i < noWeeks; i++){
        //iterate through number of days
        for (var j = 0; j < days.length; j++){
            //add an element for each day per week
            returnVal +=  "<th>" + days[j] + (i+1) +"</th>"
        }
    }
    //add ending
    returnVal += "</tr>"
    //return the placeholder 
    return(returnVal);
}

//creates standard rows of the timeable
function createTimetableRow(noWeeks, period, text = ""){
    //variable of number of days of the week
    var days = 5;
    
    //placeholder to hold the html
    var returnVal = "";
    //add start text
    returnVal += "<tr><th>" + period + "</th>"
    //iterate through the number of weeks
    for (var i = 0; i < noWeeks; i++){
        //iterate through number of days (to draw correct number of boxes)
        for (var j = 0; j < days; j++){
            //add content (including text inside if needed)
            returnVal +=  "<td>" + text + "</td>";
        }
    }
    //add ending
    returnVal += "</tr>"
    //return row html
    return(returnVal);
}