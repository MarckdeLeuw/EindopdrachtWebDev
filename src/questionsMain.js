import {questions} from "./dataInput";

import axios from "axios";

/*===TABLE OF CONTENT=====================
0.0	DEFINE OUTPUT
0.1	INPUT API

1.0	DEFINE STARTVRAAG
2.0 MOGELIJKE ANTWOORDEN GENEREREN UIT VRAAG VANUIT DATA
3.0 ANTWOORDEN IN RADIOBOX ZETTEN
3.1 FUNCTIES OPSTELLEN OM INNER HTML RADIOBOX TE VULLEN, CHECKED EN UNCHECKED
3.2	LOOP INJECTEREN ANTWOORDEN IN LIJST

4.0 ACTIES AAN BUTTON VERBINDEN
4.1 VERVOLGVRAGEN
4.2 NIEUWE GET RECIPE BUTTON OM OUDE NEXT QUESTION BUTTON TE VERVANGEN

5.0	SEARCH RECIPES
5.1	ZOEK FILTERS
5.2	FUNCTIE FETCH RECIPE
5.3	FUNCTIE CREATE RECIPE LIST
5.4	EVENT HANDLER OP BUTTON RECEPT
		SCHRIJFT ID, TITLE EN PICTURE NAAR LOCAL STORAGE
=======================================================*/

/*=====================================================
0.0 DEFINE OUTPUT
        DE DATA WORDT VANUIT DE DATA GEHAALD AHV VRAGEN EN AANGELEVERD ZODAT DE API ER WAT MEE KAN
=====================================================*/

/*=====================================================
0.1 INPUT API
=====================================================*/
let cuisine = "";
let type = "";
let intolerances = "";
let diet = "";
//let maxReadyTime = "";
//
let query = "";
let includeIngredients = "";

/*====================================
1.0  DEFINE STARTVRAAG
====================================*/

let questionStart   =   questions[0].questionInput;
// console.log(questionStart);
let question = document.getElementById('question');
question.textContent = questionStart;

/*====================================
2.0  MOGELIJKE ANTWOORDEN GENEREREN UIT VRAAG VANUIT DATA
====================================*/

function responseQuestion(objectQuestion){
    for (let i = 0; i < objectQuestion.length; i++) {
        if (objectQuestion[i].questionInput===questionStart){
            const possibleAnswers = objectQuestion[i].possibleAnswer;
            //console.log(possibleAnswers);
            return possibleAnswers;
        }
    }
}

let possibleAnswer = responseQuestion(questions);


/*====================================
3.0 ANTWOORDEN IN RADIOBOX ZETTEN
====================================*/

/*====================================
3.1 FUNCTIES OPSTELLEN OPM INNTER HTML RADIOBOX TE VULLEN, CHECKED EN UNCHECKED
====================================*/
//opzet 1 element
const buttonItemChecked = (currentQuestion)=>{
    return`
    <div>
    <label for="${currentQuestion}">
        <input type="radio"
        checked = "checked"
        name="question"
        id="${currentQuestion}"
        value="${currentQuestion}"                 
        />
        ${currentQuestion}
    </label>
    </div>
    `;
};
const buttonItem = (currentQuestion)=>{
    return`
    <div>
    <label for="${currentQuestion}">
        <input type="radio"
        name="question"
        id="${currentQuestion}"
        value="${currentQuestion}"                 
        />
        ${currentQuestion}
    </label>
    </div>
    `;
};


/*====================================
3.2 LOOP INJECTEREN ANTWOORDEN IN LIJST
====================================*/
const listAnswers = document.getElementById('myForm');
for (let i = 0; i < possibleAnswer.length; i++) {
    if (i===0){
        listAnswers.innerHTML += `${buttonItemChecked(possibleAnswer[i])}`
    }else {
        listAnswers.innerHTML += `${buttonItem(possibleAnswer[i])}`
    }
}


/*====================================================================
4.0 ACTIES AAN BUTTON VERBINDEN
======================================================================*/
/*====================================================================
4.1 VERVOLGVRAGEN
======================================================================*/

const nextQuestionButton = document.getElementById("next-question");
nextQuestionButton.addEventListener("click",clickNextQuestion);

function clickNextQuestion(e){
    const currentValue =e;
    // console.log(currentValue);
    grabNew();
}

//grab and display new question
//button genereren aan de hand van de gekozen eventhandler

