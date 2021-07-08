document.getElementById('ingrds_btn').addEventListener('click', function() {
    addTbRowToTB(event, "ingrds_tbody", "Ingredient");
    document.getElementById('ingrdiv').style.backgroundColor = 'transparent';
}, false);

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
}

var table = document.getElementById("ingrds_tb");
table.addEventListener('click', editableCells);

function getTbValues(tbrows) {
    var ret = {};
    for (var i = 0; i < tbrows.length; i++) {
        var cell = tbrows[i].cells[0].innerHTML.replaceAll("<br>", "");
        if (isNullOrEmpty(cell)) {
            continue;
        }
        ret[i] = cell;
    }
    return ret;
}

function isNullOrEmpty(value) {
    if (value == null || value == '') {
        return true;
    }
    return false;
}

document.getElementById('showAll').addEventListener('click', function() { showAll(event) }, false);

function showAll(evn) {
    db.ref('recipes').once('value', showAllRecipes, false);
}

function showAllRecipes(db_data) {
    var recipes = db_data.val();
    var recKeys = Object.keys(recipes);

    localStorage["recipesAdvS"] = recKeys;
    window.location.href = "available_recipes.html";
}


document.getElementById('addplbt').addEventListener('click', function() { search(event) }, false);

function search(evn) {
    db.ref('recipes').once('value', searchRecipes, false);
}

function searchRecipes(db_data) {


    var name = document.getElementById("inrname").value;


    var igredients = {};
    igredients = getTbValues(document.getElementById("ingrds_tbody").rows);


    var tmpRecTags = {};
    var tagIdx = 0;
    var tempTags = name.split(" ");
    for (var i = 0; i < tempTags.length; i++) {
        if (tempTags[i].length > 2) {
            tmpRecTags[tagIdx] = tempTags[i];
            tagIdx++;
        }
    }
    for (var i = 0; i < Object.keys(igredients).length; i++) {
        var ingrTags = igredients[Object.keys(igredients)[i]].split(" ");
        for (var k = 0; k < ingrTags.length; k++) {
            var tmpTag = ingrTags[k];
            if (tmpTag.length > 2) {
                tmpRecTags[tagIdx] = tmpTag;
                tagIdx++;
            }
        }
    }
    //----------------------------------------------
    var recipes = db_data.val();
    var recKeys = Object.keys(recipes);
    var foundIdx = 0;
    var recipesFound = [];

    for (var i = 0; i < recKeys.length; i++) {

        var recTags = recipes[recKeys[i]].tags.toUpperCase();

        var found = true;
        for (var t = 0; t < Object.keys(tmpRecTags).length; t++) {


            var tmpTagUpperCase = tmpRecTags[Object.keys(tmpRecTags)[t]].toUpperCase();

            if (!recTags.includes(tmpTagUpperCase)) {
                found = false;
                break;
            }
        }

        if (found) {
            recipesFound[foundIdx] = recKeys[i];
            foundIdx++;
        }
    }

    if (Object.keys(recipesFound).length == 0) {
        recipeNotFound();
        return;
    }

    localStorage["recipesAdvS"] = recipesFound;
    window.location.href = "available_recipes.html";
}

function recipeNotFound() {
    document.getElementById("addplbt").style.backgroundColor = "darkred";
}