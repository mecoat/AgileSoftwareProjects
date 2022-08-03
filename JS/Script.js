//required so that p5 will work
function setup(){}

///////////////////

//draw the template timetable to the screen
function drawTimetable(){
    //get the element we want to make changes to
    var timetable = document.getElementById("templateTimetable");
    //create an empty placeholder for content
    var timetableContent = "";

    //call function to get weeks in timetable
    var noWeeks = getActiveElement("weeks")
    //add content to the placeholder to add to the DOM
    timetableContent += createHeaderRow(noWeeks);

    //call function to get periods in timetable
    var noPeriods = getActiveElement ("periods");
    
    //get lunchtime with function
    var lunchTime = getActiveElement("lunch");
    
    //get number of breaks with function
    var noBreaks = getActiveElement("breaks"); 
    
    //if there's 1 or more breaks
    if (noBreaks > 0){
        //get first breaktime with function
        var break1Time = getActiveElement("break1"); 
    }
    //if there's 2 breaks
    if (noBreaks > 1){
        //get second breaktime with function
        var break2Time = getActiveElement("break2"); 
    }

    //get number of registration periods with function
    var noRegPeriods = getActiveElement("regPeriods"); 

    //if there's 1 or more reg periods
    if (noRegPeriods > 0){
        //get first reg period with function
        var reg1Time = getActiveElement("regPeriods1"); 
    }
    //if there's 2 reg periods
    if (noRegPeriods > 1){
        //get second reg period with function
        var reg2Time = getActiveElement("regPeriods2"); 
    }

    var reg1LunchTime = 0;
    //check if reg1 is adjacent to lunch, find out if before/After
    if (reg1Time && reg1Time == lunchTime){
        //get value with function
        reg1LunchTime = getActiveElement("regLunch1"); 
    }

    var reg1BreakTime = 0;
    //check if reg1 is adjacent to break, find out if before/after
    if ((reg1Time && reg1Time == break1Time) ||
     (reg1Time && reg1Time == break1Time)){
        //get value with function
        reg1BreakTime = getActiveElement("regBreak1"); 
    }

    var reg2LunchTime = 0;
    //check if reg2 is adjacent to lunch, find out if before/After
    if (reg2Time && reg2Time == lunchTime){
        //get value with function
        reg2LunchTime = getActiveElement("regLunch2"); 
    }


    var reg2BreakTime = 0;
    //check if reg2 is adjacent to break, find out if before/after
    if ((reg2Time && reg1Time == break1Time) ||
     (reg2Time && reg1Time == break2Time)){
        //get value with function
        reg2BreakTime = getActiveElement("regBreak2"); 
    }

    //add content to the placeholder to add to the DOM
    for (var i = 0; i < noPeriods; i++){
        
        if ((i == reg1Time && i==lunchTime 
            && checkReg(reg1LunchTime))
         ||
         (i == reg1Time && i==break1Time 
            && checkReg(reg1BreakTime))
         ||
         (i == reg1Time && i==break2Time 
            && checkReg(reg1BreakTime))
         ||
         (i == reg1Time && i!=lunchTime && i!=break1Time && i!=break2Time)){
            timetableContent += createTimetableRow(noWeeks, "Registration");
        }

        if ((i == reg2Time && i==lunchTime 
            && checkReg(reg2LunchTime))
         ||
         (i == reg2Time && i==break1Time 
            && checkReg(reg2BreakTime))
         ||
         (i == reg2Time && i==break2Time 
            && checkReg(reg2BreakTime))
         ||
         (i == reg2Time && i!=lunchTime && i!=break1Time && i!=break2Time)){
            timetableContent += createTimetableRow(noWeeks, "Registration");
        }


        if (i==lunchTime){
            timetableContent += createTimetableRow(noWeeks, "Lunch", "Lunch");
        }
        if (i==break1Time || i==break2Time){
            timetableContent += createTimetableRow(noWeeks, "Break", "Break");
        }
        
        if ((i == reg1Time && i==lunchTime 
            && !checkReg(reg1LunchTime))
         ||
         (i == reg1Time && i==break1Time 
            && !checkReg(reg1BreakTime))
         ||
         (i == reg1Time && i==break2Time 
            && !checkReg(reg2BreakTime))){
            timetableContent += createTimetableRow(noWeeks, "Registration");
        }

        if ((i == reg2Time && i==lunchTime 
            && !checkReg(reg2LunchTime))
         ||
         (i == reg2Time && i==break1Time 
            && !checkReg(reg2BreakTime))
         ||
         (i == reg2Time && i==break2Time 
            && !checkReg(reg2BreakTime))){
            timetableContent += createTimetableRow(noWeeks, "Registration");
        }


        timetableContent += createTimetableRow(noWeeks, i+1);
    } 
    
    if (reg1Time == "Last" || reg2Time == "Last"){
        timetableContent += createTimetableRow(noWeeks, "Registration");
    }

    //add the content to the DOM
    timetable.innerHTML = timetableContent;
}

