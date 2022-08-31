//global variables for processing
//table headers
var subjectTableHeaders = ["Subject Code", "Subject", "Main Teacher Periods"];
var swapsTableHeaders = ["Teacher Code", "Teacher", "Periods", "Subject Code", "Subject"]
//arrays for data
var subjectPeriods = {};
var teacherMainSubjectPeriods = {};
var totalledSubjectPeriods = {};
var teacherSecondSubjectPeriods = {};
var teacherSwaps = [];


function analysisStart(){

    //add the event listener for the subjects Load button
    addSubLoadEventListener (); 

    //add the event listener for the teachers Load button
    addTeacherLoadEventListener (); 

    //add the event listener for the subjects Load button
    addClassesLoadEventListener (); 

    //add the event listeners for the Initial check button
    addInitialCheckEventListener (); 

    //draw the initial results table
    drawInitialTable ();

    //add the event listeners for the secondary check button
    addSecondCheckEventListener (); 

    //draw the secondary results table
    drawSecondTable ();

    //draw swaps table
    drawSwapsTable ();

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
    hideError("noSubjects");

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
    //hide error message
    hideError("noTeachers");

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
    //hide error message
    hideError("noClasses");

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

function addInitialCheckEventListener (){
    //get the check it button
    var initialChkBtn = document.getElementById("mainSubjects");

    //listen for a click to run the initial check
    initialChkBtn.addEventListener("click", initialCheck);
}

function initialCheck(){
    //hide any previos error messages
    hideError("noSubjects")
    hideError("noTeachers")
    hideError("noClasses")

    //check all data present...
    if (subjectData.length < 1){
        //show error message
        showError("noSubjects");
        //end function
        return
    }
    if (teacherData.length < 1){
        //show error message
        showError("noTeachers");
        //end function
        return
    }
    if (allBlockData.length < 1){
        //show error message
        showError("noClasses");
        //end function
        return
    }

    //Initialise subject codes to global objects as
    // key in object with value of 0
    for (var i = 0; i < subjectData.length; i++){
        var keyName = subjectData[i][0];

        subjectPeriods[keyName] = 0;
        teacherMainSubjectPeriods[keyName] = 0;
        
        teacherSecondSubjectPeriods[keyName] = 0;

    }

    //iterate through teacher array and total the periods available
    for (var i = 0; i < teacherData.length; i++){
        var newVal = teacherMainSubjectPeriods[teacherData[i][3]] + parseInt(teacherData[i][2]);
        teacherMainSubjectPeriods[teacherData[i][3]] = newVal;
    }

    //iterate through the classes data and total the eriods required
    for (var i = 0; i < allBlockData.length; i++){ //block
        for (var j = 0; j < allBlockData[i][1].length; j++){ //band
            for (var k = 0; k < allBlockData[i][1][j][1].length; k ++){ //class
                var newVal = subjectPeriods[allBlockData[i][1][j][1][k][2]] + parseInt(allBlockData[i][1][j][1][k][1]);
                subjectPeriods[allBlockData[i][1][j][1][k][2]] = newVal;
            }
        }
    }

    //work through subjectPeriods, check value against teacherMainSubjectPeriods
    // and add that to totalledSubjectPeriods
    for (key in subjectPeriods){

        if (subjectPeriods[key] > 0){
            var tempval = teacherMainSubjectPeriods[key] - subjectPeriods[key];
            totalledSubjectPeriods[key] = tempval;
        }
        
    }

    //draw the results table
    drawInitialTable();

    //show secondary analysis
    showSection("secondarySubjects");
    //rehide the error message within secondary analysis
    hideError("noInitial");

}

///////////

function drawInitialTable (){

    //get the element we want to make changes to
    var mainTable = document.getElementById("mainTable");
    //create an empty placeholder for content
    var mainTableContent = "";

    //add the header row to the placeholder to add to the DOM
    mainTableContent += createHeaderRow(subjectTableHeaders);

    //create an array of the data to display in the table
    var tempArray = [];
    for (key in totalledSubjectPeriods){
        var nameLoc = findData(subjectData, key, 0);
        tempArray.push([key, subjectData[nameLoc][1], totalledSubjectPeriods[key]]);
    }

    //iterate through global variable of teacherdata to create rows in the table
    for (var i = 0; i < tempArray.length; i++){
        mainTableContent += createTableRow(tempArray[i], tempArray[i][0]);
    }

    //add the content to the DOM
    mainTable.innerHTML = mainTableContent;

    //colour the table according to over/under staffed
    colourTable("mainTable");

}

function colourTable (tableID){
    var table = document.getElementById(tableID);
    var tableRows = table.getElementsByTagName("tr");

    for (var i = 1; i < tableRows.length; i++){

        var periodVal = tableRows[i].getElementsByTagName("td")[2].innerHTML;

        if (periodVal < 0){
            tableRows[i].classList.add("whiteBG");
        }
        else if (periodVal > 0){
            tableRows[i].classList.add("active")
        }
    }

}

///////////////////////////

function addSecondCheckEventListener (){
    //get the check it button
    var initialChkBtn = document.getElementById("secondarySubjects");

    //listen for a click to run the initial check
    initialChkBtn.addEventListener("click", secondCheck);
}

function secondCheck(){

    //hide any previous error messages
    hideError("noInitial")
    
    //check all data present...
    if (Object.keys(totalledSubjectPeriods).length < 1){
        //show error message
        showError("noInitial");
        //end function
        return
    }

    //variables of over and under subjects
    var overSubjects = {};
    var underSubjects = {};
    //list of potential secondary subjects from overstaffed subjects
    var extraPeriodsAvailable = [];

    //fill above objects
    for (key in totalledSubjectPeriods){
        //overstaffed
        if (totalledSubjectPeriods[key] > 0){
            overSubjects[key] = totalledSubjectPeriods[key];


            var extraTeacherSubjects = []
            extraTeacherSubjects.push(findTeachers(key));
            if (extraTeacherSubjects[0].length > 0){
                // console.log(extraTeacherSubjects)
                for (var i = 0; i < extraTeacherSubjects[0].length; i++){
                    extraPeriodsAvailable.push(extraTeacherSubjects[0][i])
                }
            }
            
        }
        //understaffed
        else if (totalledSubjectPeriods[key] < 0){
            underSubjects[key] = totalledSubjectPeriods[key];
        }
        
    }

    //check if secondary subjects for overstaffing subjects are in 
    // understaffed subjects and remove if not
    for (var i = extraPeriodsAvailable.length-1; i > -1; i--){
        //if it's not in...
        if (!(extraPeriodsAvailable[i][5] in underSubjects)){
            //remove teacher
            extraPeriodsAvailable.splice(i, 1);
        }
    }

    //create maps of main to secondary and secondary to main subjects 
    // so can keep track of spare hours 
    var mainToSecond = {};
    var secondToMain = {};

    for (var i = 0; i < extraPeriodsAvailable.length; i++){
        var key = extraPeriodsAvailable[i][3];
        var key2 = extraPeriodsAvailable[i][5];
        if (key in mainToSecond){
            mainToSecond[key]["count"] = mainToSecond[key]["count"] + 1;
            if (key2 in mainToSecond[key]){
                mainToSecond[key]["subjects"][key2] = mainToSecond[key]["subjects"][key2] + 1;
            }
            else {
                mainToSecond[key]["subjects"][key2] = 1;
            }

        }
        else {
            mainToSecond[key] = {};
            mainToSecond[key]["count"] = 1;
            mainToSecond[key]["subjects"] = {};
            mainToSecond[key]["subjects"][key2] = 1;
            mainToSecond[key]["hours"] = totalledSubjectPeriods[key];
            mainToSecond[key]["allocated"] = 0;
            mainToSecond[key]["allocatedHrs"] = 0;
        }

        if (key2 in secondToMain){
            secondToMain[key2]["count"] = secondToMain[key2]["count"] + 1;
            if (key in secondToMain[key2]){
                secondToMain[key2]["subjects"][key] = secondToMain[key2]["subjects"][key] + 1;
            }
            else {
                secondToMain[key2]["subjects"][key] = 1;
            }
        }
        else {
            secondToMain[key2] = {};
            secondToMain[key2]["count"] = 1;
            secondToMain[key2]["subjects"] = {};
            secondToMain[key2]["subjects"][key] = 1;
            secondToMain[key2]["allocated"] = 0;
            secondToMain[key2]["allocatedHrs"] = 0;
        }
    }

    // console.log("main")
    // console.log(mainToSecond)
    // console.log("second")
    // console.log(secondToMain)


    //create list of potential periods available to fill understaffed classes
    var potentialCover = {};
    for (var i = 0; i < extraPeriodsAvailable.length; i++){
        
        var keySecond = extraPeriodsAvailable[i][5];
        var keyMain = extraPeriodsAvailable[i][3];
        var hours = parseInt(extraPeriodsAvailable[i][2]);
        var teacher = extraPeriodsAvailable[i][0];

        //if this is the only teacher for the main subject then all hours can
        // be given to the secndary subject if needed
        if (mainToSecond[keyMain]["count"] == 1){
            //mark as allocated
            secondToMain[keySecond]["allocated"] = secondToMain[keySecond]["allocated"] + 1;
            secondToMain[keySecond]["allocatedHrs"] = secondToMain[keySecond]["allocatedHrs"] + hours;
            mainToSecond[keyMain]["allocated"] = mainToSecond[keyMain]["allocated"] + 1;
            mainToSecond[keyMain]["allocatedHrs"] = mainToSecond[keyMain]["allocated"] + hours;
            
            //if already in list
            if (keySecond in potentialCover){
                //add the hours on
                potentialCover[keySecond]["hours"] = potentialCover[keySecond]["hours"] + hours;
                //add the teacher code
                potentialCover[keySecond]["teachers"] = potentialCover[keySecond]["teachers"].push(teacher)
            }
            //not already in list
            else{ 
                //add to list
                potentialCover[keySecond] = {}
                potentialCover[keySecond]["teachers"] = [teacher]
                potentialCover[keySecond]["hours"] = 0;                
                // console.log(potentialCover[keySecond]["hours"])                

                potentialCover[keySecond]["hours"] = hours;
                // console.log(potentialCover[keySecond]["hours"])

            }
        } 
        // if only 1 subject for mainToSecnd and secondToMain, regardless of
        // the value of count, there is a 1-to-1 relationship between main
        // and secondary subjects for secondary subjects that are understaffed
        // with main subject teachers that are overstaffed
        else if (Object.keys(mainToSecond[keyMain]["subjects"]).length == 1 && 
            Object.keys(secondToMain[keySecond]["subjects"]).length == 1){
            //mark as allocated
            secondToMain[key2]["allocated"] = secondToMain[key2]["allocated"] + 1;
            secondToMain[key2]["allocatedHrs"] = secondToMain[key2]["allocatedHrs"] + hours;
            mainToSecond[keyMain]["allocated"] = mainToSecond[keyMain]["allocated"] + 1;
            mainToSecond[keyMain]["allocatedHrs"] = mainToSecond[keyMain]["allocated"] + hours;

            //if already in list
            if (keySecond in potentialCover){
                //add the hours on

                potentialCover[keySecond]["hours"] = potentialCover[keySecond]["hours"] + hours;



                //add the teacher code
                console.log(typeof(potentialCover[keySecond]["teachers"]))
                console.log(potentialCover[keySecond]["teachers"])
                console.log(potentialCover[keySecond])
                potentialCover[keySecond]["teachers"] = potentialCover[keySecond]["teachers"].push(teacher)
            }
            //not already in list
            else{ 
                //add to list
                potentialCover[keySecond] = {}
                potentialCover[keySecond]["teachers"] = [teacher]
                // potentialCover[keySecond]["hours"] = 0;
                // console.log(potentialCover[keySecond]["hours"])
                // console.log(typeof(potentialCover[keySecond]["hours"]))
                potentialCover[keySecond]["hours"] = hours;
                console.log(potentialCover[keySecond]["hours"])
                // console.log(typeof(potentialCover[keySecond]["hours"]))

            }
        }
        // if only one option for secondary subject, needs to come from there,
        // but also need to check if capacity (main will be able to do multiple 
        // secondary)
        else if (Object.keys(secondToMain[keySecond]["subjects"]).length == 1){

            //mark as allocated
            secondToMain[key2]["allocated"] = secondToMain[key2]["allocated"] + 1;
            secondToMain[key2]["allocatedHrs"] = secondToMain[key2]["allocatedHrs"] + hours;
            mainToSecond[keyMain]["allocated"] = mainToSecond[keyMain]["allocated"] + 1;
            mainToSecond[keyMain]["allocatedHrs"] = mainToSecond[keyMain]["allocated"] + hours;

            //if already in list
            if (keySecond in potentialCover){
                //add the hours on
                potentialCover[keySecond]["hours"] = potentialCover[keySecond]["hours"] + hours;
                //add the teacher code
                potentialCover[keySecond]["teachers"] = potentialCover[keySecond]["teachers"].push(teacher)
            }
            //not already in list
            else{ 
                //add to list
                potentialCover[keySecond] = {}
                potentialCover[keySecond]["hours"] = 0;
                potentialCover[keySecond]["hours"] = hours;
                potentialCover[keySecond]["teachers"] = [teacher]
            }
        }
        //otherwise must have multiple main subject options
        else {

        }
    }
    console.log(potentialCover)

    // console.log(overSubjects);
    // console.log(underSubjects);
    // console.log(extraPeriodsAvailable);
    


    // if (teacherData.length < 1){
    //     //show error message
    //     showError("noTeachers");
    //     //end function
    //     return
    // }
    // if (allBlockData.length < 1){
    //     //show error message
    //     showError("noClasses");
    //     //end function
    //     return
    // }

    // //Initialise subject codes to global objects as
    // // key in object with value of 0
    // for (var i = 0; i < subjectData.length; i++){
    //     var keyName = subjectData[i][0];

    //     subjectPeriods[keyName] = 0;
    //     teacherMainSubjectPeriods[keyName] = 0;
        
    //     teacherSecondSubjectPeriods[keyName] = 0;

    // }

    // //iterate through teacher array and total the periods available
    // for (var i = 0; i < teacherData.length; i++){
    //     var newVal = teacherMainSubjectPeriods[teacherData[i][3]] + parseInt(teacherData[i][2]);
    //     teacherMainSubjectPeriods[teacherData[i][3]] = newVal;
    // }

    // //iterate through the classes data and total the eriods required
    // for (var i = 0; i < allBlockData.length; i++){ //block
    //     for (var j = 0; j < allBlockData[i][1].length; j++){ //band
    //         for (var k = 0; k < allBlockData[i][1][j][1].length; k ++){ //class
    //             var newVal = subjectPeriods[allBlockData[i][1][j][1][k][2]] + parseInt(allBlockData[i][1][j][1][k][1]);
    //             subjectPeriods[allBlockData[i][1][j][1][k][2]] = newVal;
    //         }
    //     }
    // }

    // //work through subjectPeriods, check value against teacherMainSubjectPeriods
    // // and add that to totalledSubjectPeriods
    // for (key in subjectPeriods){

    //     if (subjectPeriods[key] > 0){
    //         var tempval = teacherMainSubjectPeriods[key] - subjectPeriods[key];
    //         totalledSubjectPeriods[key] = tempval;
    //     }
        
    // }

    // //draw the results table
    // drawInitialTable();

    // //show secondary analysis
    // showSection("secondarySubjects");

}

function findTeachers(key){
    var tempArray = []
    //iterate through teachers array
    for (var i = 0; i < teacherData.length; i ++){
        if (teacherData[i][3] == key && teacherData[i][5] != undefined){
            tempArray.push(teacherData[i]);
        }
    }
    return tempArray
}

//////////

function drawSecondTable (){

}

//////////////

function drawSwapsTable (){

}
