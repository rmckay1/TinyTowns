let selectedCoords = new Set();

class TownGrid {
    constructor() {
        this.grid = [
            ["", "", "", ""],
            ["", "", "", ""],
            ["", "", "", ""],
            ["", "", "", ""]
        ];
    }

    placeResource(r, c, resource) {
        this.grid[r][c] = resource;
    }

    getResource(r, c) {
        if (this.grid[r][c] != "") {
            return this.grid[r][c];
        }
    }

    getGrid() {
        return this.grid;
    }

    setGrid(grid) {
        this.grid = grid;
    }
}

const townGrid = new TownGrid();

// helper function to add hover class on mouseover, param is nodeList (querySelectorAll)
function addHoverClass(nodeList) {
    // for each element in the nodelist
    nodeList.forEach(function(element){
        // add a mouseover event listener 
        element.addEventListener('mouseover', function() {
            // assigns class list when hovered
            // if (element.classList.contains("off")){
                 element.classList.add('hovered');
            // }
        });
        // removes classlist when un-hovered
        element.addEventListener('mouseout', function(){
            element.classList.remove('hovered');
        });
    });
}

// adding event listeners to all build tiles
function addTileEventListener(nodeList, deck) {
    nodeList.forEach(function(element) {
        element.addEventListener('click', function() {

            if(document.getElementById("well").classList.contains('hovered')) {
                placeStructure(element, "well");
                // return to prevent other onclick events from happening
                return;
            }

            if(document.getElementById("theatre").classList.contains('hovered')) {
                placeStructure(element, "theatre");
                // return to prevent other onclick events from happening
                return;
            }

            if(document.getElementById("factory").classList.contains('hovered')) {
                placeStructure(element, "factory");
                // return to prevent other onclick events from happening
                return;
            }

            if(document.getElementById("cottage").classList.contains('hovered')) {
                placeStructure(element, "cottage");
                // return to prevent other onclick events from happening
                return;
            }

            if(document.getElementById("chapel").classList.contains('hovered')) {
                placeStructure(element, "chapel");
                // return to prevent other onclick events from happening
                return;
            }

            if(document.getElementById("farm").classList.contains('hovered')) {
                placeStructure(element, "farm");
                // return to prevent other onclick events from happening
                return;
            }

            if(document.getElementById("tavern").classList.contains('hovered')) {
                placeStructure(element, "tavern");
                // return to prevent other onclick events from happening
                return;
            }

            if(document.getElementById("Caterina").classList.contains('hovered')) {
                placeStructure(element, "Caterina");
                // return to prevent other onclick events from happening
                return;
            }


            if (!selectedResource 
            && element.querySelector('span').classList.contains("invisible") == false 
            && element.querySelector('span').classList.contains("well") == false 
            && element.querySelector('span').classList.contains("theatre") == false
            && element.querySelector('span').classList.contains("factory") == false
            && element.querySelector('span').classList.contains("cottage") == false
            && element.querySelector('span').classList.contains("chapel") == false
            && element.querySelector('span').classList.contains("farm") == false
            && element.querySelector('span').classList.contains("tavern") == false
            && element.querySelector('span').classList.contains("Caterina") == false) {
                if (element.classList.contains('greenBorder')) {
                    element.classList.remove('greenBorder');

                    let coordToDelete = [element.dataset.row, element.dataset.col];
                    for (let coord of selectedCoords) {
                        if (coord.every((val, index) => val === coordToDelete[index])) {
                          selectedCoords.delete(coord);
                        }
                    }

                } else {
                    element.classList.add('greenBorder');
                    selectedCoords.add([element.dataset.row, element.dataset.col]);

                    if((checkValidPattern(wellRec.getRecipes(), selectedCoords))) {
                        document.getElementById("well").classList.add('hovered');
                    }
                    if((checkValidPattern(theatreRec.getRecipes(), selectedCoords))) {
                        document.getElementById("theatre").classList.add('hovered');
                    }
                    if((checkValidPattern(factoryRec.getRecipes(), selectedCoords))) {
                        document.getElementById("factory").classList.add('hovered');
                    }
                    if((checkValidPattern(cottageRec.getRecipes(), selectedCoords))) {
                        document.getElementById("cottage").classList.add('hovered'); 
                    }
                    if((checkValidPattern(chapelRec.getRecipes(), selectedCoords))) {
                        document.getElementById("chapel").classList.add('hovered');
                    }
                    if((checkValidPattern(farmRec.getRecipes(), selectedCoords))) {
                        document.getElementById("farm").classList.add('hovered');
                    }
                    if((checkValidPattern(tavernRec.getRecipes(), selectedCoords))) {
                        document.getElementById("tavern").classList.add('hovered');
                    }
                    if((checkValidPattern(cathedralRec.getRecipes(), selectedCoords))) {
                        document.getElementById("Caterina").classList.add('hovered');
                    }

                    
                }
            }


            // console.log(`Selected Coords:`);
            for (const coord of selectedCoords) {
                console.log(coord);
                console.log(townGrid.getGrid())
            }
            if (selectedResource == "inherit" || selectedResource == null || this.querySelector('span').classList.contains('wood') || this.querySelector('span').classList.contains('wheat') || this.querySelector('span').classList.contains('brick') || this.querySelector('span').classList.contains('glass') || this.querySelector('span').classList.contains('stone')){
                return;
            }

            this.querySelector('span').classList.add(selectedResource);
            this.querySelector('span').classList.remove("invisible");

            
            townGrid.placeResource(element.dataset.row, element.dataset.col, selectedResource);
            console.log(townGrid.getGrid());
            // console.log(`Placed resource: ${selectedResource} at (${element.dataset.row}, ${element.dataset.col})`);
            // console.log(townGrid.getGrid());

            replaceUsedResourceCard(deck);
            deck.setCurCard(null);
            resourceCardCleanup();
            showOpenSlots(false);
            selectedResource = null;
        });
    });
    ;
}

