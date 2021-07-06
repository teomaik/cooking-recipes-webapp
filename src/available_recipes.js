var availableRecipes = localStorage["recipesAdvS"];

window.onload = function() {
    db.ref('recipes').once('value', showAllRecipes, false);
}

function showAllRecipes(db_data) {

    var recipes = db_data.val();
    availableRecipes = availableRecipes.split(",");
    for (var i = 0; i < availableRecipes.length; i++) {
        showRecipe(availableRecipes[i], recipes);
    }
}

function showRecipe(recKey, recipes) {
    var li = document.createElement("li");
    var tag = document.createElement("a");
    var pp = document.createElement("p");

    var text = document.createTextNode(recipes[recKey].name);
    tag.appendChild(text);

    tag.href = "recipe.html";
    tag.onclick = function(event, playername) {
        localStorage["recipeName"] = recKey;
    };

    tag.classList.add('av_rec');
    pp.classList.add('av_rec');
    li.classList.add('li_rec');

    li.appendChild(pp);
    pp.appendChild(tag);
    var element = document.getElementById("recipe_list");
    element.appendChild(li);
}