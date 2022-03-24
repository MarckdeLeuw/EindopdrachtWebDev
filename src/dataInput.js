/*===============================
1.  tbv list
===============================*/

export const inventory = [
    {
        category :"Vegetables",
        products: ["Asparagus", "Avocado", "Beets", "Broccoli", "Carrot", "Cauliflower","Celery", "Chicory","Chili", "Cucumber", "Eggplant", "Endive", "Fennel", "Kale", "Legumes", "Mushrooms", "Pepper", "Parsnip", "Portobello", "Potatoes", "Pumpkin", "Rhubarb", "Spinach", "Tomato", "Zucchini"],
    },
    {
        category :"Vegan",
        products: ["Falafel", "Tempeh", "Tofu"],
    },
    {
        category :"Nuts",
        products: ["Almonds", "Cashews", "Hazelnuts", "Peanut", "Walnuts"],
    },
    {
        category :"Preserves",
        products: ["Beans", "Chickpeas", "CoconutMilk", "Corn", "Lentils", "Pickle"],
    },
    {
        category :"Fruit",
        products:["Apple", "Banana", "Blackberries", "Blueberries", "Cantaloupe", "Cherries", "Cranberry", "Currants", "Figs", "Jackfruit", "Kiwi", "Lychee", "Mandarin", "Mango", "Melon", "Nectarines", "Papaya", "Peach", "Pears", "Pineapple", "Plums", "Pomegranate", "Raspberries", "RedCurrants", "Strawberries", "Watermelon"],
    },
    {
        category :"Dairy & Alternatives",
        products: ["AlmondMilk", "Brie", "Burrata", "Cheese", "Halloumi", "Mozzarella", "Parmesan", "Ricotta", "SoyMilk"],
    },
    {
        category :"Baking goods",
        products: ["Butter", "Flour"],
    },
    {
        category :"Meat",
        products: ["Bacon", "Bavette", "Beef", "Ham", "Ham", "Hash", "Lamb", "Mince", "Picanha", "Pork", "Ribeye", "Sausage", "Schnitzel", "Sirloin", "Spareribs", "Steak", "Tenderloin", "Tournedos"],
    },
    {
        category :"Poultry",
        products: ["Duck", "Chicken", "Turkey"],
    },
    {
        category :"Eggs",
        products: ["Eggs"],
    },
    {
        category :"Fish",
        products: ["Cod", "Mackerel", "Pangasius", "Pollock", "Salmon", "Tuna"],
    },
    {
        category :"Shellfish",
        products: ["Lobster", "Mussels", "Oysters", "Shrimps"],
    },
    {
        category :"Pastas",
        products: ["Bami", "Fusilli", "Gnocchi", "Lasagna", "Macaroni", "Orechiette", "Orzo", "Penne", "Ravioli", "Spaghetti", "Tagliatelle", "Tortellini"],
    },
    {
        category :"Rice & grain",
        products: ["Bulgur", "Couscous", "Oats","Polenta", "Quinoa", "Rice", "Wraps"],
    },
    {
        category :"Spices and herbs",
        products: ["Cinnamon", "Cloves", "Coriander", "Curry", "Paprika","Saffron", "Tarragon", "Turmeric"],
    },
];

/*=========================================
2.      tbv questions
2.1     tbv filters
===========================================*/
export const mainQuestions = [

    {
        category :"Meal Types",
        products: ["Appetizer", "Beverage", "Bread", "Breakfast", "Dessert", "Drink", "Fingerfood", "Main", "Marinade", "Salad", "Sauce", "Side", "Snack", "Soup"],
    },
    {
        category:"Diet",
        products:["GlutenFree", "LactoVegetarian", "OvoVegetarian", "Paleo", "Pescetarian", "Vegan", "Vegetarian"],
    },
    {
        category:"Intolerances",
        products:["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish", "Soy", "Sulfite", "TreeNut", "Wheat"],
    },
    {
        category:"Maximum time (min)",
        products:["15","30","45","60","75","90","more"],
    },
];

