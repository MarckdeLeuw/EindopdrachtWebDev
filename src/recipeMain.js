import {apiKey} from "./dataInput";

import axios from "axios";

/*===TABLE OF CONTENT=====================

1.0 GET ID, IMAGE AND TITLE FROM LOCAL STORAGE
2.0 FETCH ANALYZED RECIPE INSTRUCTIONS
2.1 FUNCTIE INNER HTML OM RECIPE INSTRUCTIONS TE PLAATSEN
3.0 FETCH ANALYZED RECIPE INGREDIENTS
3.1 FUNCTIE INNER HTML OM RECIPE INGREDIENTS TE PLAATSEN
4.1 DATA UIT IMPORT IN HTML ZETTEN (TITEL EN PLAATJES)

=======================================================*/

/*=====================================================
1.0 GET ID, IMAGE AND TITLE FROM LOCAL STORAGE
=====================================================*/

let recipeDetails = JSON.parse(localStorage.getItem('recipeDetails'));

// console.log(recipeDetails);
// console.log(typeof recipeDetails.id);

let id  = recipeDetails.id;
// console.log(typeof id);
// console.log(id);

/*==================================================================================
2.0 FETCH ANALYZED RECIPE INSTRUCTIONS
==================================================================================*/


const requestInstructions = `https://api.spoonacular.com/recipes/${id}/analyzedInstructions`;
// console.log(requestInstructions);

async function fetchAnalyzedRecipeInstructions( ) {
    try{
        const response = await axios.get(requestInstructions,{
            params: {
                apiKey: apiKey,
            },
            headers: {
                "Content-Type": "application/json"
            }
        } )
        const InstructionsById = response.data[0].steps;
        //const InstructionsById = response.data[0].step;
        // console.log(InstructionsById);
        createInstructions(InstructionsById)

    } catch (error){
        console.log( error.message )
    }
}
fetchAnalyzedRecipeInstructions();

/*==================================================================================
2.1 FUNCTIE INNER HTML OM RECIPE INSTRUCTIONS TE PLAATSEN
==================================================================================*/

//Vervolgens functie schrijven om recept te maken
function createInstructions (steps){
    const preparationList = document.getElementById("preparation-recipe");
    preparationList.innerHTML = steps.map((step)=>{
        return` 
            <h4>Step number ${step.number}</h4>      
            <p>${step.step}</p>         
       `;
    }).join("");
}

/*==================================================================================
3.0 FETCH ANALYZED RECIPE INGREDIENTS
==================================================================================*/

const ingredients = document.getElementById("recipe-ingredients");

const requestIngredients = `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json`;
// console.log(requestIngredients);

async function fetchIngredientsById( ) {
    //console.log('Script is running!');
    try{
        const response = await axios.get(requestIngredients,{
            //const response = await axios.get("https://api.spoonacular.com/recipes/715381/ingredientWidget.json",{
            params: {
                apiKey: apiKey,
            },
            headers: {
                "Content-Type": "application/json"      //zonder dit werkt het niet!
            }
        } )
        const ingredientsById = response.data.ingredients;
        //console.log(ingredientsById[0]);
        // console.log(ingredientsById);
        //console.log(ingredientsById.amount.metric.value);
        //console.log(ingredientsById.amount.metric.unit);
        createIngredients(ingredientsById);

    } catch (error){
        console.log( error.message )
    }
}

fetchIngredientsById();
/*==================================================================================
3.1 FUNCTIE INNER HTML OM RECIPE INGREDIENTS TE PLAATSEN
==================================================================================*/

function createIngredients (ingredients){
    const ingredientList = document.getElementById("recipe-ingredients");
    ingredientList.innerHTML = ingredients.map((ingredient)=>{
        return`   
            <p>${ingredient.amount.metric.value} ${ingredient.amount.metric.unit} of ${ingredient.name}</p>
        `;
    }).join("");
}

/*==================================================================================
4.1 DATA UIT IMPORT IN HTML ZETTEN (TITEL EN PLAATJES)
====================================================================================*/

const recipeTitel = document.getElementById("recipe");
recipeTitel.innerHTML=`
    <h1>${recipeDetails.title}</h1>
`;

const recipePicture = document.getElementById('picture-recipe');
recipePicture.innerHTML=`

    <img src="${recipeDetails.image}" alt="Afbeelding van ${recipeDetails.title}" className="recipe"/>
`;