//global variables to hold values for processing on classes page
//block
var currentBlockName = "";
var currentBlockPeriods = 0;
var blockData = [];
//band
var currentBandName = "";
var bandData = [];


function classesStart(){

    //add the event listener for the subjects Load button
    addSubLoadEventListener (); 
    //add the event listeners for the subject style buttons
    addSubStyleEventListener (); 

    //add the event listener for the Set Block Button
    addBlockEventListener ();

    //draw the subject list to screen
    // drawTeachers(); 
    //add the event listener for the teacher Add button
    // addTeacherEventListener (); 

    
    

    //add the event listener for the Save button
    // addSaveEventListener ();
    //add the event listener for the Template button
    // addTemplateEventListener ();

    //add the event listener for the Delete button
    // addDeleteEventListener ();
    //add the event listener for the Teacher table
    // addTeacherTableEventListener ();

    //add the event listener to the set defaults button
    // addDefaultsEventListener ();

    //add the event listener for the Load button
    // addLoadEventListener (); 

}

////////////////////////

function addSubLoadEventListener (){
    //get the check it button
    var chkUploadBtn = document.getElementById("checkItSub");

     //get the file input element
     var subFile = document.getElementById("subFile");
 
     //add an event listener that adds active to the Change it button
     // to make it more obvious to press once user has uploaded a file
     subFile.addEventListener("change", function(){ 
        chkUploadBtn.classList.add("active"); 
     });

    //listen for a click to load the data from the file
    chkUploadBtn.addEventListener("click", loadSubFile);
}

function loadSubFile(){
    //hide error message
    hideError("noSubjects")

    //get the input file
    var input = document.querySelector('input#subFile[type="file"]');
    var file = input.files[0];

    for (var i = subjectData.length - 1; i >= 0; i--){
        deleteRow(subjectData, subjectData[i])
    }

    loadCSV(file, subHeaders, subjectDropDowns, addSubArray, [0,1]);
    
    
}

function subjectDropDowns (){
    var subIndex = getActiveElement("subjectStyle");

    addToDropdown("classSub", subjectData, subIndex);
}

////////////////

function addSubStyleEventListener (){
    //get all the items that have "subjectStyle" as a Class name
    var subStyleBtns = document.getElementsByClassName("subStyleBtn");
    //iterate through them and add an event listener that calls the activate button with appropriate parameters when clicked
    for (var i = 0; i < subStyleBtns.length; i++){
        subStyleBtns[i].addEventListener("click", function(){ 
            //change current active setting
            swapActiveButton(this.name, this.value); 

            //set dropdowns by subject style
            subjectDropDowns ();

        });
    }
}

////////////////////

function addBlockEventListener (){
    //get the item that has "setBlock" as an ID
    var button = document.getElementById("setBlock");
    //add the event listener
    button.addEventListener("click", setBlock);
}

function setBlock (){
    //hide error messages
    hideError("blockShortInput");
    hideError("blockNameComma");
    hideError("blockPeriodsInvalid");
    
    //get values from input
    var blockName = document.getElementById("blockName").value;
    var blockPeriods = document.getElementById("blockPeriods").value;

    //sanitise blockname
    blockName = mySanitise(blockName);

    //verify entries are both there
    if (blockName.length < 1 || blockPeriods.length < 1){
        //display error
        showError("blockShortInput");
        //end function
        return
    }

    //verify name has no commas
    if (blockName.includes(",")){
        //display error
        showError("blockNameComma");
        //end function
        return
    }

    //verify periods is positive integer 
    if (blockPeriods < 0 || floor(blockPeriods) != blockPeriods){
        //display error
        showError("blockPeriodsInvalid");
        //end function
        return
    }

    //set the values to global variables
    currentBlockName = blockName;
    currentBlockPeriods = blockPeriods;

    //amend text in html to display set values to user
    document.getElementById("currentBlock").innerHTML = currentBlockName;
    document.getElementById("currentBlockPeriods").innerHTML = currentBlockPeriods;
    
}