//global variables to hold values for processing on classes page
//block
var currentBlockName = "";
var currentBlockPeriods = 0;
var blockData = [];
var blockHeaders = ["Band Name", "Class Code", "Periods", "Subject Code", "Subject Name"];
//band
var currentBandName = "";
var bandData = [];
var bandHeaders = ["Class Code", "Periods", "Subject Code", "Subject Name"];


function classesStart(){

    //add the event listener for the subjects Load button
    addSubLoadEventListener (); 
    //add the event listeners for the subject style buttons
    addSubStyleEventListener (); 

    //add the event listener for the Set Block Button
    addBlockEventListener ();

    //add the event listener for the Set Band Button
    addBandEventListener ();

    //add the event listener for the Set Class Button
    addClassEventListener ();

    //draw the band list to screen
    drawBand (); 

    //add the event listener for the Class Delete button (within Band)
    addClassDeleteEventListener ();
    //add the event listener for the Band table
    addBandTableEventListener ();

    //add the event listener for the Save Band button
    addSaveBandEventListener (); 

    //draw the block list to screen
    drawBlock (); 

    //add the event listener for the Band Delete button (within Block)
    addBandDeleteEventListener ();
    //add the event listener for the Block table
    addBlockTableEventListener ();

    //add the event listener for the Save Block button
    addSaveBlockEventListener (); 

    //draw the total list to screen
    drawTotal(); 

    //add the event listener for the total table
    addTotalTableEventListener (); 
    //add the event listener for the Band Delete button (within Total)
    addBlockDeleteEventListener ();
    

    //add the event listener for the Save button
    addSaveEventListener ();
    //add the event listener for the Template button
    addTemplateEventListener ();

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
    hideError("blockAlreadyUsed");
    
    //get values from input
    var blockName = document.getElementById("blockName").value;
    var blockPeriods = document.getElementById("blockPeriods").value;

    //sanitise blockname
    blockName = mySanitise(blockName);

    //trim blockName
    blockName = blockName.trim();

    //verify entries are both there
    if (blockName.length < 1 || blockPeriods.length < 1){
        //display error
        showError("blockShortInput");
        //end function
        return
    }

    //verify block isn't already in the master list
    for (var i = 0; i < allBlockData.length; i ++){
        if (allBlockData[i][0] == blockName){
            //display error
            showError("blockAlreadyUsed");
            //end function
            return
        }
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
    setBlockHTML ();
}

///////////////////

function setBlockHTML () {

    document.getElementById("currentBlock").innerHTML = currentBlockName;
    document.getElementById("currentBlockPeriods").innerHTML = currentBlockPeriods;

    document.getElementById("blockName").value = "";
    document.getElementById("blockPeriods").value = "";

}


/////////////////////////////

function addBandEventListener (){
    //get the item that has "setBand" as an ID
    var button = document.getElementById("setBand");
    //add the event listener
    button.addEventListener("click", setBand);
}

function setBand(){

    //hide error messages
    hideError("bandShortInput");
    hideError("bandNameComma");
    hideError("noBlockSet");
    hideError("bandAlreadyInBlock")

    //check for block values
    if (currentBlockName == "" || currentBlockPeriods == 0){
        //show error message to user
        showError("noBlockSet");
        //end function
        return;
    }

    //get values from input
    var bandName = document.getElementById("bandName").value;
 
    //sanitise bandName
    bandName = mySanitise(bandName);

    //trim bandName
    bandName = bandName.trim();
 
    //verify entry is there
    if (bandName.length < 1){
        //display error
        showError("bandShortInput");
        //end function
        return
    }
 
    //verify name has no commas
    if (bandName.includes(",")){
        //display error
        showError("bandNameComma");
        //end function
        return
    }

    //verify band not already in block
    for (var i = 0; i < blockData.length; i++){
        if (blockData[i][0] == bandName){
            //display error
            showError("bandAlreadyInBlock");
            //end function
            return
        }
    }
 
    //set the value to global variable
    currentBandName = bandName;
 
    //amend text in html to display set values to user
    setBandHTML();

}

////////////////////

function addClassEventListener (){
    //get the item that has "setBand" as an ID
    var button = document.getElementById("addClass");
    //add the event listener
    button.addEventListener("click", addClass);
}

function addClass (){

    //hide error messages
    hideError("noSubjects1");
    hideError("noBandSet");
    hideError("shortInput");
    hideError("classCodeComma");
    hideError("alreadyAdded");
    hideError("classPeriodsInvalid");


    // hideError("bandNameComma");
    // hideError("noBlockSet");
    // hideError("bandAlreadyInBlock")

    //check for subjects
    if (subjectData.length < 1){
        //show error message
        showError("noSubjects1");
        //end function
        return;
    }

    //check for band values (note, although block details will also be 
    // required, because it is not posible to set band without block, this is 
    // sufficient for now)
    if (currentBandName == ""){
        //show error message to user
        showError("noBandSet");
        //end function
        return;
    }

    //get values from input
    var classCode = document.getElementById("classCode").value;
    var classSub = document.getElementById("classSub").value;
    var classPeriods = document.getElementById("classPeriods").value;
    var subIndex = getActiveElement("subjectStyle");

    //sanitise values (subject doesn't need doing as done on import,
    // periods shouldn't either as number input, but doing in case)
    classCode = mySanitise(classCode);
    classPeriods = mySanitise(classPeriods);

    //trim classCode
    classCode = classCode.trim();
 
    //verify entries are there
    if (classCode.length < 1 || classSub.length < 1 || classPeriods.length < 1){
        //display error
        showError("shortInput");
        //end function
        return
    }
 
    //verify classcode has no commas
    if (classCode.includes(",")){
        //display error
        showError("classCodeComma");
        //end function
        return
    }

    //verify class not already in band
    for (var i = 0; i < bandData.length; i++){
        if (bandData[i][0] == classCode){
            //display error
            showError("alreadyAdded");
            //end function
            return
        }
    }

    //verify periods is positive integer 
    if (classPeriods < 1 || floor(classPeriods) != classPeriods){
        //display error
        showError("classPeriodsInvalid");
        //end function
        return
    }

    //get the class subject name and code
    var subloc = findData(subjectData, classSub, subIndex);
    var classSubCode = subjectData[subloc][0];
    var classSubName = subjectData[subloc][1];

    //create array of data
    var classData = [classCode, classPeriods, classSubCode, classSubName];

 
    //add the value to global array
    bandData.push(classData);
 
    //redraw table
    drawBand();

    //enpty values in entry
    document.getElementById("classCode").value = "";
    document.getElementById("classSub").value = "";
    document.getElementById("classPeriods").value = "";


}

/////////

function drawBand (){

    //get the element we want to make changes to
    var bandList = document.getElementById("bandList");
    //create an empty placeholder for content
    var bandListContent = "";

    //add the header row to the placeholder to add to the DOM
    bandListContent += createHeaderRow(bandHeaders);

    //iterate through global variable of bandData to create rows in the table
    for (var i = 0; i < bandData.length; i++){
        bandListContent += createTableRow(bandData[i], bandData[i][0]);
    }

    //add the content to the DOM
    bandList.innerHTML = bandListContent;

    //check there's an event listener on them all
    addBandTableEventListener ();
}

///////////////

function addBandTableEventListener (){
    //get the item that has "bandList" as an ID
    var table = document.getElementById("bandList");
    var tableRows = table.getElementsByTagName("tr");

    for (var i = 0; i < tableRows.length; i++){
        tableRows[i].addEventListener("click", function(){ rowSelect(this, tableRows); });
    }

}

////////////

function addClassDeleteEventListener (){

    //get the item that has "delClass" as an ID
    var button = document.getElementById("delClass");

    button.addEventListener("click", delClass);

}

function delClass (){
    
    //get the item that has "bandList" as an ID
    var table = document.getElementById("bandList");
    var tableRows = table.getElementsByTagName("tr");

    for (var i = 0; i < tableRows.length; i++){
        if (getActiveRow(tableRows[i])){
            //find the location of the data in the array
            var dataLoc = findData(bandData, tableRows[i].id, 0);
            
            //delete the row from the array 
            deleteRow(bandData, bandData[dataLoc])

            //redraw the table
            drawBand();

            //end function
            return;
        }    
    }
}

////////////////////

function addSaveBandEventListener (){
    //get the item that has "saveBand" as an ID
    var button = document.getElementById("saveBand");
    //add the event listener
    button.addEventListener("click", saveBand);
}

function saveBand(){

    //hide errors if already showing
    hideError("bandTooShort");
    hideError("bandOverPeriods");
    hideError("bandShortPeriods");



    //check if band data has data
    if (bandData.length < 1){
        //display error
        showError("bandTooShort");
        //end function
        return
    }

    //variable to hold count of periods
    var bandPeriods = 0;

    //get total of periods of classes in band
    for (var i = 0; i < bandData.length; i++){
        bandPeriods += parseInt(bandData[i][1]);
    }

    //if too many periods
    if (bandPeriods > currentBlockPeriods){
        //display error
        showError("bandOverPeriods");
        //end function
        return
    }
    //or too few periods
    else if (bandPeriods < currentBlockPeriods){
        //display error
        showError("bandShortPeriods");
        //end function
        return
    }
    //just right
    else {
        blockData.push ([currentBandName, bandData]);
    }

    //empty band data variables
    currentBandName = "";
    bandData = [];

    //redraw html for band data
    setBandHTML();

    //redraw band table
    drawBand();

    //redraw block table
    drawBlock();

}

/////////////////

function setBandHTML () {
    document.getElementById("currentBand").innerHTML = currentBandName;
    document.getElementById("bandName").value = "";
}

////////////

function drawBlock (){
    //get the element we want to make changes to
    var blockList = document.getElementById("blockList");
    //create an empty placeholder for content
    var blockListContent = "";

    //add the header row to the placeholder to add to the DOM
    blockListContent += createHeaderRow(blockHeaders);

    //iterate through global variable of blockData to create rows in the table
    for (var i = 0; i < blockData.length; i++){
        var makeID = blockData[i][0];
        //take out any spaces
        makeID = makeID.replace(/ /g,"");

        for (var j = 0; j < blockData[i][1].length; j++){
            
            var tempArray = [];
            tempArray.push(blockData[i][0]);

            for (var k = 0; k < blockData[i][1][j].length; k++){
                tempArray.push(blockData[i][1][j][k]);
            }
            
            var tempID = makeID+blockData[i][1][j][0];
            //take out any spaces
            tempID = makeID.replace(/ /g,"");

            blockListContent += createTableRow(tempArray, tempID);
        }
        
    }

    //add the content to the DOM
    blockList.innerHTML = blockListContent;

    //check there's an event listener on them all
    addBlockTableEventListener ();
}

////////////////

function addBlockTableEventListener (){
    //get the item that has "blockList" as an ID
    var table = document.getElementById("blockList");
    var tableRows = table.getElementsByTagName("tr");

    for (var i = 1; i < tableRows.length; i++){
        tableRows[i].addEventListener("click", function(){ multiRowSelect(this, tableRows); });
    }

}

/////////////////

function addBandDeleteEventListener (){
    //get the item that has "delBand" as an ID
    var button = document.getElementById("delBand");

    button.addEventListener("click", delBand);

}

function delBand (){

    //get the item that has "blockList" as an ID
    var table = document.getElementById("blockList");
    var tableRows = table.getElementsByTagName("tr");

    for (var i = 0; i < tableRows.length; i++){
        //if the row is active
        if (getActiveRow(tableRows[i])){
            //get the band name
            var bandName = tableRows[i].getElementsByTagName("td")[0].innerHTML;

            //find the location of the data in the array
            var dataLoc = findData(blockData, bandName, 0);
            
            //delete the row from the array 
            deleteRow(blockData, blockData[dataLoc])

            //redraw the table
            drawBlock();

            //end function
            return;
        }    
    }
}

//////////////////

function addSaveBlockEventListener (){
    //get the item that has "saveBlock" as an ID
    var button = document.getElementById("saveBlock");
    //add the event listener
    button.addEventListener("click", saveBlock);
}

function saveBlock(){

    //hide errors if already showing
    hideError("blockTooShort");
    hideError("blockUnequalPeriods");
    
    //check if block data has data
    if (blockData.length < 1){
        //display error
        showError("blockTooShort");
        //end function
        return
    }

    //check all bands in block add up to the same value (shouldn't ever trigger)
    for (var i = 0; i < blockData.length; i++){
        var bandTotal = 0;

        for (var j = 0; j < blockData[i][1].length; j ++){
            bandTotal += parseInt(blockData[i][1][j][1])
        }

        if (bandTotal != currentBlockPeriods){
            //display error
            showError("blockUnequalPeriods");
            //end function
            return
        }
        
    }

    //add to master array
    allBlockData.push([currentBlockName, blockData]);

    //empty block data variables
    currentBlockName = "";
    currentBlockPeriods = 0;
    blockData = [];

    //redraw html for band data
    setBlockHTML ();

    //redraw block table
    drawBlock();

    //redraw master table
    drawTotal();

}

//////////

function drawTotal() {
    
    //get the element we want to make changes to
    var totalList = document.getElementById("totalList");
    //create an empty placeholder for content
    var totalListContent = "";

    //add the header row to the placeholder to add to the DOM
    totalListContent += createHeaderRow(allBlockHeaders);

    //iterate through global variable of blockData to create rows in the table
    for (var i = 0; i < allBlockData.length; i++){
        var makeID = allBlockData[i][0];
        //take out any spaces
        makeID = makeID.replace(/ /g,"");

        for (var j = 0; j < allBlockData[i][1].length; j++){

            for (var k = 0; k < allBlockData[i][1][j][1].length; k++){
                
                var tempArray = [];
                tempArray.push(allBlockData[i][0]);
                tempArray.push(allBlockData[i][1][j][0]);
                tempArray.push(allBlockData[i][1][j][1][k][0]);
                tempArray.push(allBlockData[i][1][j][1][k][1]);
                tempArray.push(allBlockData[i][1][j][1][k][2]);
                tempArray.push(allBlockData[i][1][j][1][k][3]);

                var tempID = makeID+allBlockData[i][1][j][0];
                tempID += allBlockData[i][1][j][1][k][0];
                //take out any spaces
                tempID = makeID.replace(/ /g,"");

                totalListContent += createTableRow(tempArray, tempID);
            }
            
            
        }
        
    }

    //add the content to the DOM
    totalList.innerHTML = totalListContent;

    //check there's an event listener on them all
    addTotalTableEventListener ();

}

///////////

function addTotalTableEventListener (){
    //get the item that has "totalList" as an ID
    var table = document.getElementById("totalList");
    var tableRows = table.getElementsByTagName("tr");

    for (var i = 1; i < tableRows.length; i++){      
        tableRows[i].addEventListener("click", function(){ multiRowSelect(this, tableRows); });
    }

}

// /////////////////

function addBlockDeleteEventListener (){
    // //get the item that has "delBlock" as an ID
    var button = document.getElementById("delBlock");

    button.addEventListener("click", delBlock);

}

function delBlock (){
 
    //get the item that has "totalList" as an ID
    var table = document.getElementById("totalList");
    var tableRows = table.getElementsByTagName("tr");

    for (var i = 0; i < tableRows.length; i++){
        //if the row is active
        if (getActiveRow(tableRows[i])){
            //get the band name
            var blockName = tableRows[i].getElementsByTagName("td")[0].innerHTML;

            //find the location of the data in the array
            var dataLoc = findData(allBlockData, blockName, 0);
            
            //delete the row from the array 
            deleteRow(allBlockData, allBlockData[dataLoc])

            //redraw the table
            drawTotal();

            //end function
            return;
        }    
    }
}

////////////////////

function addSaveEventListener () {
    //get the items that has "save" as an ID
    var button = document.getElementById("save");

    button.addEventListener("click", processBlocksToSave);
}

function processBlocksToSave(){

    //placeholder array
    var blocksHolding = [];

    //iterate through totalblocks array the table is made from...
    for (var i = 0; i < allBlockData.length; i++){
        for (var j = 0; j < allBlockData[i][1].length; j++){
            for (var k = 0; k < allBlockData[i][1][j][1].length; k++){
                var tempData = [];
       
                //add block name
                tempData.push(allBlockData[i][0]);
                //add band name
                tempData.push(allBlockData[i][1][j][0]);
                //add class code
                tempData.push(allBlockData[i][1][j][1][k][0]);
                //add periods
                tempData.push(allBlockData[i][1][j][1][k][1]);
                //add subject code
                tempData.push(allBlockData[i][1][j][1][k][2]);
        
                blocksHolding.push(tempData)
            }
        }
       
        
    }

    saveAsCSV(allBlockFileHeaders, blocksHolding, "classes.csv")
}

function addTemplateEventListener (){
    //get the items that has "template" as an ID
    var button = document.getElementById("template");

    button.addEventListener("click", function() {saveAsCSV(allBlockFileHeaders,[], "classes.csv")});
}

///////////////

