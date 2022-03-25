import {inventory} from './dataInput';

import {apiKey} from "./dataInput";

import axios from "axios";

/*===TABLE OF CONTENT=====================

0.0	DEFINE INPUT & OUTPUT
0.1	ARRAYS CHECKBOXES

2.0	FILTERS CHECBOXEN
2.1	FUNCTIE OM INNER HTML AAN TE MAKEN INGREDIENTEN
2.2	FUNCTIE OM INNER HTML AAN TE MAKEN SELECTED
2.3 PRODUCTEN VULLEN VANUIT INVENTORY (DATA)
2.4 ELKE CHECKBOX KRIJGT EVENT LISTENER

3.0 ACTIES BIJ SELECTEREN PRODUCTEN
3.1 IN SELECTED LIJST ZETTEN
3.2 EVENT HANDLER CHECKBOX

4.0	SEARCH RECIPES
4.1	EVENT HANDLER, CONTROLE INVOER, FUNCTIE AANROEPEN
4.2	FUNCTIE FETCH RECIPE
4.3	FUNCTIE CREATE RECIPE LIST
4.4	EVENT HANDLER OP BUTTON RECEPT
		SCHRIJFT ID, TITLE EN PICTURE NAAR LOCAL STORAGE

=======================================================*/

/*=====================================================
1.0 DEFINE INPUT & OUTPUT
        DE DATA IN DE ARRAYS VOLGT UIT DE INPUT (CHECKBOX EN INPUT FIELDS)
        DE DATA WORDT OMGEZET ZODAT DE API ER WAT MEE KAN
=====================================================*/
/*=====================================================
1.1 ARRAYS CHECKBOXES
=====================================================*/

let selectedItems = [];

/*=====================================================
2.0 FILTERS CHECKBOXES
    DATA KOMT UIT INPUT DATA
=====================================================*/

/*=====================================================
2.1 FUNCTIES INNER HTML AANMAKEN LIST INGREDIENTEN
        DE EERSTE SET DE CATEGORY IN DE FORM (DIK)
        DE TWEEDE VULT DE CATEGORY MET PRODUCTS
=====================================================*/

const categoryItem = (list)=> {
    return `
    <div class="box-category">  <!--class nog wijzigen, gekoppeld css-->      
            <h3>${list.category}</h3>
            <div id="${list.category}"></div>    
    </div>    
    `;
};
//vult boven staande category met products
const listItem = (list)=>{
    return`
        <br/>
        <label for={list}>
            <input
                type="checkbox"
                id= ${list}
                name= ${list}
                value="checked" />
            ${list}
        </label>        
    `;
};

/*=====================================================
2.2 FUNCTIES INNER HTML AANMAKEN LIST SELECTED
        DE EERSTE SET DE CATEGORY IN DE FORM
        DE TWEEDE VULT DE CATEGORY MET PRODUCTS
=====================================================*/
const categorySelected = (list)=> {
    return `
    <div class="box-2">
        <h3>Selected</h3>            
            <div id="selectedProducts"></div>        
    </div>    
    `;
};
//vult boven staande selected met producten
const listSelected = (list)=>{
    return`
        <h6>${list}</h6>       
    `;
};

/*=====================================================
2.3 PRODUCTEN VULLEN VANUIT INVENTORY (DATA)
=====================================================*/

const listAll = document.getElementById('list');
for (let i = 0; i < inventory.length; i++) {
    listAll.innerHTML +=`${categoryItem(inventory[i])}`;
    const productList = document.getElementById(inventory[i].category);
    for (let j = 0; j < inventory[i].products.length; j++) {
        productList.innerHTML +=`${listItem(inventory[i].products[j])}`;
    }
}


/*=====================================================
2.4 ELKE CHECKBOX KRIJGT EVENT LISTENER
=====================================================*/

function button(product){
    return document.getElementById(product);
}


for (let i = 0; i < inventory.length; i++) {
    for (let j = 0; j < inventory[i].products.length; j++) {
        button(inventory[i].products[j]).addEventListener('click', handleInputChange);
    }
}