function replaceUsedResourceCard(deck) {
    const resourceCards = document.querySelectorAll(".resources .card");

    for (let card of resourceCards) {
        if (card.dataset.cardNum === deck.getCurCard()) {
            deck.putCardUnderDeck(card.dataset.resource);
            let newType = deck.drawCard()
            let span = card.querySelector("span");
            span.className = `${newType} blocks`;
            card.innerHTML = `<span class="${newType} blocks"></span><br>${newType}`;
            card.dataset.resource = newType;
            console.log(deck.getDeck())

            console.log(`Replaced card ${deck.getCurCard()} with ${newType}`);

            break;
        }
    }
}




// Shows all empty slots on the build board. 
// param == true means show all spots that are empty, 
// param == false means hide all spots that are empty
function showOpenSlots(Boolean) {
    const squares = document.querySelectorAll('.town .tile .blocks');
    // console.log(squares);
    // if (enablePlacement == true) {
        if (Boolean == true){
            console.log("true case for showOpenSlots!");

            squares.forEach(function(span) {
                if(span.classList.contains("invisible")){
                    span.classList.remove("invisible");
                }   
            });
        } else {
            console.log("false case for showOpenSlots!");
            squares.forEach(function(span) {
                if (!span.classList.contains("wood") && !span.classList.contains("wheat") && !span.classList.contains("brick") && !span.classList.contains("glass") && !span.classList.contains("stone")) {
                    // console.log(span);
                    span.classList.add("invisible");
                }
            });
        }
    // }
}

function clearBuildSelection() {
    const squares = document.querySelectorAll('.town .tile');
    console.log("button pressed!");
    squares.forEach(function(span) {
        if(span.classList.contains("greenBorder")){
            span.classList.remove("greenBorder");
        }
    selectedCoords.clear();
    document.querySelectorAll('.buildables .card').forEach(function(element){
        if (element.classList.contains('hovered')){
            element.classList.remove('hovered');
        }
    });

    });
}

