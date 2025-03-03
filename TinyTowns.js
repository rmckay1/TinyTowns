
// function formatMints(numMints) {
//   return `<span class="outline">${"◉".repeat(numMints)}</span>`
// }
// function formatPlanType(planType) {
//   s = `<span class="outline">`;
//   if (planType === "culture") {
//     s += "❤";
//   } else if (planType === "production") {
//     s += "⛭";
//   } else if (planType === "utility") {
//     s += "⚒";
//   } else if (planType === "deed") {
//     s += "⛿";
//   }
//   s += "</span>";
//   return s;
// }
// function formatStars(numStars, starModifier=null) {
//   s = `<span class="outline">${"★".repeat(numStars)}</span>`;
//   if (starModifier !== null) {
//     s += ` per ${starModifier}`; 
//   }
//   return s;
// }

// class Location {
//   constructor(type, name, spots, cost, description) {
//     this.type = type;
//     this.name = name;
//     this.spots = spots;
//     this.cost = cost;
//     this.nextAvailable = 0;
//     this.description = description;
//     this.opened = type !== 'deed';
//   }

//   isAvailable() {
//     return this.opened && this.nextAvailable < this.spots;
//   }

//   get numAvailable() {
//     return this.isAvailable() ? this.spots - this.nextAvailable : 0;
//   }

//   clear() {
//     this.nextAvailable = 0;
//   }

//   place() {
//     this.nextAvailable += 1;
//   }
// }

// class Plan {
//   constructor(type, name, cost, description, stars, starModifier=null, effects=[]) {
//     this.type = type;
//     this.name = name;
//     this.cost = cost;
//     this.description = description;
//     this.stars = stars;
//     this.starModifier = starModifier;
//     this.built = false;
//     this.effects = effects;
//   }
// }


// class Player {
//   constructor(name) {
//     this.name = name;
//     this._mints = 3;
//     this.startToken = false;
//     this.buildings = [];
//     this.plans = [];
//   }

//   get mints() {
//     return this._mints;
//   }

//   set mints(value) {
//     this._mints = value;
//   }

//   buildPlan(planName) {
//     const plan = this.plans.filter(p => p.name === planName);
//     this.plans = this.plans.filter(p => p.name !== planName);
//     plan[0].built = true;
//     this.buildings.push(plan[0]);
//   }

//   gainPlan(plan) {
//     this.plans.push(plan);
//   }

//   hasBuilding(planName) {
//     return this.buildings.some(p => p.name === planName);
//   }

//   getBuilding(planName) {
//     if (this.hasBuilding(planName)) {
//       return this.buildings.filter(p => p.name === planName)[0];
//     }
//     return null;
//   }

//   getScore() {
//     let culture = 0;
//     for (const plan of this.buildings) {
//       if (plan.type === "culture") { culture += 1; }
//       if (plan.name === "Bridge") { culture += 1; }
//     }
//     let score = 0;
//     for (const plan of this.buildings) {
//       if (plan.starModifier === null) {
//         score += plan.stars;
//       } else if (plan.name === "Gallery") {
//         if (plan.hasOwnProperty("mints")) { score += plan.mints; }
//       } else if (plan.name === "Museum") {
//         score += culture;
//       } else if (plan.name === "Obelisk") {
//         score += this.buildings.length;
//       } else if (plan.name === "Vault") {
//         score += 2 * this.plans.length;
//       }
//     }
//     return score;
//   }

//   startsTheGame() {
//     return true;
//   }

//   canTakeAnotherTurn() {
//     return false;
//   }

//   getAvailableActions(game) {
//     const actions = {"Pass":[]};
//     for (const locName in game.locations) {
//       const loc = game.locations[locName];
//       if (loc.numAvailable > 0) {
//         if (locName === 'Builder') {
//           if (loc.cost <= this.mints || (this.hasBuilding("Crane") && loc.cost <= this.mints+1)) {
//             const plans = this.plans.map(p => p.name);
//             if (plans.length > 0) actions[loc.name] = plans;
//           }
//         } else if (locName === 'Supplier') {
//           const plans = [];
//           for (const planName in game.planSupply) {
//             const p = game.planSupply[planName];
//             if (p.cost <= this.mints || (this.hasBuilding("Truck") && p.cost > 1 && p.cost <= this.mints+1)) {
//               plans.push(p.name);
//             }
//           }
//           if (plans.length > 0) actions[loc.name] = plans;
//         } else if (loc.cost <= this.mints) {
//           actions[loc.name] = [];
//         }
//       } 
//     }
//     return actions;
//   }

