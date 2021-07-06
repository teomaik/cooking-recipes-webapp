document.getElementById('search-icon').addEventListener('click', function() { searchClick(event) }, false);
document.getElementById('search-recipe').addEventListener('click', function(event) {
    document.getElementById("search-recipe").style.backgroundColor = "#5d8b91";
}, false);

document.getElementById('search-recipe').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        searchClick(event);
    }
}, false);

document.getElementById("adv_btn").onclick = function() {
    window.location.href = "advanced_search.html";
}
document.getElementById("add_btn").onclick = function() {

    window.location.href = "add_recipe.html";
}

function searchClick(evn) {
    db.ref('recipes').once('value', searchForRecipe, recipeNotFound);
}

function searchForRecipe(db_data) {

    var recipeName = document.getElementById("search-recipe").value;
    if (recipeName == null || recipeName == '') {
        recipeNotFound();
        return;
    }

    //search for recipes with the exact name that was inputed by the user
    var recipes = db_data.val();
    var recKeys = Object.keys(recipes);
    var found = false;
    for (var i = 0; i < recKeys.length; i++) {
        var recname = recipes[recKeys[i]].name;
        if (recipeName.toUpperCase() == recname.toUpperCase()) {
            recipeName = recKeys[i];
            found = true;
            break;
        }
    }
    if (!found) {
        recipeNotFound();
        return;
    }

    localStorage["recipeName"] = recipeName;
    window.location.href = "recipe.html";
}

function recipeNotFound() {
    document.getElementById("search-recipe").style.backgroundColor = "darkred";
}