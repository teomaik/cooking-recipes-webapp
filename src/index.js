document.getElementById('search-icon').addEventListener('click', function() { searchForRecipe(event) }, false);
document.getElementById('search-recipe').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        searchForRecipe(event);
    }
}, false);

document.getElementById("adv_btn").onclick = function() {
    console.log('adv_btn pressed');
    window.location.href = "advanced_search.html";
}
document.getElementById("add_btn").onclick = function() {

    console.log('add_btn pressed');
    window.location.href = "add_recipe.html";
}

function searchForRecipe(etv) {
    var table = document.getElementById(tbID);
    //TODO do search
}