//   selectAction(game) {
//     selectPlayerAction(game);
//   }

// }

// class AI extends Player {
//   constructor(name) {
//     super(name);
//   }

//   startsTheGame() {
//     return false;
//   }

//   selectAction(game) {
//     const actions = this.getAvailableActions(game);
//     let action = null;
//     let plan = null;
//     for (const locName of ["Producer", "Wholesaler", "Builder", "Supplier", "Leadership Council", "Lotto"]) {
//       if (locName in actions) {
//         if (locName === "Builder") {
//           if (this.plans.length > 0) {
//             action = locName;
//             plan = this.plans[0].name;
//             break;
//           }
//         } else if (locName === "Supplier") {
//           if (this.plans.length === 0) {
//             const selectedPlan = this.selectPlanFromSupply(game.planSupply, actions[locName]);
//             if (selectedPlan !== null) {
//               action = locName;
//               plan = selectedPlan.name;
//               break;
//             } else {
//               continue;
//             }
//           }
//         } else {
//           action = locName;
//           break;
//         }
//       }
//     }
//     if (action === null) {
//       game.executeAction("Pass");
//     } else {
//       game.executeAction(action, plan);
//     }
//   }

//   selectPlanFromSupply(planSupply, planNames) {
//     throw new Error("Method 'selectPlanFromSupply()' must be implemented in derived classes.");
//   }
// }


// class Sonic extends AI {
//   constructor() {
//     super("Sonic");
//     this.mints = 5;
//     this.turns = 0;
//   }

//   canTakeAnotherTurn() {
//     if (this.turns < 1) {
//       this.turns += 1;
//       return true;
//     }
//     this.turns = 0;
//     return false;
//   }

//   selectPlanFromSupply(planSupply, planNames) {
//     const plans = [];
//     for (const p of planSupply) {
//       if (planNames.includes(p.name)) {
//         plans.push(p);
//       }
//     }
//     plans.sort((a, b) => b.cost - a.cost);
//     if (plans.length == 0) return null;
//     if (plans.length == 1) return plans[0];
//     if (plans[0].cost > plans[1].cost) return plans[0];
//     for (var type of ["culture", "production", "utility"]) {
//       for (var index=1; index >= 0; index--) {
//         if (planSupply[index].type === type && planNames.includes(planSupply[index].name)) {
//           return planSupply[index];
//         }
//       }        
//     }
//     return null;
//   }
// }


// class Mort extends AI {
//   constructor() {
//     super("Mort");
//   }

//   get mints() { return 99; }
//   set mints(value) {}

//   selectPlanFromSupply(planSupply, planNames) {
//     const plans = [];
//     for (const p of planSupply) {
//       if (planNames.includes(p.name) && p.type != "production") {
//         plans.push(p);
//       }
//     }
//     plans.sort((a, b) => b.cost - a.cost);
//     if (plans.length == 0) return null;
//     if (plans.length == 1) return plans[0];
//     if (plans[0].cost > plans[1].cost) return plans[0];
//     for (var type of ["utility", "culture"]) {
//       for (var index=1; index >= 0; index--) {
//         if (planSupply[index].type === type && planNames.includes(planSupply[index].name)) {
//           return planSupply[index];
//         }
//       }        
//     }
//     return null;
//   }
// }





// class Game {
//   constructor() {
//     this.locations = {
//       "Producer": new Location('core', 'Producer', 3, 1, `Gain ${formatMints(2)}`),
//       "Wholesaler": new Location('deed', 'Wholesaler', 1, 1, `Gain ${formatMints(2)}<br>Owner Upkeep: If occupied, gain ${formatMints(1)}`),
//       "Builder": new Location('core', 'Builder', 2, 2, 'Build one of your Plans'),
//       "Supplier": new Location('core', 'Supplier', 2, 0, 'Gain a Plan from the Plan Supply'),
//       "Leadership Council": new Location('core', 'Leadership Council', 1, 1, `Take the Starting Player Token and gain ${formatMints(1)}`),
//       "Lotto": new Location('deed', 'Lotto', 1, 3, `Gain the top Plan from the Plan Deck.<br>Owner Upkeep: If occupied, gain ${formatMints(2)}`)
//     };

