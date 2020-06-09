"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pokedex_1 = require("../data/pokedex");
const balls_1 = require("../data/balls");
class PokemonCatcher {
    catchPokemon(pokemonName, ballName) {
        if (!pokedex_1.Pokedex[pokemonName] || !balls_1.Pokeballs[ballName]) {
            return false;
        }
        if (ballName === "masterball") {
            return true;
        }
        const catchRate = pokedex_1.Pokedex[pokemonName].catchRate;
        const catchRateMultiplier = balls_1.Pokeballs[ballName].catchRateMultiplier;
        const randInt = this.getRandomInt(600);
        return catchRate * catchRateMultiplier > randInt;
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}
exports.PokemonCatcher = PokemonCatcher;
//# sourceMappingURL=catch-simulator.js.map