/*=====================================================
3.0 ACTIES BIJ SELECTEREN PRODUCTEN
=====================================================*/
/*=====================================================
3.1 IN SELECTED LIJST ZETTEN
=====================================================*/
const chosen = document.getElementById('list-Selected');
chosen.innerHTML =`${categorySelected()}`;


const productListChosen = document.getElementById('selectedProducts');
for (let j = 0; j < selectedItems.length; j++) {
    productListChosen.innerHTML +=`${listSelected(selectedItems[j])}`;
}
/*=====================================================
3.2 EVENTHANDLER CHECKBOX
=====================================================*/

/*====================================================================================
de acties die worden uitgevoerd als de checkBox wordt aangevinkt
    zet product in lege array als deze er nog niet inzit
de acties die worden uitgevoerd als de checkBox wordt uitgevinkt
    haal product uit array als deze er in zat
Vervolgens wordt de list in HTML eerst leeg gemaakt en vervolgens gevuld met de nieuwe array
Tenslotte wordt string ingredients gemaakt die de api kan inlezen
====================================================================================*/


function handleInputChange(e){
    const currentValue = e;

    if(currentValue.target.checked === true)
    {
        // stopt waarde in array als deze er nog niet inzit, anders kunnen er meerdere zelfde items inkomen
        if(selectedItems.includes(currentValue.target.name)){
        } else {  selectedItems.push(currentValue.target.name)}
    }else{
        //als element er al in zit, moet hij eruit gehaald worden.
        if(selectedItems.includes(currentValue.target.name)){
            let nr = selectedItems.indexOf(currentValue.target.name);
            // console.log(nr);
            selectedItems.splice(nr,1);
        }
    }
    //lijst html wissen en opnieuw vullen
    productListChosen.innerHTML = '';
    for (let j = 0; j < selectedItems.length; j++) {
        productListChosen.innerHTML +=`${listSelected(selectedItems[j])}`;
    }
    //array ingredients maken die te lezen is voor de api
    ingredients = '';
    ingredients = selectedItems.join(", ");
    // console.log(ingredients);
}

/*=====================================================
4   SEARCH RECIPES
        BUTTON
        FETCH RECIPES BY COMPLEX SEARCH
            CREATE RECIPE LIST
        CLICKRECIPE
=====================================================*/

/*=====================================================
4.1 SEARCH RECIPE BUTTON
    ALS FILTERS ZIJN INGEVULD
    EVENT LISTENER
    DEZE ROEPT DE FUNCTIE AAN DIE RECEPTEN GAAT HALEN
=====================================================*/


const searchRecipesButton = document.getElementById("fetch-recipes");
searchRecipesButton.addEventListener("click",clickSearch);

function clickSearch(e){
    const currentValue =e;
    // console.log(currentValue);
    fetchRecipeByIngredients();
}
/*=====================================================
4.2 FETCH RECIPES BY COMPLEX SEARCH
        LEEST ARRAY IN
        ROEPT API AAN
        ROEPT FUNCTIE AAN OM GEWENSTE DATA OP SCHERM WEER TE GEVEN
=====================================================*/

const a = ['apples', 'cinnamon', 'cream'];
let ingredients = a.join(", ");
let allRecipes = [''];

async function fetchRecipeByIngredients( ) {
    try{
        const response = await axios.get("https://api.spoonacular.com/recipes/findByIngredients",{
            params: {
                apiKey: apiKey,
                ingredients: ingredients,       //A comma-separated list of ingredients that the recipes should contain.
                number: 10       //hoeveel recepten teruggeven
            },
            headers: {
                "Content-Type": "application/json"      //zonder dit werkt het niet!
            }
        } );
        allRecipes = response.data;
        console.log(allRecipes);

        //Hiermee wordt het inserten van de recepten aangeroepen
        createRecipeList(allRecipes)

    } catch (error){
        console.log( error.message )
    }
}

