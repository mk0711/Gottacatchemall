"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pokedex_1 = require("./data/pokedex");
class PlayerPokedex {
    constructor() {
        this.caughtDex = this.initCaughtDex();
    }
    getCaughtDex() {
        return this.caughtDex;
    }
    initCaughtDex() {
        let result = {};
        const allPokemonNames = Object.keys(pokedex_1.Pokedex);
        for (const pokemonName of allPokemonNames) {
            result[pokemonName] = false;
        }
        return result;
    }
}
exports.PlayerPokedex = PlayerPokedex;
//# sourceMappingURL=playerdex.js.map