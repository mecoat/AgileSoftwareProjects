function drawTimetable(){
    //get the element we want to make changes to
    var timetable = document.getElementById("templateTimetable");
    //create an empty placeholder for content
    var timetableContent = "";

    //Get weeks from document    
    var weeks = document.getElementsByName("weeks");
    //call function to get weeks in timetable
    var noWeeks = getActive (weeks);
    //add content to the placeholder to add to the DOM
    timetableContent += createHeaderRow(noWeeks);

    //Get periods from document    
    var periods = document.getElementsByName("periods");
    //call function to get weeks in timetable
    var noPeriods = getActive (periods);
    
    //get lunch from DOM
    var lunch = document.getElementsByName("lunch");
    //get lunchtime with function
    var lunchTime = getActive(lunch);
    
    //get breaks from DOM
    var breaks = document.getElementsByName("breaks");
    //get number of breaks with function
    var noBreaks = getActive(breaks); 
    
    //if there's 1 or more breaks
    if (noBreaks > 0){
        //get first break from DOM
        var break1 = document.getElementsByName("break1");
        //get first breaktime with function
        var break1Time = getActive(break1); 
    }
    //if there's 2 breaks
    if (noBreaks > 1){
        //get second break from DOM
        var break2 = document.getElementsByName("break2");
        //get second breaktime with function
        var break2Time = getActive(break2); 
    }

    //get registration from DOM
    var regPeriods = document.getElementsByName("regPeriods");
    //get number of breaks with function
    var noRegPeriods = getActive(regPeriods); 

    //if there's 1 or more reg periods
    if (noRegPeriods > 0){
        //get first break from DOM
        var regPeriods1 = document.getElementsByName("regPeriods1");
        //get first breaktime with function
        var reg1Time = getActive(regPeriods1); 
    }
    //if there's 2 reg periods
    if (noRegPeriods > 1){
        //get second break from DOM
        var regPeriods2 = document.getElementsByName("regPeriods2");
        //get second breaktime with function
        var reg2Time = getActive(regPeriods2); 
    }

    var reg1LunchTime = 0;
    //check if reg1 is adjacent to lunch, find out if before/After
    if (reg1Time && reg1Time == lunchTime){
        //get registration from DOM
        var regLunch1 = document.getElementsByName("regLunch1");
        //get number of breaks with function
        reg1LunchTime = getActive(regLunch1); 
    }

    var reg1BreakTime = 0;
    //check if reg1 is adjacent to lunch, find out if before/after
    if (reg1Time && reg1Time == lunchTime){
        //get registration from DOM
        var regBreak1 = document.getElementsByName("regBreak1");
        //get number of breaks with function
        reg1BreakTime = getActive(regBreak1); 
    }

    var reg2LunchTime = 0;
    //check if reg2 is adjacent to lunch, find out if before/After
    if (reg2Time && reg2Time == lunchTime){
        //get registration from DOM
        var regLunch2 = document.getElementsByName("regLunch2");
        //get number of breaks with function
        reg2LunchTime = getActive(regLunch2); 
    }


    var reg2BreakTime = 0;
    //check if reg2 is adjacent to lunch, find out if before/after
    if (reg2Time && reg1Time == lunchTime){
        //get registration from DOM
        var regBreak2 = document.getElementsByName("regBreak2");
        //get number of breaks with function
        reg2BreakTime = getActive(regBreak2); 
    }

    //add content to the placeholder to add to the DOM
    for (var i = 0; i < noPeriods; i++){
        if ((i==reg1Time && (reg1LunchTime ==0 || reg1LunchTime == "Before")) 
        || (i == reg2Time&& (reg2LunchTime ==0 || reg2LunchTime == "Before"))){
            timetableContent += createTimetableRow(noWeeks, "Registration");
        }
        if (i==lunchTime){
            timetableContent += createTimetableRow(noWeeks, "Lunch", "Lunch");
        }
        if (i==break1Time || i==break2Time){
            timetableContent += createTimetableRow(noWeeks, "Break", "Break");
        }
        timetableContent += createTimetableRow(noWeeks, i+1);
    } 
    
    if (reg1Time == "Last" || reg2Time == "Last"){
        timetableContent += createTimetableRow("Registration");
    }

    //add the content to the DOM
    timetable.innerHTML = timetableContent;
}

