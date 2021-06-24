document.getElementById('health_btn').addEventListener('click', function() { addHealthBen(event) }, false);

function addHealthBen(etv) {
    var table = document.getElementById("health_tb");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = "Health benefit";
}