//returns true for before or 0, and false otherwise
function checkReg (regVal){
    if (regVal == 0 || regVal == "Before") {
        return true;
    };
    return false;
}

function getActiveElement(name){
    //Get elements from document    
    var elements = document.getElementsByName(name);
    //call function to get active value
    var active = getActive (elements);
    return active;
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

        //hide optional elements as appropriate
        hideOnTTPage();
        //show optional elements as appropriate
        showOnTTPage();
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
    //hide optional values
    hideOnTTPage();
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
        //hide error messages if they were showing
        hideError("invalidFile");
        hideError("invalidContents");

        //now start processing file contents
        var fileText = await file.text();
        //try to convert string to JSON
        try{
            var fileParsed = JSON.parse(fileText);
        }
        //if conversion fails...
        catch{
            //display the error message
            showError("invalidFile");
            //end function
            return;
        }
        
        //iterate through the parsed file contents
        for (var key in fileParsed){
            //check if the key is a name in elements in the page
            if (document.getElementsByName(key).length > 0){
                //Check the value is valid for that name
                if (checkActiveValid(key, fileParsed[key])) {
                    // Change the active value as though the user had clicked the button
                    activateButton(key, fileParsed[key]);
                }
                //if value is invalid
                else {
                    //Alert the user of a potential issue
                    showError("invalidContents");
                }
                
            }
            //if key is not a name of an element in the file ...
            else {            
                //Alert the user of a potential issue
                showError("invalidContents");
            }
        }
        

    }
    //if not correct type...
    else {
        showError("invalidFile");
    }
    
    // console.log(fileText);
   
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

function checkActiveValid(name, value){
    //get all elements with the name
    var section = document.getElementsByName(name);
    //iterate thrugh the elements 
    for (var i = 0; i < section.length; i++){
        //check if the value matches the desired value
        if (section[i].value == value){
            //return true if found
            return true;
        }
    }
    //return false if not found at all
    return false;
}

////////////////////////////


function hideElements(name, value){
    //get all elements with the name
    var section = document.getElementsByName(name);
    //iterate thrugh the elements 
    for (var i = section.length - 1; i >= 0; i--){
        //check if the value matches or it higher than the input value
        if (section[i].value == "Last") {
            continue;
        } else if (section[i].value >= value){
            //add hide to the class of the element
            section[i].classList.add("hide");
        }
        //otherwise ...
        else {
            //...end the function to save power
            return
        }
    }
}

function hideSection(name){
    //get all elements with the class
    var section = document.getElementsByClassName(name);
     //iterate thrugh the elements 
     for (var i = 0; i < section.length; i++){
        //add hide to the class of the element
        section[i].classList.add("hide");
    }
}

function hidePeriods(){
    var periods = getActiveElement("periods");
    if (periods < 8){
        hideElements("lunch", periods);
        if (getActiveElement("breaks") >= 1){
            hideElements("break1", periods);
        }
        if (getActiveElement("breaks") == 2){
            hideElements("break2", periods);
        }
        if (getActiveElement("regPeriods") >= 1){
            hideElements("regPeriods1", periods);
        }
        if (getActiveElement("regPeriods") == 2){
            hideElements("regPeriods2", periods);
        }
        
    }
}

