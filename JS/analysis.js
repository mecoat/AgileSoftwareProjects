//global variables for processing
//table headers
var subjectTableHeaders = ["Subject Code", "Subject", "Main Teacher Periods"];
var swapsTableHeaders = ["Teacher Code", "Teacher", "Periods", "Subject Code", "Subject"]
//arrays for data
var subjectPeriods = [];
var teacherSubjectPeriods = [];
var totalledSubjectPeriods = [];
var teacherSwaps = [];


function analysisStart(){

    //add the event listener for the subjects Load button
    addSubLoadEventListener (); 

    //add the event listener for the teachers Load button
    addTeacherLoadEventListener (); 

    //add the event listener for the subjects Load button
    addClassesLoadEventListener (); 


    // //add the event listeners for the subject style buttons
    // addSubStyleEventListener (); 

    // //add the event listener for the Set Block Button
    // addBlockEventListener ();

    // //add the event listener for the Set Band Button
    // addBandEventListener ();

    // //add the event listener for the Set Class Button
    // addClassEventListener ();

    // //draw the band list to screen
    // drawBand (); 

    // //add the event listener for the Class Delete button (within Band)
    // addClassDeleteEventListener ();
    // //add the event listener for the Band table
    // addBandTableEventListener ();

    // //add the event listener for the Save Band button
    // addSaveBandEventListener (); 

    // //draw the block list to screen
    // drawBlock (); 

    // //add the event listener for the Band Delete button (within Block)
    // addBandDeleteEventListener ();
    // //add the event listener for the Block table
    // addBlockTableEventListener ();

    // //add the event listener for the Save Block button
    // addSaveBlockEventListener (); 

    // //draw the total list to screen
    // drawTotal(); 

    // //add the event listener for the total table
    // addTotalTableEventListener (); 
    // //add the event listener for the Band Delete button (within Total)
    // addBlockDeleteEventListener ();
    

    // //add the event listener for the Save button
    // addSaveEventListener ();
    // //add the event listener for the Template button
    // addTemplateEventListener ();

    // //add the event listener for the Load button
    // addLoadEventListener (); 

}

//////////

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

    loadCSV(file, subHeaders, emptyDraw, addSubArray, [0,1]);
    
}

////////////////

function addTeacherLoadEventListener (){
    //get the check it button
    var chkUploadBtn = document.getElementById("checkItTeacher");

     //get the file input element
     var teacherFile = document.getElementById("teacherFile");
 
     //add an event listener that adds active to the Change it button
     // to make it more obvious to press once user has uploaded a file
     teacherFile.addEventListener("change", function(){ 
        chkUploadBtn.classList.add("active"); 
     });

    //listen for a click to load the data from the file
    chkUploadBtn.addEventListener("click", loadTeacherFile);
}

function loadTeacherFile(){
    //get the input file
    var input = document.querySelector('input#teacherFile[type="file"]');
    var file = input.files[0];

    for (var i = teacherData.length - 1; i >= 0; i--){
        deleteRow(teacherData, teacherData[i])
    }

    //check the subjects file is loaded
    if (subjectData.length < 1){
        //show the errors
        showError("noSubjects");
        //end the function
        return ;
    }

    loadCSV(file, teacherFileHeaders, emptyDraw, loadTeachersArray, [0,1,2,3]);
    
}

/////////////////

function addClassesLoadEventListener (){
    //get the check it button
    var chkUploadBtn = document.getElementById("checkItClasses");

     //get the file input element
     var classesFile = document.getElementById("classesFile");
 
     //add an event listener that adds active to the Change it button
     // to make it more obvious to press once user has uploaded a file
     classesFile.addEventListener("change", function(){ 
        chkUploadBtn.classList.add("active"); 
     });

    //listen for a click to load the data from the file
    chkUploadBtn.addEventListener("click", loadClassesFile);
}

//needs to be aswync so we can await the load before we do a final check 
// for periods within the bands within the blocks
async function loadClassesFile(){
    //get the input file
    var input = document.querySelector('input#classesFile[type="file"]');
    var file = input.files[0];

    for (var i = allBlockData.length - 1; i >= 0; i--){
        deleteRow(allBlockData, allBlockData[i])
    }

    //hide errors
    hideError("periodsDontMatch")

    //check the subjects file is loaded
    if (subjectData.length < 1){
        //show the errors
        showError("noSubjects");
        //end the function
        return ;
    }

    await loadCSV(file, allBlockFileHeaders, emptyDraw, loadTotalArray, [0,1,2,3,4]);
    
    //once all loaded, check periods in bands in blocks all match
    checkBandPeriods();
}

////////////////////