// Selecting/Deselecting of resource cards 
function onOff(nodeList, param){
    const resourceCards = document.querySelectorAll('.resources .card');
    if (param.classList.contains('on') && 
        (resourceCards[0].classList.contains('off') || 
         resourceCards[1].classList.contains('off') || 
         resourceCards[2].classList.contains('off'))) {
        resourceCardCleanup();
        showOpenSlots(false);
        selectedResource = "inherits";
        console.log('Odd case for enablePlacement hit!');
        // return enablePlacement = true;
    // }


    // if (enablePlacement == true) {
    //     console.log("TRUE case for enablePlacement");
    //     resourceCards.forEach(function(element) {
    //         element.classList.remove('off');
    //         element.classList.add('on');
    //     });
    //     showOpenSlots(true);
    //     // return enablePlacement = true;
    
    } else {

        console.log("FALSE case for enablePlacement");
        nodeList.forEach(function(element) {
            if (element.dataset.cardNum != param.dataset.cardNum) {
                element.classList.remove('on');
                element.classList.add('off');
                showOpenSlots(true);
            }
        });
        // return enablePlacement = true; 
    }
}

// this function handles structure placement and resets other blocks to empty board (default)
function placeStructure(element, structure) {
    if (confirm("do you want to build a " + structure + "?") && element.classList.contains('greenBorder')) {
        console.log('structure is ' + structure);
        // reset selected resource
        selectedResource = null;
        // set the span class (block) to its structure
        element.innerHTML = `<span class="${structure}"></span>`;
        // remove the selected border (greenBorder) from the element you clicked to build a structure upon
        element.classList.remove('greenBorder', 'hovered');
        console.log('element is ' + element.classList);
        // place structure into townGrid
        townGrid.placeResource(element.dataset.row, element.dataset.col, structure);

        // remove the hovered (highlight) from what structure you are building
        document.getElementById(structure).classList.remove("hovered");

        // query all selected tiles
        document.querySelectorAll('.greenBorder').forEach(function(otherSelected){
            // remove their border
            otherSelected.classList.remove('greenBorder');
            // remove all the classes in the span (block)
            otherSelected.querySelector('span').setAttribute('class', '');
            // add back default classes
            otherSelected.querySelector('span').classList.add('invisible','blocks');
            // place an empty string on were blocks used to be
            townGrid.placeResource(otherSelected.dataset.row, otherSelected.dataset.col, '');
        });
    // clear all selected tiles, ** this also clears selectedCoords **
    clearBuildSelection(); 
    } else {
        document.getElementById(structure).classList.remove("hovered");
        clearBuildSelection();  
    }
}

// Adding event listeners to all resource cards, once you select a card, "deselect" all other cards and show all open spots to put blocks. 
function resourceOnOffEventListener(nodeList, deck) {

    nodeList.forEach(function(element){
        element.addEventListener('click', function() {

            if (this.classList.contains('on')){
                onOff(nodeList, this);
                deck.setCurCard(this.dataset.cardNum);
                selectedResource = this.dataset.resource;
                console.log(selectedResource);
            } else {
                resourceCardCleanup();
                showOpenSlots(false);
                selectedResource = "inherit";
            }

        });
    });
}

// Resetting resource cards to all are selectable
function resourceCardCleanup(){
    const nodeList = document.querySelectorAll('.resources .card'); 
    nodeList.forEach(function(element){
        if (element.classList.contains("off")){
            element.classList.remove("off");
            element.classList.add("on");
        }
    });
}

function addHoverBehavior(deck) {
    // select all elements with the class tile that are inside an element with the class town
    const townTiles = document.querySelectorAll('.town .tile');
    // select all elements with the classes .matsAndBuildTile .resources .card
    const resourceTiles = document.querySelectorAll('.resources .card');

    const button = document.querySelectorAll('.button');
    //console.log(selectedResource);
    // console.log(resourceTiles);

    // Iterate over each tile and add event listeners
    addHoverClass(townTiles);
    addHoverClass(resourceTiles);
    addHoverClass(button);
    resourceOnOffEventListener(resourceTiles, deck);
    addTileEventListener(townTiles, deck);
    // console.log(townTiles);
    // console.log(resourceTiles)

}

//Sets up the 3 resource cards
function resourcesSetUp(deck) {
    const resources = document.getElementById("resources");
    for (let i = 0; i < 3; i++) {
        let resource = document.createElement("div");
        let type = deck.drawCard();
        resource.classList.add("resource");
        resource.classList.add("card");
        resource.classList.add("on");
        resource.innerHTML = `<span class="${type} blocks"></span><br>${type}`;
        resource.dataset.resource = type;
        resource.dataset.cardNum = i;
        resources.appendChild(resource);
    }
}



