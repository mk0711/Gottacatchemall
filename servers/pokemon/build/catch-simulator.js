"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pokedex_1 = require("./data/pokedex");
const bulbasaur = "bulbasaur";
console.log(pokedex_1.Pokedex[bulbasaur]);
function catchPokemon(pokemon, ball) {
    const catchRate = pokedex_1.Pokedex[pokemon].catchRate;
    const randInt = getRandomInt(1000);
    console.log(randInt);
    console.log(catchRate * ball);
    return catchRate * ball > randInt;
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
console.log(catchPokemon("bulbasaur", 10));
//# sourceMappingURL=catch-simulator.js.map