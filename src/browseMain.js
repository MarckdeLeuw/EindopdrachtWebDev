import {filters, inventory} from "./dataInput";

import {apiKey} from "./dataInput";

import axios from "axios";

/*===TABLE OF CONTENT=====================

0.0	DEFINE INPUT & OUTPUT
0.1	ARRAYS CHECKBOXES
0.2	ARRAYS INPUT FIELDS
0.3	INPUT API

1.0	SELECTED ITEMS BOX
1.1	REFERENTIES AANMAKEN
1.2	FUNCTIE OM ITEMS IN SELECTED ITEMS BOX TE PLAATSEN

2.0	FILTERS CHECBOXEN
2.1	FUNCTIE OM INNER HTML AAN TE MAKEN
2.2	FILTERS CHECKBOXEN VULLEN VANUIT FILTERS(DATA)
2.3	EVENT LISTENER AAN ELKE CHECKBOX MEEGEVEN
2.4	HANDLE INPUT CHANGE BIJ CHECKBOXES

3.0 INPUT FIELDS
3.1	REFERENTIES OM ITEM BOXES TE VULLEN
3.2	ACTIES BIJ INVULLEN INPUT FIELDS

4.0	SEARCH RECIPES
4.1	EVENT HANDLER, CONTROLE INVOER, FUNCTIE AANROEPEN
4.2	FUNCTIE FETCH RECIPE
4.3	FUNCTIE CREATE RECIPE LIST
4.4	EVENT HANDLER OP BUTTON RECEPT
		SCHRIJFT ID, TITLE EN PICTURE NAAR LOCAL STORAGE

=======================================================*/


/*=====================================================
0.0 DEFINE INPUT & OUTPUT
        DE DATA IN DE ARRAYS VOLGT UIT DE INPUT (CHECKBOX EN INPUT FIELDS)
        DE DATA WORDT OMGEZET ZODAT DE API ER WAT MEE KAN
=====================================================*/
/*=====================================================
0.1 ARRAYS CHECKBOXES
=====================================================*/

let selectedCuisinesTypes = [];
let selectedTypes = [];
let selectedIntolerances = [];
let selectedDiet = [];

/*=====================================================
0.2 ARRAYS INPUT FIELDS
=====================================================*/
let selectedQueryItems = [];
let selectedIngredientItems = [];
let selectedMaxReadyTime = [];
/*=====================================================
0.3 INPUT API
=====================================================*/
let cuisine = "";
let type = "";
let intolerances = "";
let diet = "";

let maxReadyTime = '180';
let query = "";
let includeIngredients = "";

/*=====================================================
1.0 SELECTED ITEMS BOX (TBV OVERZICHT FILTERS EN CONTROLE)
=====================================================*/

/*=====================================================
1.1 REFERENTIE TBV VULLEN SELECTED ITEMS BOX
    * (MAX TIME, 1 NUMBER IN VULLEN BIJ INPUT FIELD)
=====================================================*/
let refCuisine = document.getElementById("selected-cuisine");
let refTypes = document.getElementById("selected-types");
let refIntolerances = document.getElementById("selected-intolerances");
let refDiet = document.getElementById("selected-diet");


let refQueries = document.getElementById("selected-queries");
let refIngredients = document.getElementById("selected-ingredients");
let refSelectedTime = document.getElementById("selected-time");


/*===================================================
1.2 TBV PLAATSEN GESELECTEERDE ITEMS IN DE SELECTED LIJST BIJ DE BIJBEHORENDE CATEGORY
*(BOVEN HANDLE INPUT CHANGE, ROEPT DEZE FUNCTIE AAN)
====================================================*/

function addToSelected(list, refPlace){
    refPlace.replaceChildren();
    for (let i = 0; i < list.length; i++) {
        const listItem = document.createElement('h6');
        listItem.textContent = `${list[i]}`;
        //`${list[i]}`
        refPlace.appendChild(listItem);
    }
}

/*=====================================================
2.0   FILTERS CHECKBOXES
    DATA KOMT UIT INPUT DATA
=====================================================*/

