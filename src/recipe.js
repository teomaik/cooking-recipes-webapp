window.onload = function() {
    //alert('Page is loaded');
    showRecipe();

};

function showRecipe() {
    var playerName = '';

    //if (window.location.href.includes('name=')) {
    //    playerName = window.location.href.split('name=')[1].replace(/%20/g, ' ');
    //}
    var recipeName = localStorage["recipeName"];

    if (recipeName == '' || recipeName == null) {
        alert("No Recipe selected, you can always add a new one throught the main page");
        return;
    }
    db.ref('recipes/' + recipeName).once('value', loadRecipeData, recipeNotFound);
}

function recipeNotFound(error) {
    console.log("Recipe not found");
}

function loadRecipeData(data) {

    var recipe = data.val();

    document.getElementById("recipename").innerHTML = recipe.name;
    document.getElementById("recipetime").innerHTML = recipe.timerequired + " minutes to cook";
    document.getElementById("recipecalories").innerHTML = recipe.caloricvalue + " calories";

    /*
        var pros = Object.keys(recipe.pros);
        var cons = Object.keys(recipe.cons);
        var health = Object.keys(recipe.healthbenefits);
        var ingrs = Object.keys(recipe.ingredients);
        var steps = Object.keys(recipe.process);
*/
    var pros = recipe.pros;
    var cons = recipe.cons;
    var health = recipe.healthbenefits;
    var ingrs = recipe.ingredients;
    var steps = recipe.process;


    //rec-pros
    appendToList("rec-pros", pros);
    appendToList("rec-cons", cons);
    appendToList("rec-bens", health);
    appendToList("rec-ingrs", ingrs);
    appendToList("rec-steps", steps);


}

function appendToList(ulId, dataTb) {
    var ul = document.getElementById(ulId);
    //for (var i = dataTb.length - 1; i >= 0; i--) {}
    var keys = Object.keys(dataTb);
    for (var i = 0; i < keys.length; i++) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(dataTb[keys[i]]));
        var pgwidth = document.body.clientWidth;
        li.classList.add('txt');
        ul.appendChild(li);
    }
}