//Sets up the town grid dynamically
function setUpTownGrid() {
    const town = document.getElementById("town");

    for (let row= 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            tile.dataset.row = row;
            tile.dataset.col = col;
            tile.innerHTML = `<span class="blocks invisible"></span>`;
            town.appendChild(tile);
        }
    }
}

class Game {
    constructor() {
        this.deck = new Deck()
    }

    useResource(element) {
        let cardNum = element;
    }

    startGame() {
        setUpTownGrid();
        resourcesSetUp(this.deck);
        addHoverBehavior(this.deck);
    }

}

class Deck {
    constructor() {
        this.deck = ["wood", "wood", "wood", "wheat", "wheat", "wheat", "brick", "brick", "brick", "glass", "glass", "glass", "stone", "stone", "stone"];
        this.curCard = null;
        this.shuffleDeck();
    }

    //ripped from stackoverflow, sorry dr. garret
    shuffleDeck() {
        let currentIndex = this.deck.length;
        
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
        
            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
        
            // And swap it with the current element.
            [this.deck[currentIndex], this.deck[randomIndex]] = [this.deck[randomIndex], this.deck[currentIndex]];
        }
    }

    drawCard() {
        return this.deck.shift();
    }

    putCardUnderDeck(card) {
        this.deck.push(card);
    }

    getDeck() {
        return this.deck;
    }

    setCurCard(cardNum) {
        this.curCard = cardNum;
    }

    getCurCard() {
        return this.curCard;
    }
}





class Recipe {
    constructor(type, recipes) {
        this.type = type;
        this.recipes = recipes;
    }

    getRecipes() {
        return this.recipes;
    }

    getType() {
        return this.type;
    }
}
const wellRec = new Recipe("well", [
    [["wood", "stone"]],  // Original
    [["wood"], ["stone"]],  // 90° rotation
    [["stone", "wood"]],  // 180° rotation
    [["stone"], ["wood"]],  // 270° rotation
    [["stone", "wood"]],  // Horizontal flip
    [["wood", "stone"]],  // Vertical flip
    [["wood"], ["stone"]],  // Main diagonal flip
    [["stone"], ["wood"]]  // Anti-diagonal flip
]);

const theatreRec = new Recipe("theatre", [
    [ ["", "stone", ""],  ["wood", "glass", "wood"] ],  // Original
    [ ["wood", ""], ["glass", "stone"], ["wood", ""] ], // 90° Rotation
    [ ["wood", "glass", "wood"], ["", "stone", ""] ],   // 180° Rotation
    [ ["", "wood"], ["stone", "glass"], ["", "wood"] ], // 270° Rotation
    [ ["", "stone", ""], ["wood", "glass", "wood"] ],   // Horizontal Flip (same as original)
    [ ["wood", "glass", "wood"], ["", "stone", ""] ],   // Vertical Flip
    [ ["", "wood"], ["stone", "glass"], ["", "wood"] ], // Main Diagonal Flip
    [ ["wood", ""], ["glass", "stone"], ["wood", ""] ]  // Anti-Diagonal Flip
]);

const factoryRec = new Recipe("factory", [
    [["wood", "", "", ""], ["brick", "stone", "stone", "brick"]],  // Original
    [["brick", "wood"], ["stone", ""], ["stone", ""], ["brick", ""]],  // 90° rotation
    [["brick", "stone", "stone", "brick"], ["", "", "", "wood"]],  // 180° rotation
    [["", "brick"], ["", "stone"], ["", "stone"], ["wood", "brick"]],  // 270° rotation
    [["", "", "", "wood"], ["brick", "stone", "stone", "brick"]],  // Horizontal flip
    [["brick", "stone", "stone", "brick"], ["wood", "", "", ""]],  // Vertical flip
    [["wood", "brick"], ["", "stone"], ["", "stone"], ["", "brick"]],  // Main diagonal flip
    [["brick", ""], ["stone", ""], ["stone", ""], ["brick", "wood"]]  // Anti-diagonal flip
]);