/*=====================================================
4.3 CREATE RECIPE LIST
        MAAKT EERST DE POSITIE WAAR DE DAT KOMT LEEG
        APPEND CHILDREN OP DE GEWENSTE POSITIE
        GEEFT ONDER ELKE BUTTON EEN LEGE DIV MEE DIE GEVULD WORDT MET DE LINK
        NAAR HET UITEINDELIJKE RECEPT ALS OP DE BUTTON GEKLIKT GAAT WORDEN
=====================================================*/

function createRecipeList (recipes){
    const listOfRecipes = document.getElementById("ingredients");
    listOfRecipes.replaceChildren();
    recipes.map((recipe)=>{
        const recipeTitle = document.createElement('h2');
        recipeTitle.textContent=`${recipe.title}`

        const recipePicture = document.createElement('img');
        recipePicture.setAttribute('src',`${recipe.image}`);
        recipePicture.setAttribute('alt',`image ${recipe.title}`);

        //Search missing ingredients and put in list
        let listMissed = recipe.missedIngredients;
        let missedItems = [];
        for (let i = 0; i < listMissed.length; i++) {
            missedItems.push(listMissed[i].name);
        }
        const missedIngredients = document.createElement('p');
        missedIngredients.textContent = `Missing ingredients: ${missedItems.join(', ')}`;

        const recipeButton = document.createElement('button');
        recipeButton.setAttribute('id', `${recipe.id}`);
        recipeButton.setAttribute('type', 'button');
        recipeButton.setAttribute('name', 'recipe-button')
        recipeButton.textContent='Get more information';

        //onder elke button wordt een div met id gemaakt, zodat daar de link voor details naar gestuurd kan worden

        const placeRef = document.createElement('div');
        placeRef.setAttribute('id',`place-ref-${recipe.id}`)
        /*=========================================================
        Dit is de referentie waarin alles geplakt gaat worden.
        ===========================================================*/

        listOfRecipes.appendChild(recipeTitle);
        listOfRecipes.appendChild(recipePicture);
        listOfRecipes.appendChild(placeRef);
        listOfRecipes.appendChild(recipeButton);
        listOfRecipes.appendChild(missedIngredients);
    });
    function button(recipeId){
        return document.getElementById(recipeId)
    }

    for (let i = 0; i < recipes.length; i++) {
        button(recipes[i].id.toString()).addEventListener('click', clickRecipe);
    }
}

/*=====================================================
4.4 RECIPE DETAIL
        MAAKT EERST DE POSITIE WAAR DE DATA KOMT LEEG
        SCHRIJFT DATA OM NAAR JSON FILE EN SLAAT DEZE OP NAAR LOCAL STORAGE
        VULT CHILD MET LINK NAAR UITEINDELIJKE PAGINA
=====================================================*/

let recipeDetails = {id:0, title: "empty", image :"empty"};

function clickRecipe(e){
    const currentValue = e;

    for (let i = 0; i < allRecipes.length; i++) {
        let recipe = document.getElementById(`place-ref-${allRecipes[i].id}`);
        recipe.replaceChildren();
        // console.log(currentValue.target.id);
        // console.log(allRecipes[0].id);
        if (currentValue.target.id ==  allRecipes[i].id){
            recipeDetails.id = allRecipes[i].id;
            recipeDetails.title =  allRecipes[i].title;
            recipeDetails.image = allRecipes[i].image;

            // object wordt als JSON object naar internal storage geschreven
            let recipeDetails_serialized = JSON.stringify(recipeDetails);
            // console.log(recipeDetails_serialized);
            localStorage.setItem('recipeDetails',recipeDetails_serialized);

            let recipeDetails_deserialized = JSON.parse(localStorage.getItem('recipeDetails'));
            console.log(recipeDetails_deserialized);


            const recipeRef = document.createElement('a');
            recipeRef.setAttribute('href',"./recipe.html" );
            recipeRef.setAttribute('target', "_blank");
            recipeRef.textContent='Go to recipe information';
            //recipe.replaceChildren();
            recipe.appendChild(recipeRef);
        }
    }
}