//     this.allPlans = [
//       new Plan("utility", "Assembler", 5, "Automatically build Plans you gain from the Supplier", 1),
//       new Plan("culture", "Bridge", 1, `Counts as two ${formatPlanType("culture")} Buildings`, 0),
//       new Plan("production", "Co-Op", 1, `Upkeep: You and opponent both gain ${formatMints(1)}`, 1),
//       new Plan("production", "Corporate HQ", 3, `Upkeep: Gain ${formatMints(1)} for each Building in your Neighborhood`, 0),
//       new Plan("utility", "Crane", 2, `You pay ${formatMints(1)} less at the Builder`, 0),
//       new Plan("production", "Factory", 4, `Upkeep: Gain ${formatMints(1)}`, 3),
//       new Plan("culture", "Gallery", 4, `Upkeep: Add ${formatMints(1)} from the Mint Supply to Gallery`, 1, `${formatMints(1)} on Gallery`),
//       new Plan("culture", "Gardens", 3, "", 3),
//       new Plan("utility", "Landfill", 3, `You gain one fewer ${formatStars(1)} from each ${formatPlanType("culture")} Building in your Neighborhood`, 3),
//       new Plan("deed", "Lotto", 4, "You are the Owner of the Lotto location", 2),
//       new Plan("production", "Mine", 2, `Upkeep: Gain ${formatMints(1)}`, 2),
//       new Plan("culture", "Museum", 2, "", 1, `${formatPlanType("culture")} Building`),
//       new Plan("utility", "Obelisk", 4, "", 1, "Building in your Neighborhood"),
//       new Plan("production", "Plant", 5, `Upkeep: Gain ${formatMints(2)}`, 2),
//       new Plan("culture", "Statue", 2, "", 2),
//       new Plan("production", "Stripmine", 4, `Upkeep: Gain ${formatMints(3)}`, 0),
//       new Plan("utility", "Truck", 2, `You pay ${formatMints(1)} less at the Supplier (Minimum One)`, 1),
//       new Plan("utility", "Vault", 5, "", 2, "Plan in your Neighborhood"),
//       new Plan("deed", "Wholesaler", 1, "You are the Owner of the Wholesaler location", 1),
//       new Plan("culture", "Windmill", 1, "", 1),
//       new Plan("production", "Workshop", 3, `Upkeep: Gain ${formatMints(1)}`, 2)
//     ];

//     this.planDeck = this.allPlans
//       .map(value => ({ value, sort: Math.random() }))
//       .sort((a, b) => a.sort - b.sort)
//       .map(({ value }) => value)

//     this.planSupply = [];
//     for (let i = 0; i < 2; i++) {
//       const plan = this.planDeck.pop();
//       this.planSupply.push(plan);
//     }

//     this.players = [new Player('Player')];
//     if (Math.random() < 0.5) {
//       this.players.push(new Sonic());
//     } else {
//       this.players.push(new Mort());
//     }
//     this.startingPlayer = (this.players[1].startsTheGame())? 1 : 0;
//     this.players[this.startingPlayer].startToken = true;
//     this.currentPlayer = this.startingPlayer;
//     this.passes = [false, false];
//     this.selectableElements = [];
//     this.popupElements = [];
//   }

//   startNewRound() {
//     setTimeout(() => {
//       console.log(`NEW ROUND :  Player ${this.currentPlayer} starts.`);
//       this.update();
//       this.players[this.currentPlayer].selectAction(this);
//     }, 25);
//   }

//   nextTurn() {
//     setTimeout(() => { 
//       if (!this.players[this.currentPlayer].canTakeAnotherTurn()) {
//         this.currentPlayer = (this.currentPlayer + 1) % 2;
//       }
//       console.log(`It is now Player ${this.currentPlayer}'s turn.`);
//       this.players[this.currentPlayer].selectAction(this);
//     }, 25);
//   }

//   executeBuilder(planName) {
//     // Deal with builder effects.
//     if (this.players[this.currentPlayer].hasBuilding("Crane")) {
//       this.players[this.currentPlayer].mints += 1;
//     }
//     if (planName === "Lotto") {
//       this.locations[planName].opened = true;
//     }
//     if (planName === "Wholesaler") {
//       this.locations[planName].opened = true;
//     }
//     this.players[this.currentPlayer].buildPlan(planName);
//   }