function grabNew(){
    //zoekt waarde radio button
    let question = document.forms[0];
    let newQuestion = '';
    let txt = '';

    for (let j = 0; j <question.length ; j++) {
        if (question[j].checked){
            txt = txt + question[j].value + '';
        }
    }
    //geeft de vervolgvraag
    for (let j = 0; j < questions.length; j++) {
        for (let k = 0; k < questions[j].possibleAnswer.length; k++) {
            if(questions[j].possibleAnswer[k]===txt){
                newQuestion = questions[j].nextQuestion[k];
                // document.getElementById('resultsGrabNew').value = newQuestion;
                document.getElementById('question').textContent = newQuestion;
            }
        }
    }
    //geeft de mogelijke antwoorden op de vervolgvraag
    for (let j = 0; j < questions.length; j++) {
        if(questions[j].questionInput===newQuestion) {
            let newPossibleAnswers = questions[j].possibleAnswer;
            // console.log(questions[j].lastQuestion);
            if ((questions[j].lastQuestion)===true){
                const questionButton = document.getElementById('button-location');
                questionButton.replaceChildren();
                createGetRecipeButton(questionButton)
            }
            // console.log(newPossibleAnswers);
            // console.log(typeof newPossibleAnswers);
            listAnswers.innerHTML = '';
            for (let k = 0; k < newPossibleAnswers.length; k++) {
                if (k===0){
                    listAnswers.innerHTML += `${buttonItemChecked(newPossibleAnswers[k])}`
                }else {
                    listAnswers.innerHTML += `${buttonItem(newPossibleAnswers[k])}`
                }
            }
        }
    }
}

/*======================================================
4.2 NIEUWE GET RECIPE BUTTON OM OUDE NEXT QUESTION BUTTON TE VERVANGEN
========================================================*/
function createGetRecipeButton(location) {
    const getRecipeButton = document.createElement('button');
    getRecipeButton.setAttribute('id', `get-recipe-button`);
    getRecipeButton.setAttribute('type', 'button');
    getRecipeButton.setAttribute('name', 'get-recipe-button')
    getRecipeButton.textContent = 'Get Recipes';

    location.appendChild(getRecipeButton);
    getRecipeButton.addEventListener("click",clickSearchRecipe);

}
/*======================================================
5.0 SEARCH RECIPES
========================================================*/

function clickSearchRecipe(e){
    const currentValue =e;
    // console.log(currentValue);
    findFilters()
    fetchRecipeByComplexSearch();
}

/*======================================================
5.1 ZOEK FILTERS
========================================================*/

function findFilters() {
    //zoekt waarde radio button
    let question = document.forms[0];
    let newQuestion = '';
    let txt = '';

    for (let j = 0; j < question.length; j++) {
        if (question[j].checked) {
            txt = txt + question[j].value + '';
        }
    }

    for (let j = 0; j < questions.length; j++) {
        for (let k = 0; k < questions[j].possibleAnswer.length; k++) {
            if (questions[j].possibleAnswer[k] === txt) {
                let filter = questions[j].filters[k];
                document.getElementById('question').textContent = newQuestion;
                // console.log(filter)
                // let op meteen voor api leesbaar maken
                cuisine = questions[j].filters[k].cuisine;
                type = questions[j].filters[k].type;
                intolerances = questions[j].filters[k].intolerances;
                diet = questions[j].filters[k].diet;
                //let maxReadyTime = "";
                //
                query = questions[j].filters[k].query;
                includeIngredients = questions[j].filters[k].includeIngredients;
            }
        }
    }
}


/*=====================================================
5.2 FETCH RECIPES BY COMPLEX SEARCH
        LEEST ARRAY IN
        ROEPT API AAN
        ROEPT FUNCTIE AAN OM GEWENSTE DATA OP SCHERM WEER TE GEVEN
=====================================================*/
let allRecipes = ['']
async function fetchRecipeByComplexSearch( ) {
    try{
        const response = await axios.get("https://api.spoonacular.com/recipes/complexSearch",{
            params: {
                //apiKey: "6e41860e63d24f118286264f375838f2",
                apiKey: "0ea888df639e4008aaa3ba44e12aba2b",
                //apiKey:"ad01ecc0b5524566b68a2abde8fd592e",
                query: query,       //The (natural language) recipe search query.
                cuisine: cuisine,       //The (natural language) recipe search query.
                //excludeCuisine: excludeCuisine,
                diet: diet,
                intolerances: intolerances,
                includeIngredients: includeIngredients,
                //excludeIngredients: excludeIngredients,
                type: type,
                //maxReadyTime: maxReadyTime,//number

                number: 2       //hoeveel recepten teruggegven
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
5.3 CREATE RECIPE LIST
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
        Dit is de referentie waarin alles geplakt gaat worden.
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
5.4 RECIPE DETAIL
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
            recipe.appendChild(recipeRef);
        }
    }
}