const cottageRec = new Recipe("cottage", [
    [["", "wheat"], ["brick", "glass"]],  // Original
    [["brick", ""], ["glass", "wheat"]],  // 90° rotation
    [["glass", "brick"], ["wheat", ""]],  // 180° rotation
    [["wheat", "glass"], ["", "brick"]],  // 270° rotation
    [["wheat", ""], ["glass", "brick"]],  // Horizontal flip
    [["brick", "glass"], ["", "wheat"]],  // Vertical flip
    [["", "brick"], ["wheat", "glass"]],  // Main diagonal flip
    [["glass", "wheat"], ["brick", ""]]   // Anti-diagonal flip
]);

const chapelRec = new Recipe("chapel", [
    [["", "", "glass"], ["stone", "glass", "stone"]],  // Original
    [["stone", ""], ["glass", ""], ["stone", "glass"]],  // 90° rotation
    [["stone", "glass", "stone"], ["glass", "", ""]],  // 180° rotation
    [["glass", "stone"], ["", "glass"], ["", "stone"]],  // 270° rotation
    [["glass", "", ""], ["stone", "glass", "stone"]],  // Horizontal flip
    [["stone", "glass", "stone"], ["", "", "glass"]],  // Vertical flip
    [["", "stone"], ["", "glass"], ["glass", "stone"]],  // Main diagonal flip
    [["stone", "glass"], ["glass", ""], ["stone", ""]]  // Anti-diagonal flip
]);

const farmRec = new Recipe("farm", [
    [["wheat", "wheat"], ["wood", "wood"]],  // Original
    [["wood", "wheat"], ["wood", "wheat"]],  // 90° rotation
    [["wood", "wood"], ["wheat", "wheat"]],  // 180° rotation
    [["wheat", "wood"], ["wheat", "wood"]],  // 270° rotation
    [["wheat", "wheat"], ["wood", "wood"]],  // Horizontal flip (same as original)
    [["wood", "wood"], ["wheat", "wheat"]],  // Vertical flip (same as 180°)
    [["wheat", "wood"], ["wheat", "wood"]],  // Main diagonal flip (same as 270°)
    [["wood", "wheat"], ["wood", "wheat"]]   // Anti-diagonal flip (same as 90°)
]);

const tavernRec = new Recipe("tavern", [
    [["brick", "brick", "glass"]],  // Original
    [["brick"], ["brick"], ["glass"]],  // 90° rotation
    [["glass", "brick", "brick"]],  // 180° rotation
    [["glass"], ["brick"], ["brick"]],  // 270° rotation
    [["glass", "brick", "brick"]],  // Horizontal flip
    [["brick", "brick", "glass"]],  // Vertical flip (same as original)
    [["brick"], ["brick"], ["glass"]],  // Main diagonal flip (same as 90° rotation)
    [["glass"], ["brick"], ["brick"]]  // Anti-diagonal flip (same as 270° rotation)
]);

const cathedralRec = new Recipe("cathedral", [
    [["wheat", ""], ["stone", "glass"]],  // Original
    [["stone", "wheat"], ["glass", ""]],  // 90° rotation
    [["glass", "stone"], ["", "wheat"]],  // 180° rotation
    [["", "glass"], ["wheat", "stone"]],  // 270° rotation
    [["", "wheat"], ["glass", "stone"]],  // Horizontal flip
    [["stone", "glass"], ["wheat", ""]],  // Vertical flip
    [["wheat", "stone"], ["", "glass"]],  // Main diagonal flip
    [["glass", ""], ["stone", "wheat"]]   // Anti-diagonal flip
]);