//   executeSupplier(planName) {
//     const index = this.findPlanInSupply(planName);
//     const plan = this.planSupply[index];
//     this.planSupply[index] = this.planDeck.pop(); 
//     this.players[this.currentPlayer].gainPlan(plan);
//     this.players[this.currentPlayer].mints -= plan.cost;

//     // Deal with supplier effects.
//     // If they have the Truck, plans cost 1 less (min 1).
//     if (this.players[this.currentPlayer].hasBuilding("Truck")) {
//       if (plan.cost > 1) {
//         this.players[this.currentPlayer].mints += 1;
//       }
//     }
//     // If they have the Assembler, go ahead and build the plan.
//     if (this.players[this.currentPlayer].hasBuilding("Assembler")) {
//       this.executeBuilder(plan.name);
//     }
//   }

//   executeAction(locationName, planName=null) {
//     console.log(`Player ${this.currentPlayer} executes ${locationName} ${planName} with ${this.players[this.currentPlayer].mints} Mints`);
//     if (locationName === "Pass") {
//       this.passes[this.currentPlayer] = true;
//       if (this.passes[0] && this.passes[1]) {
//         this.upkeep();
//       } else {
//         this.nextTurn();
//       }
//       return true;
//     }

//     const location = this.locations[locationName];
//     this.passes[this.currentPlayer] = false;
//     location.place();
//     this.players[this.currentPlayer].mints -= location.cost;

//     switch (locationName) {
//       case 'Producer':
//       case 'Wholesaler':
//         this.players[this.currentPlayer].mints += 2;
//         break;
//       case 'Builder':
//         this.executeBuilder(planName);
//         break;
//       case 'Supplier':
//         this.executeSupplier(planName);
//         break;
//       case 'Leadership Council':
//         this.players[this.startingPlayer].startToken = false;
//         this.startingPlayer = this.currentPlayer;
//         this.players[this.startingPlayer].startToken = true;
//         this.players[this.currentPlayer].mints += 1;
//         break;
//       case 'Lotto':
//         this.players[this.currentPlayer].gainPlan(this.planDeck.pop());
//         break;
//     }
//     this.update();
//     this.nextTurn();
//     return true;
//   }

//   findPlanInSupply(planName) {
//     for (let i = 0; i < this.planSupply.length; i++) {
//       if (this.planSupply[i].name === planName) return i;
//     } 
//     return -1;
//   }

//   upkeep() {
//     if (this.isGameOver()) {
//       this.calculateScores();
//     } else {
//       this.refillPlanSupply();
//       this.resolveUpkeepEffects();
//       this.clearLocations();
//       this.provideNewWorker();
//       this.currentPlayer = this.startingPlayer;
//       this.startNewRound();
//     }
//   }

//   isGameOver() {
//     if (this.planDeck.length < 2 - Object.keys(this.planSupply).length) return true;
//     if (this.players.some(player => player.getScore() >= 7)) return true;
//     return false;
//   }

//   refillPlanSupply() {
//     while (this.planSupply.length < 2) {
//       const plan = this.planDeck.pop();
//       this.planSupply.push(plan);
//     }
//   }

//   resolveUpkeepEffects() {
//     for (const player of this.players) {
//       if (player.hasBuilding("Co-Op")) {
//         this.players[0].mints += 1;
//         this.players[1].mints += 1;
//       }
//       if (player.hasBuilding("Corporate HQ")) {
//         player.mints += player.buildings.length;
//       }
//       if (player.hasBuilding("Factory")) {
//         player.mints += 1;
//       }
//       if (player.hasBuilding("Gallery")) {
//         // Add mints to gallery for scoring.
//         const gallery = player.getBuilding("Gallery");
//         if (gallery !== null) {
//           if (!gallery.hasOwnProperty("mints")) {
//             gallery.mints = 0;
//           }
//           gallery.mints += 1;
//         }
//       }
//       if (player.hasBuilding("Lotto")) {
//         if (this.locations["Lotto"].nextAvailable > 0) {
//           player.mints += 2;
//         }
//       }
//       if (player.hasBuilding("Mine")) {
//         player.mints += 1;
//       }
//       if (player.hasBuilding("Plant")) {
//         player.mints += 2;
//       }
//       if (player.hasBuilding("Stripmine")) {
//         player.mints += 3;
//       }
//       if (player.hasBuilding("Wholesaler")) {
//         if (this.locations["Wholesaler"].nextAvailable > 0) {
//           player.mints += 1;
//         }
//       }
//       if (player.hasBuilding("Workshop")) {
//         player.mints += 1;
//       }
//     }
//   }