function hideBreaks(){
    var breaks = getActiveElement("breaks");
    if (breaks <= 1){
        hideSection("break2");
    }
    if (breaks < 1){
        hideSection("break1");
    }
}

function hideReg(){
    var reg = getActiveElement("regPeriods");
    var lunch = getActiveElement("lunch");
    var noBreaks = getActiveElement("breaks"); 
    var break1Time = getActiveElement("break1"); 
    var break2Time = getActiveElement("break2"); 

    

    if (reg <= 1){
        hideSection("reg2");
    }
    if (reg < 1){
        hideSection("reg1");
    }

    if (reg == 2){
        var reg2Time = getActiveElement("regPeriods2"); 
        if (reg2Time != lunch){
            hideSection("regLunch2");
        }
        if ((noBreaks == 2 && reg2Time != break2Time) 
         || (noBreaks >= 1 && reg2Time != break1Time)){
            hideSection("regBreak2");
        }
    }

    if (reg >= 1){
        var reg1Time = getActiveElement("regPeriods1"); 
        if (reg1Time != lunch){
            hideSection("regLunch1");
        }
        if ((noBreaks == 2 && reg1Time != break2Time) 
         || (noBreaks >= 1 && reg1Time != break1Time)){
            hideSection("regBreak1");
        }
    }
}

function hideOnTTPage(){
    hidePeriods();

    hideBreaks();

    hideReg();
}




////////////////////////////


function showElements(name, value){
    //get all elements with the name
    var section = document.getElementsByName(name);
    //iterate thrugh the elements 
    for (var i = section.length -1; i >= 0; i--){
        //check if the value is lower than the input value
        if (section[i].value < value || section[i].value == "Last"){
            //add hide to the class of the element
            section[i].classList.remove("hide");
        } 
    }
}

function showSection(name){
    //get all elements with the class
    var section = document.getElementsByClassName(name);
     //iterate thrugh the elements 
     for (var i = 0; i < section.length; i++){
        //add hide to the class of the element
        section[i].classList.remove("hide");
    }
}

function showPeriods(){
    var periods = getActiveElement("periods");
    if (periods > 4){
        showElements("lunch", periods);
        if (getActiveElement("breaks") >= 1){
            showElements("break1", periods);
        }
        if (getActiveElement("breaks") == 2){
            showElements("break2", periods);
        }
        if (getActiveElement("regPeriods") >= 1){
            showElements("regPeriods1", periods);
        }
        if (getActiveElement("regPeriods") == 2){
            showElements("regPeriods1", periods);
        }
        
    }
}

function showBreaks(){
    var breaks = getActiveElement("breaks");
    if (breaks > 1){
        showSection("break2");
        hidePeriods();
    }
    if (breaks >= 1){
        showSection("break1");
        hidePeriods();
    }
}

function showReg(){
    var reg = getActiveElement("regPeriods");
    var lunch = getActiveElement("lunch");
    var noBreaks = getActiveElement("breaks"); 
    var break1Time = getActiveElement("break1"); 
    var break2Time = getActiveElement("break2"); 


    if (reg > 1){
        showSection("reg2");
        hideSection("regLunch2");
        hideSection("regBreak2");
        hidePeriods();
    }
    if (reg >= 1){
        showSection("reg1");
        hideSection("regLunch1");
        hideSection("regBreak1");
        hidePeriods();
    }


    if (reg == 2){
        var reg2Time = getActiveElement("regPeriods2"); 
        if (reg2Time == lunch){
            showSection("regLunch2");
        }
        if ((noBreaks == 2 && reg2Time == break2Time) 
         || (noBreaks >= 1 && reg2Time == break1Time)){
            showSection("regBreak2");
        }
    }

    if (reg >= 1){
        var reg1Time = getActiveElement("regPeriods1"); 
        if (reg1Time == lunch){
            showSection("regLunch1");
        }
        if ((noBreaks == 2 && reg1Time == break2Time) 
         || (noBreaks >= 1 && reg1Time == break1Time)){
            showSection("regBreak1");
        }
    }
}

function showOnTTPage(){
    showPeriods();

    showBreaks();

    showReg();

}