/*=========================================
2.      tbv questions
2.2     tbv interactief
===========================================*/
export const questions = [
    {
        questionInput : 'How are you feeling today?',
        lastQuestion : false,
        possibleAnswer : [
            'Great! I feel like making a nice dish!',
            'I don\'t feel so good today....'
        ],
        nextQuestion : [
            'Nice to hear what is the occasion?',
            'I\'m sorry to hear that. What\'s wrong?'
        ],
    },

    {
        questionInput : 'Nice to hear what is the occasion?',
        lastQuestion : false,
        possibleAnswer : [
            'I\'m looking for something tasty for the holidays!',
            'I (have a birthday today and) am having a party!',
            'The weather is great!'
        ],
        nextQuestion : [
            'Always fun! For which holiday are you looking for a dish?',
            'Congratulations! Here are some fun themes. What do you want to search for?',
            'Outstanding! Then you probably want to eat outside! What are you looking forward to?'
        ],
    },
    {
        questionInput : 'I\'m sorry to hear that. What\'s wrong?',
        lastQuestion : false,
        possibleAnswer : [
            'I\'m just in the mood for comfort food...',
            'I have a cold...',
            'I have a hangover...',
            'I\'m on my period'
        ],
        nextQuestion : [
            'How annoying!\n' +
            'Comfort food is very personal.\n' +
            'What kind of food do you feel like?',

            'If you have a cold, it is wise to eat the following things.\n' +
            'Vitamin C can shorten the period of illness. Eat as many fruits and vegetables as possible with a lot of vitamin C. Think, for example, of rosehip, bell pepper, chicory, kiwi and broccoli.\n' +
            '\n' +
            'A warm soup ensures that you often feel better immediately. It softens your throat and \'opens\' your nose again. Eat nice chicken soup with lots of vegetables!\n' +
            '\n' +
            'Proteins are an important building material for your body, for example for the antibodies and enzymes of the immune system. Proteins can be found in fish, eggs, meat, beans and legumes.\n' +
            '\n' +
            'Chili peppers contain the substance capsaicin. Research has shown that this substance supports your immune system. Do we go for the soup or do you feel more like something else?',

            'First of all drink a lot of water!\n' +
            '\n' +
            'Eat eggs. These are full of amino acids such as cysteine and taurine. Also take extra potassium in the form of bananas, kiwis or leafy vegetables. Ginger is also great. Still in the mood for something fat? Go for salmon. The fish oil and B12 help the stomach to break down alcohol. Do you want to go for the wise choice?',

            'It is wise to eat products rich in iron, vitamin B, omega-3, fiber-rich vegetables. Do you want to go for the wise choice?'
        ],

    },

    {
        questionInput : 'Always fun! For which holiday are you looking for a dish?',
        lastQuestion : true,
        possibleAnswer : [
            'I\'m looking for recipes for Christmas.',
            'I\'m looking for Easter recipes.',
            'I\'m looking for carnival recipes.',
            'I\'m looking for Halloween recipes.',
            'I\'m looking for new year\'s eve recipes.'
        ],
        nextQuestion : [
            '',
            ''
        ],
        filters : [
            {
                cuisine: '',
                type:'',
                intolerances:'',
                diet:'',
                query:'christmas',
                includeIngredients:'',
            },
            {
                cuisine: '',
                type:'',
                intolerances:'',
                diet:'',
                query:'easter',
                includeIngredients:'',
            },
            {
                cuisine: '',
                type:'',
                intolerances:'',
                diet:'',
                query:'sausage rolls',//doet het niet
                includeIngredients:'',
            },
            {
                cuisine: '',
                type:'',
                intolerances:'',
                diet:'',
                query:'halloween',
                includeIngredients:'',
            },
            {
                cuisine: '',
                type:'',
                intolerances:'',
                diet:'',
                query:'new year eve',
                includeIngredients:'',
            },
        ],
    },
    {
        questionInput : 'Congratulations! Here are some fun themes. What do you want to search for?',
        lastQuestion : true,
        possibleAnswer : [
            'BBQ.',
            'Soup.',
            'Sandwiches',
            'Snacks',
            'Birthday cake',
        ],
        nextQuestion : [
            '',
            ''
        ],
        filters : [
            {
                cuisine: '',
                type:'',
                intolerances:'',
                diet:'',
                query:'bbq',
                includeIngredients:'',
            },
            {
                cuisine: '',
                type:'',
                intolerances:'',
                diet:'',
                query:'soup',
                includeIngredients:'',
            },
            {
                cuisine: '',
                type:'',
                intolerances:'',
                diet:'',
                query:'sandwiches',
                includeIngredients:'',
            },
            {
                cuisine: '',
                type:'',
                intolerances:'',
                diet:'',
                query:'snacks',
                includeIngredients:'',
            },
            {
                cuisine: '',
                type:'',
                intolerances:'',
                diet:'',
                query:'birthday cake',
                includeIngredients:'',
            },
        ],
    },
    {
        questionInput : 'Outstanding! Then you probably want to eat outside! What are you looking forward to?',
        lastQuestion : true,
        possibleAnswer : [
            'I\'m going to have a picnic.',
            'I\'m going to barbecue.',
            'I feel like a nice salad.'
        ],
        nextQuestion : [
            '',
            ''
        ],
        filters : [
            {
                cuisine: '',
                type:'',
                intolerances:'',
                diet:'',
                query:'picnic',
                includeIngredients:'',
            },
            {
                cuisine: '',
                type:'',
                intolerances:'',
                diet:'',
                query:'bbq',
                includeIngredients:'',
            },
            {
                cuisine: '',
                type:'',
                intolerances:'',
                diet:'',
                query:'salad',
                includeIngredients:'',
            },
        ],
    },
    {
        questionInput :
            'How annoying!\n' +
            'Comfort food is very personal.\n' +
            'What kind of food do you feel like?',
        lastQuestion : true,
        possibleAnswer : [
            'I\'m a real sweet tooth!',
            'I prefer snacks...',
            'I\'m going for something Italian.',
            'I\'m in the mood for a stew.',
            'Let\'s go for noodles.'
        ],

        filters : [
            {
                cuisine: '',
                type:'',
                intolerances:'',
                diet:'',
                query:'sweet',
                includeIngredients:'',
            },
            {
                cuisine: '',
                type:'',
                intolerances:'',
                diet:'',
                query:'snacks',
                includeIngredients:'',
            },
            {
                cuisine: 'italian',
                type:'',
                intolerances:'',
                diet:'',
                query:'',
                includeIngredients:'',
            },
            {
                cuisine: '',
                type:'',
                intolerances:'',
                diet:'',
                query:'stew',
                includeIngredients:'',
            },
            {
                cuisine: '',
                type:'',
                intolerances:'',
                diet:'',
                query:'noodles',
                includeIngredients:'',
            },
        ],
    },
    {
        questionInput :
            'If you have a cold, it is wise to eat the following things.\n' +
            'Vitamin C can shorten the period of illness. Eat as many fruits and vegetables as possible with a lot of vitamin C. Think, for example, of rosehip, bell pepper, chicory, kiwi and broccoli.\n' +
            '\n' +
            'A warm soup ensures that you often feel better immediately. It softens your throat and \'opens\' your nose again. Eat nice chicken soup with lots of vegetables!\n' +
            '\n' +
            'Proteins are an important building material for your body, for example for the antibodies and enzymes of the immune system. Proteins can be found in fish, eggs, meat, beans and legumes.\n' +
            '\n' +
            'Chili peppers contain the substance capsaicin. Research has shown that this substance supports your immune system. Do we go for the soup or do you feel more like something else?',
        lastQuestion : true,
        possibleAnswer : [
            'I\'m going for the chicken soup...',
            'I don\'t like chicken soup'
        ],
        nextQuestion : [
            '',
            ''
        ],
        filters : [
            {
                cuisine: '',
                type:'',
                intolerances:'',
                diet:'',
                query:'chicken soup',
                includeIngredients:'chili',
            },
            {
                cuisine: '',
                type:'',
                intolerances:'',
                diet:'',
                query:'smoothie',
                includeIngredients:'banana',
            },
        ],
    },
    {
        questionInput :
            'First of all drink a lot of water!\n' +
            '\n' +
            'Eat eggs. These are full of amino acids such as cysteine and taurine. Also take extra potassium in the form of bananas, kiwis or leafy vegetables. Ginger is also great. Still in the mood for something fat? Go for salmon. The fish oil and B12 help the stomach to break down alcohol. Do you want to go for the wise choice?',
        lastQuestion : true,
        possibleAnswer : [
            'Yes, let\'s be sensible...',
            'No, I\'m still kind of drunk...'
        ],
        nextQuestion : [

            // 'In Mexico drinken ze nog meer bier met de vreemdste toevoegingen. Michelada!!'
        ],
        filters : [
            {
                cuisine: '',
                type:'',
                intolerances:'',
                diet:'',
                query:'',
                includeIngredients:'salmon, eggs, spinach',
            },
            {
                cuisine: '',
                type:'',
                intolerances:'',
                diet:'',
                query:'Michelada',
                includeIngredients:'',
            },
        ],
    },
    {
        questionInput : 'It is wise to eat products rich in iron, vitamin B, omega-3, fiber-rich vegetables. Do you want to go for the wise choice?',
        lastQuestion : true,
        possibleAnswer : [
            'Yes, let\'s do healthy...',
            'No, I want chocolate!'
        ],
        nextQuestion : [
            // '',
            // 'Chocola'
        ],
        filters : [
            {
                cuisine: '',
                type:'',
                intolerances:'',
                diet:'',
                query:'',
                includeIngredients:'chocolate',
            },
            {
                cuisine: '',
                type:'',
                intolerances:'',
                diet:'',
                query:'',
                includeIngredients:'chocolate',
            },
        ],
    },



];

/*=========================================
3.      tbv search/browse
2.1     tbv filters
===========================================*/
export const filters = [
    {
        category :"Cuisine",
        products:["African","American","British","Cajun","Caribbean","Chinese","European","French","German","Greek","Indian","Irish","Italian","Japanese","Jewish","Korean","LatinAmerican","Mediterranean","Mexican","MiddleEastern","Nordic","Southern","Spanish","Thai","Vietnamese"],
    },
    {
        category :"Types",
        products: ["Appetizer", "Beverage", "Bread", "Breakfast", "Dessert", "Drink", "Fingerfood", "Main", "Marinade", "Salad", "Sauce", "Side", "Snack", "Soup"],
    },
    {
        category:"Intolerances",
        products:["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish", "Soy", "Sulfite", "TreeNut", "Wheat"],
    },
    {
        category:"Diet",
        products:["GlutenFree", "LactoVegetarian", "OvoVegetarian", "Paleo", "Pescetarian", "Vegan", "Vegetarian"],
    },
    /*  {
      category:"Max Ready Time",
      products:["15","30","45","60","75","90","more"],
  },*/
];

/*==================================
=====================================*/