//   clearLocations() {
//     for (const loc of Object.values(this.locations)) {
//       loc.clear();
//     }
//     this.passes = [false, false];
//   }

//   provideNewWorker() {
//     this.players.forEach(player => {
//       player.mints += 1;
//     });
//   }

//   calculateScores() {
//     console.log(`final scores: Player=${this.players[0].getScore()}, AI=${this.players[1].getScore()}`);
//     this.clearSelections();
//     this.addPopups();
//     alert(`Game Over`);
//   }


//   clearSelections() {
//     for (const pair of this.selectableElements) {
//       pair[0].classList.remove("selectable");
//       pair[0].removeEventListener("click", pair[1]);
//     }
//     this.selectableElements = []
//     for (const triple of this.popupElements) {
//       triple[0].removeEventListener("mouseover", triple[1])
//       triple[0].removeEventListener("mouseout", triple[2])
//     }
//     this.popupElements = [];
//   }

//   addPopups() {
//     const popup = document.getElementById('popup');
//     popup.style.visibility = 'hidden';
//     for (const plan of this.allPlans) {
//       const elt = document.getElementById(getPlanId(plan.name));
//       if (elt !== null && elt.parentNode.classList.contains("buildings")) {
//         const rect = elt.getBoundingClientRect();
//         function show() {
//           const popup = document.getElementById('popup');
//           const tmp = popup.getBoundingClientRect();
//           popup.innerHTML = planToHtml(plan);
//           popup.style.left = `${rect.left-tmp.width}px`;
//           popup.style.top = `${rect.top-tmp.height}px`;
//           popup.style.visibility = 'visible';
//         }
//         function hide() {
//           popup.style.visibility = 'hidden';
//         }
//         elt.addEventListener('mouseover', show);
//         elt.addEventListener('mouseout', hide);
//         this.popupElements.push([elt, show, hide]);
//       }
//     }
//   }

//   update() {
//     this.clearSelections();

//     for (const loc of Object.values(this.locations)) {
//       const elt = document.getElementById(getLocationId(loc.name));
//       elt.textContent = "";
//       elt.insertAdjacentHTML("beforeend", locationToHtml(loc));
//     }
//     const psElt = document.getElementById("planSupply");
//     psElt.textContent = "";
//     for (let i = 1; i < 3; i++) {
//       if (i <= this.planSupply.length) {
//         const plan = this.planSupply[i-1];
//         psElt.insertAdjacentHTML("beforeend", planToHtml(plan));
//       } else {
//         psElt.insertAdjacentHTML("beforeend", `<div class="plan missing"></div>`);
//       }
//     }
//     const playerElt = document.getElementById("playerNeighborhood");
//     playerElt.textContent = "";
//     playerElt.insertAdjacentHTML("beforeend", playerToHtml(this.players[0]));
//     const aiElt = document.getElementById("aiNeighborhood");
//     aiElt.textContent = "";
//     aiElt.insertAdjacentHTML("beforeend", playerToHtml(this.players[1]));  
          
//     this.addPopups();
//   }

// }










// function getLocationId(locationName) {
//   return locationName.replace(/ /g, '').toLowerCase() + "Location";
// }

// function getPlanId(planName) {
//   return planName.replace(/ /g, '').toLowerCase();
// }

// function locationToHtml(location) {
//   let s = `<div class="placement">`;
//   if (location.opened) {
//     for (let i = 0; i < location.spots; i++) {
//       if (i < location.nextAvailable) {
//         s += `<div class="occupied"></div>`;
//       } else {
//         let tmp = (location.cost === 0)? "*" : location.cost;
//         s += `<div class="available">${tmp}</div>`;
//       }
//     }
//   } else {
//     s += "BUILD<br>DEED<br>TO<br>OPEN";
//   }
//   s += "</div>";
//   s += `<div class="name">${location.name.toUpperCase()}</div>`;
//   s += `<div class="effect">${location.description}</div>`;
//   return s;
// }

// function planToHtml(plan) {
//   let s = `<div id="${getPlanId(plan.name)}" class="plan">`;
//   s += `<div class="name ${plan.type}">${plan.name}</div>`;
//   s += `<div class="cost">${formatMints(plan.cost)}</div>`;
//   s += `<div class="effect ${plan.type}">${plan.description}`;
//   if (plan.hasOwnProperty("mints")) {
//     s += `<br><br><span style="align:center">${formatMints(plan.mints)}</style>`;
//   }
//   s += "</div>";
//   s += `<div class="stars ${plan.type}">${formatStars(plan.stars, plan.starModifier)}</div>`;
//   s += `<div class="type">${formatPlanType(plan.type)}</span></div></div>`;
//   return s;
// }

