function classesStart(){

    //add the event listener for the subjects Load button
    addSubLoadEventListener (); 

    //draw the subject list to screen
    // drawTeachers(); 
    //add the event listener for the teacher Add button
    // addTeacherEventListener (); 

    
    //add the event listeners for the subject style buttons
    // addSubStyleEventListener (); 

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

/////////////////////////

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

    loadCSV(file, subHeaders, teacherDropDowns, addSubArray, [0,1]);
    
    
}

function teacherDropDowns (){
    var subIndex = getActiveElement("subjectStyle");

    addToDropdown("classSub", subjectData, subIndex);
}
