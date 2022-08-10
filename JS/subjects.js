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

    //get the element we want to make changes to
    var subList = document.getElementById("subList");
    //create an empty placeholder for content
    var subListContent = "";

    //headers to display
    var headers = ["Subject Code", "Subject Name"];

    //add the header row to the placeholder to add to the DOM
    subListContent += createHeaderRow(headers);

    


    //add the content to the DOM
    subList.innerHTML = subListContent;
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