// function playerToHtml(player) {
//   s = `<div class="name">${player.name}</div>`;
//   s += `<div class="startToken">${(player.startToken)? "<span class=\"outline\">🜲</div>" : ""}</div>`;
//   s += `<div class="mints">${player.getScore()} ${formatStars(1)} ${formatMints(1)} ${player.mints}</div>`;
//   s += `<div class="buildings">`;
//   for (const bldg of player.buildings) {
//     s += `<div id="${getPlanId(bldg.name)}" class="plan ${bldg.type}">${bldg.name}</div>`;
//   }
//   s += `</div><div></div><div class="buildings unconstructed">`;
//   for (const plan of player.plans) {
//     s += `<div id="${getPlanId(plan.name)}" class="plan ${plan.type}">${plan.name}</div>`;
//   }
//   return s;
// }

// function selectPlayerAction(game) {
//   const player = game.players[0];
//   const actions = player.getAvailableActions(game);
//   for (const locationName in actions) {
//     if (locationName === "Supplier") {
//       for (const planName of actions[locationName]) {
//         const elt = document.getElementById(getPlanId(planName));
//         function clicked() {
//           game.executeAction(locationName, planName);
//         }
//         game.selectableElements.push([elt, clicked]);
//         elt.classList.add("selectable");
//         elt.addEventListener("click", clicked); 
//       }
//     } else if (locationName === "Builder") {
//       for (const planName of actions[locationName]) {
//         const elt = document.getElementById(getPlanId(planName));
//         function clicked() {
//           game.executeAction(locationName, planName); 
//         }
//         game.selectableElements.push([elt, clicked]);
//         elt.classList.add("selectable");
//         elt.addEventListener("click", clicked);
//       }
//     } else {
//       const elt = document.getElementById(getLocationId(locationName));
//       function clicked() {
//         game.executeAction(locationName); 
//       }
//       game.selectableElements.push([elt, clicked]);
//       elt.classList.add("selectable");
//       elt.addEventListener("click", clicked); 
//     }
//   }
// }

const selectedCoords = new Set();

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


            if (!selectedResource && element.querySelector('span').classList.contains("well") == false 
            && element.querySelector('span').classList.contains("theatre") == false
            && element.querySelector('span').classList.contains("factory") == false
            && element.querySelector('span').classList.contains("cottage") == false
            && element.querySelector('span').classList.contains("chapel") == false
            && element.querySelector('span').classList.contains("farm") == false
            && element.querySelector('span').classList.contains("tavern") == false
            && element.querySelector('span').classList.contains("Caterina") == false) {
                if (element.classList.contains('greenBorder')) {
                    element.classList.remove('greenBorder');
                    selectedCoords.delete([element.dataset.row, element.dataset.col]);
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
            }
            if (selectedResource == "inherit" || selectedResource == null || this.querySelector('span').classList.contains('wood') || this.querySelector('span').classList.contains('wheat') || this.querySelector('span').classList.contains('brick') || this.querySelector('span').classList.contains('glass') || this.querySelector('span').classList.contains('stone')){
                return;
            }
            this.querySelector('span').classList.add(selectedResource);
            this.querySelector('span').classList.remove("invisible");

            
            townGrid.placeResource(element.dataset.row, element.dataset.col, selectedResource);
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
function getSubMatrix(matrix) {
    // Filter out rows that are completely empty (all cells are "")
    let nonEmptyRows = matrix.filter(row => row.some(cell => cell !== ""));
    // Initialize an array to store the non-empty columns
    let nonEmptyCols = [];

    // Loop through each column of the first row and check if any row in that column has a non-empty value
    for (let col = 0; col < nonEmptyRows[0].length; col++) {
        if (nonEmptyRows.some(row => row[col] !== "")) {
            nonEmptyCols.push(col);  // If the column has a non-empty value, add it to nonEmptyCols
        }
    }

    // Map the non-empty rows and columns into a new sub-matrix and return it
    return nonEmptyRows.map(row => nonEmptyCols.map(col => row[col]));
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
    let sub = getSubMatrix(fullMat);

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