// Function to get a sub-matrix of the input matrix by removing any empty rows or columns
function getSubMatrix(selectedCoords) {
    // // Filter out rows that are completely empty (all cells are "")
    // let nonEmptyRows = matrix.filter(row => row.some(cell => cell !== ""));
    // // Initialize an array to store the non-empty columns
    // let nonEmptyCols = [];

    // // Loop through each column of the first row and check if any row in that column has a non-empty value
    // for (let col = 0; col < nonEmptyRows[0].length; col++) {
    //     if (nonEmptyRows.some(row => row[col] !== "")) {
    //         nonEmptyCols.push(col);  // If the column has a non-empty value, add it to nonEmptyCols
    //     }
    // }

    // // Map the non-empty rows and columns into a new sub-matrix and return it
    // return nonEmptyRows.map(row => nonEmptyCols.map(col => row[col]));
    const coordsArray = [...selectedCoords];
    let r0 = 3;
    let rf = 0;
    let c0 = 3;
    let cf = 0;

    for (let i = 0; i < coordsArray.length; i++) {
        let coord = coordsArray[i];  // Access each coord as if it's an array element
        
        if (coord[0] < r0) {
            r0 = coord[0];
        }
        if (coord[0] > rf) {
            rf = coord[0];
        }
        if (coord[1] < c0) {
            c0 = coord[1];
        }
        if (coord[1] > cf) {
            cf = coord[1];
        }
    }
    const submatrix = [];
    console.log(`Coords array: ${coordsArray}`);
    for (let i = r0; i <= rf; i++) {
        const row = [];
        for (let j = c0; j <= cf; j++) {
            let content = "";


            for (let n = 0; n < coordsArray.length; n++) {
                let r = coordsArray[n][0];
                let c = coordsArray[n][1];

                if (r == i && c == j) {
                    content = townGrid.getGrid()[r][c];
                }
            }

            row.push(content);
        }
        submatrix.push(row);
    }
    console.log(`${r0} ${rf} ${c0} ${cf}`);

    
    return submatrix;

}

// Function to check if a given sub-matrix matches a recipe matrix exactly
function checkValidRecipe(recipe, sub) {
    // console.log("recipe is " + recipe);
    // console.log("sub is " + sub);
    // Check if the sub-matrix and the recipe matrix have the same number of rows
    if (sub.length == recipe.length) {
        // Check if the number of columns in the sub-matrix matches the recipe
        if (sub[0].length == recipe[0].length) {
            // Iterate through all rows and columns to compare each cell
            for (let r = 0; r < sub.length; r++) {
                for (let c = 0; c < sub[0].length; c++) {
                    // If any corresponding cell doesn't match, the recipe is invalid
                    if (sub[r][c] !== recipe[r][c]) {
                        return false; // Return false if mismatch found
                    }
                }
            }
        } else {
            return false; // Return false if the number of columns doesn't match
        }
    } else {
        return false; // Return false if the number of rows doesn't match
    }
    return true; // Return true if all rows and columns match
}

// Function to check if the selected coordinates match any valid recipe pattern
function checkValidPattern(recipes, selectedCoords) {
    // Initialize a 4x4 grid filled with empty strings to represent the full pattern
    let fullMat = [["", "", "", ""],["", "", "", ""],["", "", "", ""],["", "", "", ""]];
    // Loop through the selected coordinates and fill in the grid with the corresponding values
    // console.log(selectedCoords.size);
    const coordsArray = [...selectedCoords];

    for (let i = 0; i < coordsArray.length; i++) {
        let coord = coordsArray[i];  // Access each coord as if it's an array element
        // console.log("coord is: " + coord);
        fullMat[coord[0]][coord[1]] = townGrid.getGrid()[coord[0]][coord[1]];  // Fill the grid with values from the town grid
        // console.log("fullmat is now: " + fullMat);
    }

    // Get the sub-matrix (non-empty portion of the grid)
    // console.log("fullmat is \n" + fullMat);
    // console.log(townGrid.getGrid());
    let sub = getSubMatrix(selectedCoords);
    console.log(sub);
    // Check each recipe to see if it matches the sub-matrix
    for (let i = 0; i < 8; i++) {
        // If a recipe matches, return true
        if (checkValidRecipe(recipes[i], sub)) {
            return true;
        }
    }

    // Return false if no valid recipe was found
    return false;
}


// townGrid.setGrid([
//     ["", "", "", ""],
//     ["", "", "", ""],
//     ["glass", "wheat", "", ""],
//     ["brick", "wheat", "", ""]
// ]);

// console.log(`TF: ${checkValidPattern(cottageRec.getRecipes(), [[2,0],[2,1],[3,0]])}`);

// global variables, keep at the bottom so we can keep track in one place
// let enablePlacement = true;
//This is the function to start the game. keep this at the end
document.addEventListener('DOMContentLoaded', function startGame() {
    const game = new Game();
    game.startGame();

    // console.log(game.getDeck());
    // game.shuffleDeck();
    // console.log(game.getDeck());
    // console.log(game.drawCard());
    // console.log(game.getDeck());
    // game.putCardUnderDeck("card___");
    // console.log(game.getDeck());
});