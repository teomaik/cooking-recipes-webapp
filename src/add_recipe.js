document.getElementById('health_btn').addEventListener('click', function() {
    addTbRowToTB(event, "health_tbody", "Health benefit")
    document.getElementById('healthdiv').style.backgroundColor = 'transparent';
}, false);
document.getElementById('ingrds_btn').addEventListener('click', function() {
    addTbRowToTB(event, "ingrds_tbody", "New Ingredient");
    document.getElementById('ingrdiv').style.backgroundColor = 'transparent';
}, false);
document.getElementById('proc_btn').addEventListener('click', function() {
    addTbRowToTB(event, "proc_tbody", "Cooking Step")
    document.getElementById('procdiv').style.backgroundColor = 'transparent';
}, false);
document.getElementById('pros_btn').addEventListener('click', function() {
    addTbRowToTB(event, "pros_tbody", "Recipe positive")
    document.getElementById('prosdiv').style.backgroundColor = 'transparent';
}, false);
document.getElementById('cons_btn').addEventListener('click', function() {
    addTbRowToTB(event, "cons_tbody", "Recipe negative")
    document.getElementById('consdiv').style.backgroundColor = 'transparent';
}, false);
document.getElementById('inrname').addEventListener("focus", function() {
    document.getElementById('inrname').style.backgroundColor = 'transparent';
});
document.getElementById('inrcal').addEventListener("focus", function() {
    document.getElementById('inrcal').style.backgroundColor = 'transparent';
});
document.getElementById('inrtime').addEventListener("focus", function() {
    document.getElementById('inrtime').style.backgroundColor = 'transparent';
});


function editableCells(e) {

    var target = e.target;
    //test if clicked element is TD.
    if (target && target.tagName && target.tagName.toLowerCase() == "td") {
        //make cell editable
        target.setAttribute('contenteditable', 'true');
        //on blur close the editable field and return to normal cell.
        target.onblur = function() { this.removeAttribute('contenteditable'); }
    }

}

function addTbRowToTB(etv, tbID, rowMsg) {
    var table = document.getElementById(tbID);
    var row = table.insertRow(table.rows.length);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = rowMsg;
}
//--------------

var table = document.getElementById("health_tb");
table.addEventListener('click', editableCells);
//--------------

var table = document.getElementById("ingrds_tb");
table.addEventListener('click', editableCells);
//--------------

var table = document.getElementById("proc_tb");
table.addEventListener('click', editableCells);
//--------------

var table = document.getElementById("pros_tb");
table.addEventListener('click', editableCells);
//--------------

var table = document.getElementById("cons_tb");
table.addEventListener('click', editableCells);

//add a new recipe
document.getElementById('addplbt').addEventListener('click', function() { addRecipe(event) }, false);

function addRecipe(evn) {

    var emptyFields = false;

    var name = document.getElementById("inrname").value;
    var calories = document.getElementById("inrcal").value;
    var time = document.getElementById("inrtime").value;


    const regexnum = /^[+-]?\d+(\.\d+)?$/
    const regexLetterSpace = /^[a-zA-Z\s]*$/;

    if (isNullOrEmpty(name) || !name.match(regexLetterSpace)) {
        document.getElementById("inrname").style.backgroundColor = 'darkred';
        emptyFields = true;
    }

    if (isNullOrEmpty(calories) || !calories.match(regexnum)) {
        document.getElementById("inrcal").style.backgroundColor = 'darkred';
        emptyFields = true;
    }

    if (isNullOrEmpty(time) || !time.match(regexnum)) {
        document.getElementById("inrtime").style.backgroundColor = 'darkred';
        emptyFields = true;
    }


    //checking tables for values and getting them
    var igredients = {};
    var process = {};
    var healthBens = {};
    var pros = {};
    var cons = {};
    var tags = {};

    healthBens = getTbValues(document.getElementById("health_tbody").rows);
    pros = getTbValues(document.getElementById("pros_tbody").rows);
    cons = getTbValues(document.getElementById("cons_tbody").rows);
    process = getTbValues(document.getElementById("proc_tbody").rows);
    igredients = getTbValues(document.getElementById("ingrds_tbody").rows);

    if (Object.keys(igredients).length == 0) {
        document.getElementById('ingrdiv').style.backgroundColor = 'darkred';
        emptyFields = true;
    }
    if (Object.keys(process).length == 0) {
        document.getElementById('procdiv').style.backgroundColor = 'darkred';
        emptyFields = true;
    }
    if (Object.keys(healthBens).length == 0) {
        document.getElementById('healthdiv').style.backgroundColor = 'darkred';
        emptyFields = true;
    }
    if (Object.keys(pros).length == 0) {
        document.getElementById('prosdiv').style.backgroundColor = 'darkred';
        emptyFields = true;
    }
    if (Object.keys(cons).length == 0) {
        document.getElementById('consdiv').style.backgroundColor = 'darkred';
        emptyFields = true;
    }
    if (emptyFields) {
        return;
    }

    //adding tags to recipe. Tags are the words from the name and the ingredients
    var tagIdx = 0;
    var tempTags = name.split(" ");
    for (var i = 0; i < tempTags.length; i++) {
        if (tempTags[i].length > 2) {
            tags[tagIdx] = tempTags[i];
            tagIdx++;
        }
    }
    for (var i = 0; i < Object.keys(igredients).length; i++) {
        var ingrTags = igredients[Object.keys(igredients)[i]].split(" ");
        for (var k = 0; k < ingrTags.length; k++) {
            var tmpTag = ingrTags[k];
            if (tmpTag.length > 2) {
                tags[tagIdx] = tmpTag;
                tagIdx++;
            }
        }
    }


    db.ref('recipes/' + name.toUpperCase()).set({
        name: name,
        caloricvalue: calories,
        timerequired: time,
        ingredients: igredients,
        process: process,
        healthbenefits: healthBens,
        pros: pros,
        cons: cons,
        tags: tags
    });

    done();
}

function done() {
    document.getElementById("inrname").value = "";
    document.getElementById("inrcal").value = "";
    document.getElementById("inrtime").value = "";

    document.getElementById("ingrds_tbody").innerHTML = '';
    document.getElementById("proc_tbody").innerHTML = '';
    document.getElementById("health_tbody").innerHTML = '';
    document.getElementById("pros_tbody").innerHTML = '';
    document.getElementById("cons_tbody").innerHTML = '';
}

function getTbValues(tbrows) {
    var ret = {};
    for (var i = 0; i < tbrows.length; i++) {
        ret[i] = tbrows[i].cells[0].innerHTML.replaceAll("<br>", "");
    }
    return ret;
}

function isNullOrEmpty(value) {
    if (value == null || value == '') {
        return true;
    }
    return false;
}