function getActive (input){
    var retVal;
    for (var i=0; i<input.length; i++){
        if (input[i].getAttribute("class").includes("active")){
            retVal = input[i].value;
        }
    }
    return (retVal);
}

function createHeaderRow(noWeeks){
    //array to hold days of the week for the header
    var days = ["Mon", "Tue", "Wed", "Thu", "Fri"]

    var returnVal = "";
    returnVal += "<tr><td></td>"
    for (var i = 0; i < noWeeks; i++){
        for (var j = 0; j < days.length; j++){
            returnVal +=  "<th>" + days[j] + (i+1) +"</th>"
        }
    }
    returnVal += "</tr>"
    return(returnVal);
}

function createTimetableRow(noWeeks, period, text = ""){
    //array to hold days of the week for the header
    var days = 5;

    var returnVal = "";
    returnVal += "<tr><th>" + period + "</th>"
    for (var i = 0; i < noWeeks; i++){
        for (var j = 0; j < days; j++){
            returnVal +=  "<td>" + text + "</td>";
        }
    }
    returnVal += "</tr>"
    return(returnVal);
}

//////////

function activateButton(name, value){
    //Get section from document    
    var section = document.getElementsByName(name);
    //call function to get weeks in timetable
    var oldActive = getActive (section);
    //check is user has selected currently active setting
    if (oldActive == value){
        //do nothing if they have
        return;
    } else { //otherwise...

        //delete old active class
        section = deleteActive(section, oldActive);
        //set new active class
        section = addActive(section, value);

        //redraw the timetable because something has changed
        drawTimetable();
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
    return (section);
}

////////////////////

function addTTEventListeners (){
    //get all the items that have "timetableBtn" as a Class name (I've only added it to buttons)
    var ttButtons = document.getElementsByClassName("timetableBtn")
    //iterate through them and add an event listener that calls the activate button with appropriate parameters when clicked
    for (var i = 0; i < ttButtons.length; i++){
        ttButtons[i].addEventListener("click", function(){ activateButton(this.name, this.value); });
    }

    var saveBtn = document.getElementById("save");
    saveBtn.addEventListener("click", saveTTOutput);

    var uploadBtn = document.getElementById("upload");
    uploadBtn.addEventListener("click", loadTTInput);
}

function ttStart(){
    //draw the timetable to screen
    drawTimetable(); 
    //add the event listeners for the timetable choice buttns
    addTTEventListeners (); 
}

/////////////////

function createOutput(){
    var output = {};
    output.weeks = getActive(document.getElementsByName("weeks"));
    output.periods = getActive(document.getElementsByName("periods"));
    output.lunch = getActive(document.getElementsByName("lunch"));
    output.breaks = getActive(document.getElementsByName("breaks"));
    output.break1 = getActive(document.getElementsByName("break1"));
    output.break2 = getActive(document.getElementsByName("break2"));
    output.regPeriods = getActive(document.getElementsByName("regPeriods"));
    output.regPeriods1 = getActive(document.getElementsByName("regPeriods1"));
    output.regBreak1 = getActive(document.getElementsByName("regBreak1"));
    output.regLunch1 = getActive(document.getElementsByName("regLunch1"));
    output.regPeriods2 = getActive(document.getElementsByName("regPeriods2"));
    output.regBreak2 = getActive(document.getElementsByName("regBreak2"));
    output.regLunch2 = getActive(document.getElementsByName("regLunch2"));

    return output;
}

function saveTTOutput(){
    var outputData = createOutput();
    saveJSON(outputData, 'timetable.json');
}

//function needs to be asynchronous to load the input file
async function loadTTInput(){
    //get the input file
    var input = document.querySelector('input[type="file"]');
    var file = input.files[0];

    //check that the input file is the correct type
    if (file.name.endsWith(".json")){
        //find the error message element...
        var invalid = document.getElementById("invalidFile");
        //check that it doesn't have "hide" in the class (it's currently showing)
        if (!invalid.classList.contains("hide")){
            //add hide to the class to make the message go away again
            invalid.classList.add("hide");
        }

        //now start processing file contents
        var fileText = await file.text();

        
    }
    //if not correct type...
    else {
        //find the error message element...
        var invalid = document.getElementById("invalidFile");
        //and remove the "hide" from the cass list to make it display
        invalid.classList.remove("hide");
    }
    
    // console.log(fileText);
   
}


////////////////////////////
//required so that p5 will work
function setup(){}
