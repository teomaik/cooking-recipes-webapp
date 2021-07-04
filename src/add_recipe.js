document.getElementById('health_btn').addEventListener('click', function() { addTbRowToTB(event, "health_tb", "Health benefit") }, false);
document.getElementById('ingrds_btn').addEventListener('click', function() { addTbRowToTB(event, "ingrds_tb", "New Ingredient") }, false);
document.getElementById('proc_btn').addEventListener('click', function() { addTbRowToTB(event, "proc_tb", "Cooking Step") }, false);
document.getElementById('pros_btn').addEventListener('click', function() { addTbRowToTB(event, "pros_tb", "Recipe positive") }, false);
document.getElementById('cons_btn').addEventListener('click', function() { addTbRowToTB(event, "cons_tb", "Recipe negative") }, false);

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
    var row = table.insertRow(1);
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