/*=====================================================
2.1 FUNCTIES INNER HTML AANMAKEN
        DE EERSTE SET DE CATEGORY IN DE FORM (DIK)
        DE TWEEDE VULT DE CATEGORY MET PRODUCTS
=====================================================*/
const categoryItem = (list)=> {
    return `
    <div class="box-category">      
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
2.2 CATEGORY VULLEN VANUIT FILTERS (DATA)
=====================================================*/


const listAll = document.getElementById('list');
for (let i = 0; i < filters.length; i++) {
    listAll.innerHTML +=`${categoryItem(filters[i])}`;
    const productList = document.getElementById(filters[i].category);
    for (let j = 0; j < filters[i].products.length; j++) {
        productList.innerHTML +=`${listItem(filters[i].products[j])}`;
    }
}

/*=====================================================
2.3 ELKE CHECKBOX KRIJGT EVENT LISTENER
=====================================================*/

function button(product){
    return document.getElementById(product);
}


for (let i = 0; i < filters.length; i++) {
    for (let j = 0; j < filters[i].products.length; j++) {
        button(filters[i].products[j]).addEventListener('click', handleInputChange);
    }
}


/*===================================================
2.4 HANDLE INPUT CHANGE
    HOORT BIJ DE CHECKBOXES VAN DE LIJSTEN:

    PLAATS DATA IN DE DATA ARRAY
    MAAKT DATA LEESBAAR VOOR DE API
    VULT DE SELECTED ITEMS
   * LET OP TIJD MAX KAN HIER NIET ALS LIJST
====================================================*/
function handleInputChange(e) {
    const currentValue = e;
    // console.log("running")
    // console.log("huidige waarde " + currentValue.target.name);
    // console.log(filters[0].products[0]);
    for (let i = 0; i < filters.length; i++) {
        for (let j = 0; j < filters[i].products.length; j++) {
            if (currentValue.target.name === filters[i].products[j]){
                // console.log('selected '+ filters[i].category);
                switch (filters[i].category) {

                    case filters[0].category:
                        if(currentValue.target.checked === true)
                        {
                            // stopt waarde in array als deze er nog niet inzit, anders kunnen er meerdere zelfde items inkomen
                            if(selectedCuisinesTypes.includes(currentValue.target.name)){
                            } else {  selectedCuisinesTypes.push(currentValue.target.name)}
                        }else{
                            //als element er al in zit, moet hij eruit gehaald worden.
                            if(selectedCuisinesTypes.includes(currentValue.target.name)){
                                let nr = selectedCuisinesTypes.indexOf(currentValue.target.name);
                                //console.log(nr);
                                selectedCuisinesTypes.splice(nr,1);
                            }
                        }
                        //console.log(selectedCuisinesTypes);
                        addToSelected(selectedCuisinesTypes,refCuisine);
                        //leesbaar maken voor api
                        cuisine = "";
                        cuisine = selectedCuisinesTypes.join(", ");
                        //console.log(cuisine);
                        break;

                    case filters[1].category:
                        if(currentValue.target.checked === true)
                        {
                            // stopt waarde in array als deze er nog niet inzit, anders kunnen er meerdere zelfde items inkomen
                            if(selectedTypes.includes(currentValue.target.name)){
                            } else {  selectedTypes.push(currentValue.target.name)}
                        }else{
                            //als element er al in zit, moet hij eruit gehaald worden.
                            if(selectedTypes.includes(currentValue.target.name)){
                                let nr = selectedTypes.indexOf(currentValue.target.name);
                                //console.log(nr);
                                selectedTypes.splice(nr,1);
                            }
                        }
                        //console.log(selectedTypes);
                        addToSelected(selectedTypes,refTypes);
                        //leesbaar maken voor api
                        type = "";
                        type = selectedTypes.join(", ");
                        //console.log(type);
                        break;

                    case filters[3].category:
                        if(currentValue.target.checked === true)
                        {
                            // stopt waarde in array als deze er nog niet inzit, anders kunnen er meerdere zelfde items inkomen
                            if(selectedDiet.includes(currentValue.target.name)){
                            } else {  selectedDiet.push(currentValue.target.name)}
                        }else{
                            //als element er al in zit, moet hij eruit gehaald worden.
                            if(selectedDiet.includes(currentValue.target.name)){
                                let nr = selectedDiet.indexOf(currentValue.target.name);
                                //console.log(nr);
                                selectedDiet.splice(nr,1);
                            }
                        }
                        //console.log(selectedDiet);
                        addToSelected(selectedDiet,refDiet);
                        //leesbaar maken voor api
                        diet = "";
                        diet = selectedDiet.join(", ");
                        //console.log(diet);
                        break;

                    case filters[2].category:
                        if(currentValue.target.checked === true)
                        {
                            // stopt waarde in array als deze er nog niet inzit, anders kunnen er meerdere zelfde items inkomen
                            if(selectedIntolerances.includes(currentValue.target.name)){
                            } else {  selectedIntolerances.push(currentValue.target.name)}
                        }else{
                            //als element er al in zit, moet hij eruit gehaald worden.
                            if(selectedIntolerances.includes(currentValue.target.name)){
                                let nr = selectedIntolerances.indexOf(currentValue.target.name);
                                //console.log(nr);
                                selectedIntolerances.splice(nr,1);
                            }
                        }
                        //console.log(selectedIntolerances);
                        addToSelected(selectedIntolerances,refIntolerances);
                        //leesbaar maken voor api
                        intolerances = "";
                        intolerances = selectedIntolerances.join(", ");
                        //console.log(intolerances);
                        break;

                    default:
                        console.log('Nothing is chosen');
                }
            }
        }
    }
}
/*=====================================================
3.0   INPUT FIELDS
        QUERY
        SEARCH
        MAX TIME
=====================================================*/

/*=====================================================
3.1 REFERENTIE TBV VULLEN SELECTED ITEMS BOX
    * (MAX TIME, 1 NUMBER IN VULLEN BIJ INPUT FIELD)
=====================================================*/

const inputQuery = document.getElementById('query-input-field');
const formQuery = document.getElementById('query-on-submit');

const inputIngredient = document.getElementById('ingredient-input-field');
const formIngredient = document.getElementById('ingredient-on-submit');

const inputMaxReadyTime = document.getElementById('time-input-field');
const formTime = document.getElementById('time-on-submit');

let listOfQueries = document.getElementById('list-selected-queries');
let listOfIngredients = document.getElementById('list-selected-ingredients');
let selectedTime = document.getElementById('max-ready-time');

/*=====================================================
3.2 ACTIE BIJ SUBMIT ACIE INPUT FIELD

        PLAATS DATA IN DE DATA ARRAY
        MAAKT DATA LEESBAAR VOOR DE API

        ITEMS WORDEN TOEGEVOEGD AAN CHOSEN ....
        ITEMS WORDEN TOEGEVOEGD IN SELECTED BOX
=====================================================*/

formQuery.addEventListener('submit', ( e ) => {
    e.preventDefault();
    const currentValue = e;
    // toevoegen html chosen queries
    const queryItem = document.createElement('p');
    queryItem.textContent = inputQuery.value;
    listOfQueries.appendChild(queryItem);
    //toevoegen aan array selectedQueryItems
    selectedQueryItems.push(inputQuery.value);
    //console.log(selectedQueryItems);

    //leesbaar maken voor api
    query = selectedQueryItems.join(", ");
    //console.log(query);
    //console.log(inputQuery.value);
    // console.log(currentValue.input.value);
    inputQuery.value = "for example pizza"
    addToSelected(selectedQueryItems,refQueries);
});


formIngredient.addEventListener('submit', ( e ) => {
    e.preventDefault();
    const currentValue = e;
    const ingredientItem = document.createElement('p');
    ingredientItem.textContent = inputIngredient.value;
    listOfIngredients.appendChild(ingredientItem);
    selectedIngredientItems.push(inputIngredient.value);
    //console.log(selectedIngredientItems);

    //leesbaar maken voor api
    includeIngredients = selectedIngredientItems.join(", ");
    //console.log(includeIngredients);
    //console.log(inputQuery.value);
    // console.log(currentValue.input.value);
    inputIngredient.value = "for example tuna "
    addToSelected(selectedIngredientItems,refIngredients);
});


formTime.addEventListener('submit', ( e ) => {
    e.preventDefault();
    const currentValue = e;
    const timeInput = document.createElement('p');
    selectedTime.replaceChildren();
    timeInput.textContent = inputMaxReadyTime.value;
    selectedTime.appendChild(timeInput);
    //selectedMaxReadyTime.push(inputIngredient.value);

    //console.log(typeof inputMaxReadyTime.value);

    //leebaar maken voor Selected
    //selectedMaxReadyTime.push(inputMaxReadyTime.value);
    selectedMaxReadyTime = [`${parseInt(inputMaxReadyTime.value)}`];
    //console.log(selectedMaxReadyTime)

    //leesbaar maken voor api
    maxReadyTime = parseInt(inputMaxReadyTime.value);
    //console.log(maxReadyTime);
    //console.log(typeof maxReadyTime)

    inputMaxReadyTime.value = 180;//GEEFT BEGINWAARDE
    //console.log(selectedMaxReadyTime);
    addToSelected(selectedMaxReadyTime,refSelectedTime);
});


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
    //console.log(currentValue);
    console.log('de gekozen filters zijn');
    console.log(query);
    console.log(includeIngredients);
    console.log(type);
    console.log(cuisine);
    console.log(intolerances);
    console.log(diet);
    console.log(maxReadyTime)
    fetchRecipeByComplexSearch();
}
/*=====================================================
4.2 FETCH RECIPES BY COMPLEX SEARCH
        LEEST ARRAY IN
        ROEPT API AAN
        ROEPT FUNCTIE AAN OM GEWENSTE DATA OP SCHERM WEER TE GEVEN
=====================================================*/
let allRecipes = ['']
async function fetchRecipeByComplexSearch( ) {
    //console.log('Script is running!');
    try{
        const response = await axios.get("https://api.spoonacular.com/recipes/complexSearch",{
            params: {
                apiKey: apiKey,
                query: query,       //The (natural language) recipe search query.
                cuisine: cuisine,       //The (natural language) recipe search query.
                //excludeCuisine: excludeCuisine,
                diet: diet,
                intolerances: intolerances,
                includeIngredients: includeIngredients,
                //excludeIngredients: excludeIngredients,
                type: type,
                maxReadyTime: maxReadyTime,//number

                number: 10       //hoeveel recepten teruggeven
            },
            headers: {
                "Content-Type": "application/json"      //zonder dit werkt het niet!
            }
        } );
        //allRecipes = response.data;
        allRecipes = response.data.results;
        //Hiermee wordt het inserten van de recepten aangeroepen
        createRecipeList(allRecipes);

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

        const recipeButton = document.createElement('button');
        recipeButton.setAttribute('id', `${recipe.id}`);
        recipeButton.setAttribute('type', 'button');
        recipeButton.setAttribute('name', 'recipe-button')
        recipeButton.textContent='Get more information';

        //onder elke button wordt een div met id gemaakt, zodat daar de link voor details naar gestuurd kan worden

        const placeRef = document.createElement('div');
        placeRef.setAttribute('id',`place-ref-${recipe.id}`)
        /*=========================================================
        Dit is de referentie waarin de link geplakt gaat worden.
        ===========================================================*/

        listOfRecipes.appendChild(recipeTitle);
        listOfRecipes.appendChild(recipePicture);
        listOfRecipes.appendChild(placeRef);
        listOfRecipes.appendChild(recipeButton);

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
    // console.log(currentValue);
    // console.log(currentValue.target.id);
    // console.log()
    // console.log(allRecipes);

    for (let i = 0; i < allRecipes.length; i++) {
        let recipe = document.getElementById(`place-ref-${allRecipes[i].id}`);
        recipe.replaceChildren();
        // console.log(currentValue.target.id);
        // console.log(allRecipes[0].id);
        if (currentValue.target.id ==  allRecipes[i].id){
            recipeDetails.id = allRecipes[i].id;
            recipeDetails.title =  allRecipes[i].title;
            recipeDetails.image = allRecipes[i].image;
            // console.log(recipeDetails);
            // object wordt als JSON object naar internal storage geschreven
            let recipeDetails_serialized = JSON.stringify(recipeDetails);
            // console.log(recipeDetails_serialized);
            localStorage.setItem('recipeDetails',recipeDetails_serialized);

            let recipeDetails_deserialized = JSON.parse(localStorage.getItem('recipeDetails'));

            const recipeRef = document.createElement('a');
            recipeRef.setAttribute('href',"./recipe.html" );
            recipeRef.setAttribute('target', "_blank");
            recipeRef.textContent='Go to recipe information';
            //recipe.replaceChildren();
            recipe.appendChild(recipeRef);
        }
    }
}









